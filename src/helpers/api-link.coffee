EventEmitter2 = require 'eventemitter2'
interpolate = require 'interpolate'
_ = require 'underscore'
assign = require 'lodash/object/assign'
cloneDeep = require 'lodash/lang/cloneDeep'

OPTION_TYPES =
  apiChannel: (option) ->
    option instanceof EventEmitter2
  apiNameSpace: _.isString

# private utils
isErrorSilent = (error, silencers = []) ->
  _.indexOf(silencers, error.code) > -1

getErrorMessage = (error, messageMap = {}) ->
  messageMap[error.code]

getUnhandledErrors = (errors, {silencers, map}) ->
  otherErrors = _.reject errors, (error) ->
    isErrorSilent(error, silencers)

  errors = _.chain(errors)
    .map((error) ->
      return null if isErrorSilent(error, silencers)
      error.message = getErrorMessage(error, map)
      error
    )
    .compact()
    .value()

checkFailure = (response, errorOptions) ->
  if response.data.errors
    response.data.errors = getUnhandledErrors(response.data.errors, errorOptions)
    response.stopErrorDisplay = _.isEmpty(response.data.errors)

isOptionOfType = (option, key) ->
  option instanceof OPTION_TYPES[key]

checkOptions = (options) ->
  _.chain(OPTION_TYPES)
    .map((optionChecker, key) ->
      return null if optionChecker(options[key])
      console.info(typeof options[key])
      console.info(options[key])
      new Error("#{key} is of wrong type.")
    )
    .compact()
    .value()

areOptionsGood = (options) ->
  optionViolations = checkOptions(options)
  return true if _.isEmpty(optionViolations)

  _.each(optionViolations, (error) ->
    throw error
  )
  false


# default actions
defaultAction = (topic, eventData, action) ->
  @emit("#{action}.#{topic}", eventData)
  @apiChannel.emit("#{@apiNameSpace}.#{topic}.#{action}", eventData)

# sender
sender = (topic, eventData, action) ->
  eventData.status ?= "#{action}ing"
  eventData.query ?= topic

  defaultAction.call(@, topic, eventData, action)

# linker
class ApiLink extends EventEmitter2
  constructor: (linkOptions = {}, defaultActions = []) ->
    options =
      errors:
        silencers: []
        map: {}
      apiNameSpace: ''

    return unless areOptionsGood(linkOptions)

    options = assign({}, options, linkOptions)

    super(wildcard: true)

    {apiNameSpace, errors, apiChannel} = options

    @apiNameSpace = apiNameSpace
    @apiChannel = apiChannel
    @_errors = errors
    @_items = {}

    protect = _.union ['apiNameSpace', 'errors', 'apiChannel'], _.keys(EventEmitter2.prototype)

    _.each(defaultActions, (actionName) ->
      options[actionName] = _.partial(sender, _, _, actionName)
    )

    _.chain(options)
      .omit(protect)
      .each(@extend)

    @

  extend: (hook, key) =>
    # or maybe assign if isnt value
    return unless _.isFunction(hook)

    @[key] = hook.bind(@)

  init: ->
    @apiChannel.on("#{@apiNameSpace}.*.*.*", @update.bind(@))
    @apiChannel.on("#{@apiNameSpace}.*.*.failure", _.partial(checkFailure, _, @_errors))

  load: (topic, data) ->
    @_items[topic] = data

    status = if data.errors? then 'failed' else 'loaded'
    @emit("load.#{topic}", {data, status})

  get: (topic) ->
    # only allow access to immutable copy
    cloneDeep(@_items[topic])

  fetch: (topic) ->
    eventData = {data: {id: topic}, status: 'loading'}
    sender.call(@, topic, eventData, 'fetch')

  update: (eventData) ->
    return unless eventData?
    {data, query} = eventData
    @load(query, data)

  reset: ->
    @_items = {}

  destroy: ->
    @removeAllListeners()
    @reset()

module.exports = {ApiLink}

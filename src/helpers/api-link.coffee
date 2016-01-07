EventEmitter2 = require 'eventemitter2'
interpolate = require 'interpolate'
_ = require 'underscore'
assign = require 'lodash/object/assign'
cloneDeep = require 'lodash/lang/cloneDeep'

ACTIONS = [
  'init'
  'load'
  'get'
  'fetch'
  'update'
  'checkFailure'
  'handledAllErrors'
  'getUnhandledErrors'
]

OPTION_TYPES =
  apiChannel: (option) ->
    option instanceof EventEmitter2
  apiNameSpace: _.isString

# private utils
isHook = (option, key) ->
  key in ACTIONS

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


# linker
class ApiLink extends EventEmitter2
  constructor: (linkOptions = {}) ->
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

    _.chain(options)
      .omit(protect)
      .each(@extend)

  extend: (hook, key) =>
    # or maybe assign if isnt value
    return unless _.isFunction(hook)

    if isHook(hook, key)
      @["_#{key}"] = hook.bind(@)
    else
      @[key] = hook.bind(@)

  init: ->
    @apiChannel.on("#{@apiNameSpace}.*.receive.*", (data) ->
      console.info(data)
    )
    @_init?() or
      ((@apiChannel.on("#{@apiNameSpace}.*.receive.*", @update.bind(@)) or true) and
      (@apiChannel.on("#{@apiNameSpace}.*.receive.failure", _.partial(checkFailure, _, @_errors)) or true))

  load: (topic, data) ->
    data = @_load?(topic, data) or data
    @_items[topic] = data
    status = if data.errors? then 'failed' else 'loaded'
    console.info('emitting the load')
    @emit("load.#{topic}", {data, status})

  get: (topic) ->
    # only allow access to immutable copy
    data = cloneDeep(@_items[topic])
    data = @_get?(topic, data) or data

  fetch: (topic) ->
    eventData = {data: {id: topic}, status: 'loading'}
    eventData.query = topic

    @_fetch?(topic, eventData) or
      ((@emit("fetch.#{topic}", eventData) or true) and
      (@apiChannel.emit("#{@apiNameSpace}.#{topic}.send.fetch", eventData) or true))

  update: (eventData) ->
    console.info('should be updating')
    return unless eventData?
    {data, query} = eventData
    @_update?(query, data) or @load(query, data)

  reset: ->
    @_items = {}

  destroy: ->
    @removeAllListeners()
    @reset()

module.exports = {ApiLink}

EventEmitter2 = require 'eventemitter2'
interpolate = require 'interpolate'
_ = require 'underscore'
assign = require 'lodash/object/assign'

{CachedCollection, CachedItem} = require './cache'


CACHE_TYPES =
  collection: CachedCollection
  model: CachedItem

OPTION_TYPES =
  apiChannel: (option) ->
    option instanceof EventEmitter2
  apiNameSpace: _.isString

ACTIONS_CHECK =
  additionalActions: (actions) ->
    _.reject(actions, (action) ->
      _.isString(action)
    )

TYPE_CHECK =
  type: (type) ->
    type in _.keys(CACHE_TYPES)

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
      error.message = getErrorMessage(error, map)
      return null if isErrorSilent(error, silencers) or error.message
      error
    )
    .compact()
    .value()

checkFailure = (response, errorOptions) ->
  if response.data?.errors
    response.data.errors = getUnhandledErrors(response.data.errors, errorOptions)
    response.stopErrorDisplay = _.isEmpty(response.data.errors)

isOptionOfType = (option, key) ->
  option instanceof OPTION_TYPES[key]

checkOptions = (options, optionsCheckers) ->
  _.chain(optionsCheckers)
    .map((optionChecker, key) ->
      return null if optionChecker(options[key])
      new Error("#{key} is of wrong type, #{typeof options[key]}.")
    )
    .compact()
    .value()

areArgumentsGood = (options, additionalActions, type) ->
  optionViolations = checkOptions(options, OPTION_TYPES)
  actionViolations = checkOptions(additionalActions: additionalActions, ACTIONS_CHECK)
  typeViolations = checkOptions(type: type, TYPE_CHECK)

  allViolations = _.union optionViolations, actionViolations, typeViolations
  return true if _.isEmpty(allViolations)

  _.each(allViolations, (error) ->
    throw error
  )
  false


# Default way to send out to api and emit the action being taken.
sendAction = (topic, eventData, action) ->
  @emit("#{action}.#{topic}", eventData)
  @apiChannel.emit("#{@apiNameSpace}.#{topic}.#{action}", eventData)

# Sender, prepares the event status and query before the action is sent out.
# Adds on the request's topic/query so that the response event will have
# the information for updating the link's data on the topic.
sender = (topic, eventData, action) ->
  eventData.status ?= "#{action}ing"
  eventData.query ?= topic

  sendAction.call(@, topic, eventData, action)

# linker
class ApiLink extends EventEmitter2
  constructor: (linkOptions = {}, additionalActions = [], type = 'collection', initialData) ->
    options =
      errors:
        silencers: []
        map: {}
      apiNameSpace: ''

    return unless areArgumentsGood(linkOptions, additionalActions, type)

    options = assign({}, options, linkOptions)

    super(wildcard: true)

    {apiNameSpace, errors, apiChannel} = options

    @apiNameSpace = apiNameSpace
    @apiChannel = apiChannel
    @_errors = errors
    @_type = type

    @_data = new CACHE_TYPES[@_type](initialData)

    @_protectedKeys = _.union ['apiNameSpace', 'errors', 'apiChannel'], _.keys(EventEmitter2.prototype)

    # create convenience methods that will emit the action name to the api
    _.each(additionalActions, (actionName) ->
      options[actionName] = _.partial(sender, _, _, actionName)
    )

    _.chain(options)
      .omit(@_protectedKeys)
      .each(@extend)

    @

  extend: (hook, key) =>
    # or maybe assign if isnt value
    return unless _.isFunction(hook)

    @[key] = hook.bind(@)


  init: =>
    # update on completed response from the api, both successes and failures
    @apiChannel.on("#{@apiNameSpace}.*.*.*", @update)
    # filter the failures for error messages and errors that are otherwise handled
    @apiChannel.on("#{@apiNameSpace}.*.*.failure", @handleFailure)

  handleFailure: (response) =>
    checkFailure(response, @_errors)

  silenceFailure: (response) =>
    response.stopErrorDisplay = true

  # For broadcasting an update out where data only the current data stored for topic
  emitUpdate: (topic, eventName, params = {}) =>
    data = @get(topic)
    status = if not data or data.errors? then 'failed' else 'loaded'
    eventData = _.extend({data, status}, params)

    @emit("#{eventName}.#{topic}", eventData)

  # Only update if the api channel has response event data.  The data should include the original
  # query/topic so that the data can be loaded appropriately on topic.
  update: (eventData) =>
    return unless eventData?
    {data, query} = eventData
    @load(query, data)

  # For loading data, used for loading temporary initial data and
  # syncing with data returned from the api
  # The fact that the topic has been updated is broadcasted out,
  # along with the latest data and the status of the data.
  load: (topic, data) =>
    @_data.set(topic, data)

    status = if not data or data.errors? then 'failed' else 'loaded'
    @emit("load.#{topic}", {data, status})

  # For getting the latest data on `topic`.
  get: (topic) =>
    # Only allow access to cloned copy; mutating this link's synced data is discouraged.
    # If the data needs to be manipulated, the copy with be manipulated, submitted to
    # the api, and then the response can update this link's data.
    @_data.get(topic)

  # Sends out the call to the api for fetching data.
  fetch: (topic, payload) =>
    payload ?= {id: topic}
    eventData = {data: payload, status: 'loading'}
    sender.call(@, topic, eventData, 'fetch')

  change: (topic, change) =>
    @_data.change(topic, change)
    data = @_data.get(topic)

    @emit("change.#{topic}", {data, change})

  reset: =>
    @_data.reset()

  unset: (key) =>
    @_data.unset(key)

  destroy: =>
    @removeAllListeners()
    @reset()

module.exports = {ApiLink}

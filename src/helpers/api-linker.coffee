EventEmitter2 = require 'eventemitter2'
interpolate = require 'interpolate'
_ = require 'underscore'
defaultsDeep = require 'lodash/object/defaultsDeep'
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
# ACTIONS_HOOK_REGEX = new RegExp("^\_+(#{ACTIONS.join('|')})")

# private utils
isHook = (option, key) ->
  key in ACTIONS
  # ACTIONS_HOOK_REGEX.test(key)

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


local = []

# linker
class ApiLink extends EventEmitter2
  constructor: (linkOptions = {}) ->
    options =
      errors:
        silencers: []
        map: {}
      apiNameSpace: ''

    defaultsDeep(options, linkOptions)

    super(wildcard: true)

    {apiNameSpace, errors, apiChannel} = options
    @apiNameSpace = apiNameSpace
    @_errors = errors
    @_apiChannel = apiChannel

    _.chain(options)
      .omit('apiNameSpace', 'errors', 'apiChannel')
      .each(@extend)

  extend: (hook, key) ->
    if isHook(hook, key)
      @["_#{key}"] = hook.bind(@)
    else
      @[key] = hook.bind(@)

  init: ->
    @_init?() or 
      (@apiChannel.on("#{@apiNameSpace}.*.receive.*", @update) and
      @apiChannel.on("#{@apiNameSpace}.*.receive.failure", _.partial(checkFailure, _, @_errors)))

  load: (topic, data) ->
    data = @_load?(topic, data) or data
    local[topic] = data
    status = if data.errors? then 'failed' else 'loaded'

    @emit("load.#{topic}", {data, status})

  get: (topic) ->
    # only allow access to immutable copy
    data = cloneDeep(local[topic])
    data = @_get?(topic, data) or data

  fetch: (topic) ->
    eventData = {data: {id: topic}, status: 'loading'}
    eventData.query = topic

    @_fetch?(topic, eventData) or
      (@emit("fetch.#{topic}", eventData) and
      @apiChannel.emit("#{@apiNameSpace}.#{topic}.send.fetch", eventData))

  update: (eventData) ->
    return unless eventData?
    {data, query} = eventData
    @_update?(query, data) or @load(query, data)

module.exports = {ApiLink}

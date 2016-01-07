EventEmitter2 = require 'eventemitter2'
interpolate = require 'interpolate'
_ = require 'underscore'
defaultsDeep = require 'lodash/object/defaultsDeep'
cloneDeep = require 'lodash/lang/cloneDeep'

api = require '../api'

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

    {apiNameSpace, errors} = options
    @apiNameSpace = apiNameSpace
    @_errors = errors

    _.chain(options)
      .omit('apiNameSpace', 'errors')
      .each(@extend)

  extend: (hook, key) ->
    if isHook(hook, key)
      @["_#{key}"] = hook.bind(@)
    else
      @[key] = hook.bind(@)

  init: ->
    api.channel.on("#{@apiNameSpace}.*.receive.*", @update)
    api.channel.on("#{@apiNameSpace}.*.receive.failure", _.partial(checkFailure, _, @_errors))

  load: (topic, data) ->
    data = @_load?(topic, data) or data
    local[topic] = data
    status = if data.errors? then 'failed' else 'loaded'
    # _.each data.steps, (step) ->
    #   exercises.quickLoad(step.id, step)
    @emit("load.#{topic}", {data, status})

  get: (topic) ->
    # only allow access to immutable copy
    data = cloneDeep(local[topic])
    data = @_get?(topic, data) or data

  fetch: (topic) ->
    eventData = {data: {id: topic}, status: 'loading'}
    eventData.query = topic

    channel.emit("fetch.#{topic}", eventData)
    api.channel.emit("#{@apiNameSpace}.#{topic}.send.fetch", eventData)

  update: (eventData) ->
    return unless eventData?
    {data, query} = eventData
    @load(query, data)

module.exports = {ApiLink}

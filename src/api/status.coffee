_ = require 'underscore'

PENDING = {}

setPending = (eventName, query) ->
  PENDING[eventName] ?= {}
  PENDING[eventName][query] = true

unsetPending = (eventName, query) ->
  delete PENDING[eventName][query]
  delete PENDING[eventName] if _.isEmpty(PENDING[eventName])

isPending = (eventName, query) ->
  if _.isArray(eventName)
    _.reduce(eventName, (result, name) ->
      result or isPending(name, query)
    , false)
  else if eventName? and not query?
    not _.isEmpty(PENDING[eventName])
  else if eventName?
    PENDING[eventName]?[query]?
  else
    not _.isEmpty(PENDING)

module.exports = {setPending, unsetPending, isPending}

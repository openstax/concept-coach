_ = require 'underscore'
cloneDeep = require 'lodash/lang/cloneDeep'

class CachedCollection
  constructor: (data) ->
    @init(data)

  init: (data) ->
    @_initialData = data if data?
    @_items = @_initialData or {}

  get: (topic) ->
    if _.isString(topic)
      result = @_items[topic]
    else if _.isObject(topic)
      result = _.findWhere(@_items, topic)
    else
      result = @_items

    cloneDeep(result)

  set: (topic, data) ->
    @_items[topic] = data

  change: (topic, data) ->
    _.extend @_items[topic], data

  unset: (topic) ->
    delete @_items[topic] if topic?

  reset: ->
    @init()


class CachedItem
  constructor: (data) ->
    @init(data)

  init: (data) ->
    @_initialData = data if data?
    @_dataKeys = []
    @set(@_initialData)

  get: (keys = @_dataKeys) ->
    if _.isString(keys)
      _.property(keys)(@)
    else
      _.pick(@, keys)

  set: (topic, data) ->
    safeData = _.omit(data, @_protectedKeys)
    additionalDataKeys = _.keys(safeData)

    @_dataKeys = _.chain(@_dataKeys)
      .union(additionalDataKeys)
      .uniq()
      .value()

    _.extend(@, safeData)

  unset: (key) ->
    delete @[key] if key?

  reset: ->
    _.each(@_dataKeys, @unset)
    @init()

module.exports = {CachedCollection, CachedItem}

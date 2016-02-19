_ = require 'underscore'
deepMerge = require 'lodash/object/merge'
$ = require 'jquery'
interpolate = require 'interpolate'

status = require './status'

METHODS_WITH_DATA = ['PUT', 'PATCH', 'POST']
API_ACCESS_TOKEN = false
IS_LOCAL = window.__karma__ # or some other ENV setting

if IS_LOCAL
  {modifyApiSetting, getBaseResponseData, delay} = require './helpers.local'
else
  {modifyApiSetting, getBaseResponseData, delay} = require './helpers.public'

defaultFail = (response) ->
  console.info(response) unless window.__karma__

getAjaxSettingsByEnv = (baseUrl, setting, eventData) ->
  {data, change} = eventData
  apiSetting = _.pick(setting, 'url', 'method')
  apiSetting.dataType = 'json'
  apiSetting.contentType = 'application/json;charset=UTF-8'

  if _.includes(METHODS_WITH_DATA, apiSetting.method)
    apiSetting.data = JSON.stringify(change or data)

  modifyApiSetting(baseUrl, apiSetting, setting, data, API_ACCESS_TOKEN)
  apiSetting

getResponseDataByEnv = (requestEvent, requestName, data) ->
  query = getRequestQuery(requestEvent, data)
  baseResponseData = getBaseResponseData(requestEvent)

  deepMerge.apply {}, baseResponseData, {data, query, requestName}

getRequestQuery = (requestEvent, data) ->
  {query} = requestEvent
  query ?= data?.id or requestEvent.data?.id

handleAPIEvent = (apiEventChannel, baseUrl, setting, requestEvent = {}) ->
  requestName = setting.base or setting.eventName
  apiSetting = getAjaxSettingsByEnv(baseUrl, setting, requestEvent)
  query = getRequestQuery(requestEvent)

  return if status.isPending(setting.eventName, query)

  status.setPending(setting.eventName, query)

  _.delay ->
    $.ajax(apiSetting)
      .done((response) ->
        status.unsetPending(setting.eventName, query)
        handleSuccess(response, apiEventChannel, apiSetting, requestName, requestEvent)
      ).fail((response) ->
        status.unsetPending(setting.eventName, query)
        handleFail(response, apiEventChannel, apiSetting, requestName, requestEvent)
      )
  , delay

handleSuccess = (response, apiEventChannel, apiSetting, requestName, requestEvent) ->
  try
    completedEvent = interpolate("#{requestName}.success", requestEvent.data)
    completedData = getResponseDataByEnv(requestEvent, requestName, response)
    apiEventChannel.emit(completedEvent, completedData)
  catch error
    apiEventChannel.emit('error', {apiSetting, response, failedData: completedData, exception: error})


handleFail = (response, apiEventChannel, apiSetting, requestName, requestEvent) ->
  {responseJSON} = response

  failedData = getResponseDataByEnv(requestEvent, requestName, responseJSON)
  failedEvent = interpolate("#{requestName}.failure", requestEvent.data)
  apiEventChannel.emit(failedEvent, failedData)

  defaultFail(response)
  apiEventChannel.emit('error', {response, apiSetting, failedData})


loader = (apiEventChannel, settings) ->
  apiEventChannel.on 'set.access_token', (token) ->
    API_ACCESS_TOKEN = token

  _.each settings.endpoints, (setting, eventName) ->
    setting.eventName = eventName
    apiEventChannel.on eventName, _.partial(handleAPIEvent, apiEventChannel, setting.baseUrl or settings.baseUrl, setting)

module.exports = {loader, isPending: status.isPending}

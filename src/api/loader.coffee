_ = require 'underscore'
deepMerge = require 'lodash/object/merge'
$ = require 'jquery'
interpolate = require 'interpolate'

status = require './status'

isLocal = window.__karma__ # or some other ENV setting

if isLocal
  {modifyApiSettingForEnv, modifyResponseDataForEnv} = require './helpers.local'
else
  {modifyApiSettingForEnv, modifyResponseDataForEnv} = require './helpers.public'

METHODS_WITH_DATA = ['PUT', 'PATCH', 'POST']
API_ACCESS_TOKEN = false

defaultFail = (response) ->
  console.info(response) unless window.__karma__

getAjaxSettingsByEnv = (baseUrl, setting, eventData) ->
  {data, change} = eventData
  apiSetting = _.pick(setting, 'url', 'method')
  apiSetting.dataType = 'json'
  apiSetting.contentType = 'application/json;charset=UTF-8'

  if _.includes(METHODS_WITH_DATA, apiSetting.method)
    apiSetting.data = JSON.stringify(change or data)

  modifyApiSettingForEnv(baseUrl, apiSetting, setting, data, API_ACCESS_TOKEN)
  apiSetting

getResponseDataByEnv = (requestEvent, requestName, data) ->
  query = getRequestQuery(requestEvent, data)

  datasToMerge = [{}, {data, query, requestName}]
  modifyResponseDataForEnv(requestEvent, datasToMerge)

  deepMerge.apply {}, datasToMerge

getRequestQuery = (requestEvent, data) ->
  {query} = requestEvent
  query ?= data?.id or requestEvent.data?.id

handleAPIEvent = (apiEventChannel, baseUrl, setting, requestEvent = {}) ->
  # simulate server delay
  delay = if isLocal then 20 else 0

  requestName = setting.base or setting.eventName

  apiSetting = getAjaxSettingsByEnv(baseUrl, setting, requestEvent)

  query = getRequestQuery(requestEvent)
  return if status.isPending(setting.eventName, query)

  status.setPending(setting.eventName, query)

  _.delay ->
    $.ajax(apiSetting)
      .done((responseData) ->
        status.unsetPending(setting.eventName, query)

        try
          completedEvent = interpolate("#{requestName}.success", requestEvent.data)
          completedData = getResponseDataByEnv(requestEvent, requestName, responseData)
          apiEventChannel.emit(completedEvent, completedData)
        catch error
          apiEventChannel.emit('error', {apiSetting, response: responseData, failedData: completedData, exception: error})
      ).fail((response) ->
        status.unsetPending(setting.eventName, query)

        {responseJSON} = response

        failedData = getResponseDataByEnv(requestEvent, requestName, responseJSON)
        failedEvent = interpolate("#{requestName}.failure", requestEvent.data)
        apiEventChannel.emit(failedEvent, failedData)

        defaultFail(response)
        apiEventChannel.emit('error', {response, apiSetting, failedData})
      )
  , delay

loader = (apiEventChannel, settings) ->
  apiEventChannel.on 'set.access_token', (token) ->
    API_ACCESS_TOKEN = token

  _.each settings.endpoints, (setting, eventName) ->
    setting.eventName = eventName
    apiEventChannel.on eventName, _.partial(handleAPIEvent, apiEventChannel, setting.baseUrl or settings.baseUrl, setting)


module.exports = {loader, isPending: status.isPending}

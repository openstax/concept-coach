interpolate = require 'interpolate'

modifyApiSettingForEnv = (baseUrl, apiSetting, setting, data, token = false) ->

  apiSetting.url = "#{interpolate(apiSetting.url, data)}/#{apiSetting.method}.json"
  apiSetting.method = 'GET'

  apiSetting

modifyResponseDataForEnv = (requestEvent, datasToMerge) ->
  if isLocal
    if requestEvent.change?
      datasToMerge.push(data: requestEvent.change)
  else
    datasToMerge.push(requestEvent)

  datasToMerge

module.exports = {modifyApiSettingForEnv, modifyResponseDataForEnv}

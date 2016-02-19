interpolate = require 'interpolate'

modifyApiSettingForEnv = (baseUrl, apiSetting, setting, data, token = false) ->
  if setting.useCredentials
    apiSetting.xhrFields =
      withCredentials: true
  else if token
    apiSetting.headers =
      Authorization: "Bearer #{token}"
  apiSetting.url = "#{baseUrl}/#{interpolate(apiSetting.url, data)}"

  apiSetting

modifyResponseDataForEnv = (requestEvent, datasToMerge) ->
  datasToMerge.push(requestEvent)

  datasToMerge

module.exports = {modifyApiSettingForEnv, modifyResponseDataForEnv}

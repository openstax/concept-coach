interpolate = require 'interpolate'

modifyApiSetting = (baseUrl, apiSetting, setting, data, token = false) ->
  if setting.useCredentials
    apiSetting.xhrFields =
      withCredentials: true
  else if token
    apiSetting.headers =
      Authorization: "Bearer #{token}"
  apiSetting.url = "#{baseUrl}/#{interpolate(apiSetting.url, data)}"

  apiSetting

modifyResponseData = (requestEvent, datasToMerge) ->
  datasToMerge.push(requestEvent)

  datasToMerge

delay = 0

module.exports = {
  modifyApiSetting
  modifyResponseData
  delay
}

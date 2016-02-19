interpolate = require 'interpolate'

modifyApiSetting = (baseUrl, apiSetting, setting, data, token = false) ->

  apiSetting.url = "#{interpolate(apiSetting.url, data)}/#{apiSetting.method}.json"
  apiSetting.method = 'GET'

  apiSetting

modifyResponseData = (requestEvent, datasToMerge) ->
  datasToMerge.push(data: requestEvent.change) if requestEvent.change?

  datasToMerge

delay = 20

module.exports = {
  modifyApiSetting
  modifyResponseData
  delay
}

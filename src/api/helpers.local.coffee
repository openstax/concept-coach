interpolate = require 'interpolate'

modifyApiSetting = (baseUrl, apiSetting, setting, data, token = false) ->

  apiSetting.url = "#{interpolate(apiSetting.url, data)}/#{apiSetting.method}.json"
  apiSetting.method = 'GET'

  apiSetting

getBaseResponseData = (requestEvent) ->
  response = {}
  response = {data: requestEvent.change} if requestEvent.change?

  response

delay = 20

module.exports = {
  modifyApiSetting
  getBaseResponseData
  delay
}

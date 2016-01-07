api = require '../api'
{ApiLink} = require '../helpers/api-link'

user = require '../user/model'

exercise =
  apiNameSpace: 'exercise'
  apiChannel: api.channel
  quickLoad: (topic, data) ->
    @_items[topic] = data
    @emit("quickLoad.#{topic}", {data})

  getCurrentPanel: (topic) ->
    step = @get(topic)
    panel = 'free-response'
    if step?.correct_answer_id?
      panel = 'review'
    else if step?.free_response?
      panel = 'multiple-choice'
    panel

  init: ->
    user.channel.on 'change', @reset.bind(@)

module.exports = new ApiLink(exercise)

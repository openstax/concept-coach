api = require '../api'
{ApiLink} = require '../helpers/api-link'

user = require '../user/model'

EXERCISE_OPTIONS =
  apiNameSpace: 'exercise'
  apiChannel: api.channel

class ExerciseApi extends ApiLink
  init: ->
    user.channel.on 'change', @reset.bind(@)
    super()

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

module.exports = new ExerciseApi(EXERCISE_OPTIONS, ['save', 'complete'])

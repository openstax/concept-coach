api = require '../api'
{ApiLink} = require '../helpers/api-link'

_ = require 'underscore'

user = require '../user/model'

STEP_TYPES =
  'free-response': ['free_response']
  'multiple-choice': ['answer_id', 'is_completed']

EXERCISE_OPTIONS =
  apiNameSpace: 'exercise'
  apiChannel: api.channel

class ExerciseApi extends ApiLink
  init: ->
    user.on 'change', @reset.bind(@)
    super()

  quickLoad: (topic, data) ->
    @_items[topic] = data
    @emit("quickLoad.#{topic}", {data})

  getCurrentPanel: (topic) ->
    panel = 'review'

    step = @get(topic)
    question = step?.content?.questions?[0]
    return panel unless question?

    {formats} = question

    _.find(STEP_TYPES, (stepChecks, format) ->
      return false unless format in formats
      isStepCompleted = _.reduce(stepChecks, (isOtherCompleted, currentCheck) ->
        step[currentCheck]? and step[currentCheck] and isOtherCompleted
      , true)

      unless isStepCompleted
        panel = format
        true
    )

    panel

module.exports = new ExerciseApi(EXERCISE_OPTIONS, ['save', 'complete'])

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
    user.on 'logout.received', @reset.bind(@)
    @_freeResponseCache = {}
    super()

  quickLoad: (topic, data) ->
    @_items[topic] = data
    @emit("quickLoad.#{topic}", {data})

  cacheFreeResponse: (topic, freeResponse) ->
    @_freeResponseCache[topic] = freeResponse

  clearCachedFreeResponse: (topic) ->
    @_freeResponseCache[topic] = null

  getCachedFreeResponse: (topic) ->
    @_freeResponseCache[topic]

  load: (topic, data) ->
    {temp_free_response} = data
    # Keep temp free response separate from main exercise data.
    step = _.omit(data, 'temp_free_response')

    # If free response has been saved, clear cached free response.
    if step.free_response?.length
      @clearCachedFreeResponse(topic)
    # Otherwise, if there is a temporary free response being loaded, cache it.
    else if temp_free_response?.length
      @cacheFreeResponse(topic, temp_free_response)

    super(topic, step)

  get: (topic) ->
    data = super(topic)

    # If there is not already a saved free-response,
    # check for a cached free response.
    unless data.free_response?.length
      tempFreeResponse = @getCachedFreeResponse(topic)
      if tempFreeResponse?.length
        data.temp_free_response = tempFreeResponse

    data

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

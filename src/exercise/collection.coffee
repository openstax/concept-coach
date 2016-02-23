api = require '../api'
{ApiLink} = require '../helpers/api-link'
{CachedCollection} = require '../helpers/cache'

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
    @_freeResponseCache = new CachedCollection()
    super()

  filterForTempFreeResponse: (topic, data) ->
    {temp_free_response} = data
    # Keep temp free response separate from main exercise data.
    data = _.omit(data, 'temp_free_response')

    # If free response has been saved, clear cached free response.
    if data.free_response?.length
      @_freeResponseCache.unset(topic)
    # Otherwise, if there is a temporary free response being loaded, cache it.
    else if temp_free_response?.length
      @_freeResponseCache.set(topic, temp_free_response)

    data

  quickLoad: (topic, data) ->
    data = @filterForTempFreeResponse(topic, data)
    @_data.set(topic, data)
    @emit("quickLoad.#{topic}", {data})

  load: (topic, data) ->
    data = @filterForTempFreeResponse(topic, data)
    super(topic, data)

  get: (topic) ->
    data = super(topic)

    # If there is not already a saved free-response,
    # check for a cached free response.
    unless data.free_response?.length
      tempFreeResponse = @_freeResponseCache.get(topic)
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

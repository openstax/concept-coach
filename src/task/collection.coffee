interpolate = require 'interpolate'
_ = require 'underscore'

api = require '../api'
{ApiLink} = require '../helpers/api-link'

exercises = require '../exercise/collection'
user = require '../user/model'

ERRORS_TO_SILENCE = ['page_has_no_exercises']

TASK_OPTIONS =
  apiNameSpace: 'task'
  apiChannel: api.channel
  errors:
    silencers: ERRORS_TO_SILENCE

class TaskApi extends ApiLink
  load: (taskId, data) ->
    _.each data.steps, (step) ->
      exercises.quickLoad(step.id, step)
    super(taskId, data)

  init: ->
    user.channel.on 'change', @reset.bind(@)
    super()

  fetchByModule: ({collectionUUID, moduleUUID}) ->
    eventData = {data: {collectionUUID, moduleUUID}, status: 'loading'}
    eventData.query = "#{collectionUUID}/#{moduleUUID}"

    @emit("fetch.#{collectionUUID}/#{moduleUUID}", eventData)
    @apiChannel.emit("#{@apiNameSpace}.#{collectionUUID}/#{moduleUUID}.fetchByModule", eventData)

  getCompleteSteps: (taskId) ->
    _.filter(@get(taskId)?.steps, (step) ->
      step? and step.is_completed
    )

  getIncompleteSteps: (taskId) ->
    _.filter(@get(taskId)?.steps, (step) ->
      step? and not step.is_completed
    )

  getFirstIncompleteIndex: (taskId) ->
    _.max [_.findIndex(@get(taskId)?.steps, {is_completed: false}), 0]

  getStepIndex: (taskId, stepId) ->
    _.findIndex(@get(taskId)?.steps, id: stepId)

  getModuleInfo: (taskId, cnxUrl = '') ->
    task = @get(taskId)
    return unless task?

    moduleUrlPattern = '{cnxUrl}/contents/{collectionUUID}:{moduleUUID}'
    {collectionUUID, moduleUUID} = task

    moduleInfo = _.clone(task.steps?[0].related_content?[0]) or {}
    _.extend moduleInfo, _.pick(task, 'collectionUUID', 'moduleUUID')
    moduleInfo.link = interpolate moduleUrlPattern, {cnxUrl, collectionUUID, moduleUUID}

    moduleInfo

  getAsPage: (taskId) ->
    task = @get(taskId)
    return unless task?

    {moduleUUID, steps} = task

    page = _.pick task, 'last_worked_at', 'id'
    _.extend page, _.first(_.first(steps).related_content)
    page.exercises = steps
    page.uuid = moduleUUID

    page

module.exports = new TaskApi(TASK_OPTIONS)

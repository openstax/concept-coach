React = require 'react'
_ = require 'underscore'
{Exercise} = require 'openstax-react-components'

{getCurrentPanel} = exercises = require './collection'
tasks = require '../task/collection'
api = require '../api'
{Reactive} = require '../reactive'
apiChannelName = 'exercise'

ExerciseBase = React.createClass
  displayName: 'ExerciseBase'
  getInitialState: ->
    {item} = @props

    step: item

  componentWillReceiveProps: (nextProps) ->
    {item} = nextProps
    @setState(step: item)

  componentDidUpdate: (prevProps, prevState) ->
    {status} = @props
    {step} = @state

    exercises.emit("component.#{status}", status: status, step: step)

  contextTypes:
    processHtmlAndMath: React.PropTypes.func

  render: ->
    {step} = @state
    {taskId} = @props
    return null if _.isEmpty(step)

    exerciseProps =
      taskId: step.task_id
      step: step
      getCurrentPanel: exercises.getCurrentPanel.bind(exercises)
      canReview: true
      freeResponseValue: step.temp_free_response

      setAnswerId: (id, answerId) ->
        step.answer_id = answerId
        eventData = change: step, data: step, status: 'saving'

        exercises.save(step.id, eventData)

      setFreeResponseAnswer: (id, freeResponse) ->
        step.free_response = freeResponse
        eventData = change: step, data: step, status: 'saving'

        exercises.save(step.id, eventData)

      onFreeResponseChange: (freeResponse) ->
        step.temp_free_response = freeResponse
        exercises.load(step.id, step)

      onContinue: ->
        step.is_completed = true
        eventData = change: step, data: step, status: 'loading'

        exercises.complete(step.id, eventData)

      onStepCompleted: ->
        exercises.emit("completed.#{step.id}")

      onNextStep: ->
        exercises.emit("leave.#{step.id}")

    if taskId?
      wrapperProps =
        'data-step-number': tasks.getStepIndex(taskId, step.id) + 1

    htmlAndMathProps = _.pick(@context, 'processHtmlAndMath')

    <div className='exercise-wrapper' {...wrapperProps}>
      <Exercise {...exerciseProps} {...htmlAndMathProps} {...@props}/>
    </div>

ExerciseStep = React.createClass
  displayName: 'ExerciseStep'
  render: ->
    {id} = @props

    <Reactive topic={id} store={exercises} apiChannelName={apiChannelName}>
      <ExerciseBase {...@props}/>
    </Reactive>

module.exports = {ExerciseStep, exercises}

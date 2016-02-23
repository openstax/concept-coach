React = require 'react'
_ = require 'underscore'

InviteCodeInput = require './invite-code-input'

ConfirmJoin = require './confirm-join'
User = require '../user/model'
courses = require '../course/collection'
Navigation = require '../navigation/model'

ModifyCourseRegistration = React.createClass

  propTypes:
    collectionUUID: React.PropTypes.string.isRequired

  showTasks: ->
    Navigation.channel.emit('show.panel', view: 'task')

  componentDidUpdate: ->
    {course} = @props
    @onConfirmed() if course.isRegistered

  onConfirmed: ->
    # wait 1.5 secs so our success message is briefly displayed, then call onComplete
    _.delay(@showTasks, 1500)

  onValidated: ->
    @showTasks()

  renderComplete: (course) ->
    <h3 className="text-center">
      You have successfully modified your registration to be {course.description}
    </h3>

  renderCurrentStep: ->
    {collectionUUID, course} = @props

    if course.isIncomplete
      <InviteCodeInput
        course={course}
        collectionUUID={collectionUUID}
        title={"Leave #{course.description} for new course/period"} />
    else if course.isPending
      <ConfirmJoin
        collectionUUID={collectionUUID}
        optionalStudentId
        title={"Are you sure you want to switch your registration #{course.description}?"}
      />
    else
      @renderComplete(course)

  render: ->
    <div className='-modify-registration'>
      <i className='close-icon' onClick={@showTasks}/>
      {@renderCurrentStep()}
    </div>

module.exports = ModifyCourseRegistration

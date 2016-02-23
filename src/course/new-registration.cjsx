React = require 'react'
_ = require 'underscore'

courses = require './collection'
User = require '../user/model'
ENTER = 'Enter'

InviteCodeInput = require './invite-code-input'
ConfirmJoin = require './confirm-join'
Navigation = require '../navigation/model'

NewCourseRegistration = React.createClass

  propTypes:
    collectionUUID: React.PropTypes.string.isRequired
    validateOnly: React.PropTypes.bool
    title: React.PropTypes.string

  getDefaultProps: ->
    title: 'Register for this Concept Coach course'

  continue: ->
    Navigation.channel.emit('show.panel', view: 'login')

  componentDidUpdate: ->
    {course} = @props
    if course.isRegistered
      @onConfirmed()
    else if course.isValidated
      @onValidated()

  onConfirmed: ->
    # wait 1.5 secs so our success message is briefly displayed, then call onComplete
    _.delay(@continue, 1500)

  onValidated: ->
    @continue()

  renderValidated: ->
    <p className="lead">Redirecting to login...</p>

  renderComplete: (course) ->
    <h3 className="text-center">
      You have successfully joined {course.description}
    </h3>

  isTeacher: ->
    courses.isTeacherOf(@props.collectionUUID)

  renderCurrentStep: ->
    {collectionUUID, course} = @props

    if course.isValidated
      @renderValidated()
    else if course.isIncomplete
      title = if @isTeacher() then '' else @props.title
      <InviteCodeInput
        collectionUUID={collectionUUID}
        course={course}
        currentCourses={courses.getRegisteredCourses()}
        title={title} />
    else if course.isPending
      <ConfirmJoin
        collectionUUID={collectionUUID}
        title={"Would you like to join #{course.description}?"}/>
    else
      @renderComplete(course)

  teacherMessage: ->
    <div className="teacher-message">
      <p className="lead">
        Welcome!
      </p><p className="lead">
        To see the student view of your course in Concept Coach,
        enter an enrollment code from one of your sections.
      </p><p>
        We suggest creating a test section for yourself so you can
        separate your Concept Coach responses from those of your students.
      </p>
    </div>

  render: ->
    <div className="new-registration">
      {@teacherMessage() if @isTeacher()}
      {@renderCurrentStep()}
    </div>

module.exports = NewCourseRegistration

_ = require 'underscore'
React = require 'react'
BS = require 'react-bootstrap'
{AsyncButton} = require 'openstax-react-components'
ENTER = 'Enter'

courses = require './collection'
ErrorList = require './error-list'
RequestStudentId = require './request-student-id'
Navigation = require '../navigation/model'

UpdateStudentIdentifer = React.createClass
  propTypes:
    collectionUUID: React.PropTypes.string.isRequired

  getInitialState: ->
    requestSuccess: false

  componentWillMount: ->
    {collectionUUID} = @props
    courses.on("load.#{collectionUUID}", @onCourseChange)

  componentWillUnmount: ->
    {collectionUUID} = @props
    courses.off("load.#{collectionUUID}", @onCourseChange)

  onCourseChange: (eventData) ->
    {collectionUUID} = @props
    course = courses.get(collectionUUID)

    if course.student_identifier
      @setState(requestSuccess: true)
      courses.change(collectionUUID, student_identifier: null)
      # wait 1.5 secs so our success message is briefly displayed, then call onComplete
      _.delay(@onCancel, 1500)

  startConfirmation: =>
    {collectionUUID} = @props
    courses.confirm(collectionUUID, @refs.input.getValue())

  onKeyPress: (ev) ->
    @startConfirmation() if ev.key is ENTER

  onConfirmKeyPress: (ev) ->
    @startConfirmation() if ev.key is ENTER

  cancelConfirmation: ->
    {collectionUUID} = @props
    courses.unsetRegistration()

  onSubmit: (studentId) ->
    {collectionUUID} = @props
    courses.updateStudent(collectionUUID, student_identifier: studentId)

  onCancel: ->
    Navigation.channel.emit('show.task', view: 'task')

  renderComplete: ->
    <h3 className="text-center">
      You have successfully updated your student identifier.
    </h3>

  render: ->
    return @renderComplete() if @state.requestSuccess

    <BS.Row>
      <RequestStudentId
        label="Enter your school issued ID:"
        title="Change your student ID"
        onCancel={@onCancel}
        onSubmit={@onSubmit}
        saveButtonLabel="Save"
        canCancel={true}
        {...@props}
      />
    </BS.Row>

module.exports = UpdateStudentIdentifer

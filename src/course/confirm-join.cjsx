React = require 'react'
BS = require 'react-bootstrap'
ENTER = 'Enter'
RequestStudentId = require './request-student-id'

courses = require './collection'
ErrorList = require './error-list'
{AsyncButton} = require 'openstax-react-components'

ConfirmJoin = React.createClass

  propTypes:
    title: React.PropTypes.string.isRequired
    optionalStudentId: React.PropTypes.bool
    collectionUUID: React.PropTypes.string.isRequired

  onCancel: ->
    {collectionUUID} = @props
    courses.unsetRegistration(collectionUUID)

  startConfirmation: (studentId) ->
    {collectionUUID} = @props
    courses.confirm(collectionUUID, studentId)

  render: ->
    label = if @props.optionalStudentId
      <span>
        Update school issued ID<br/>
        (<i>leave blank to leave unchanged</i>):
        </span>
    else
      "Enter your school issued ID:"

    <BS.Row>
      <RequestStudentId
        onCancel={@onCancel}
        onSubmit={@startConfirmation}
        saveButtonLabel="Confirm"
        label={label}
        onConfirmationCancel={@onCancel}
        {...@props}
      />
    </BS.Row>

module.exports = ConfirmJoin

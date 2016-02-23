React = require 'react'
BS = require 'react-bootstrap'
ENTER = 'Enter'

courses = require './collection'
ErrorList = require './error-list'
{AsyncButton} = require 'openstax-react-components'

RequestStudentId = React.createClass

  propTypes:
    onCancel: React.PropTypes.func.isRequired
    onSubmit: React.PropTypes.func.isRequired
    label: React.PropTypes.oneOfType([
      React.PropTypes.string
      React.PropTypes.element
    ]).isRequired
    saveButtonLabel: React.PropTypes.string.isRequired
    title: React.PropTypes.string.isRequired
    collectionUUID: React.PropTypes.string.isRequired

  startConfirmation: =>
    {collectionUUID} = @props
    courses.confirm(collectionUUID, @refs.input.getValue())

  onKeyPress: (ev) ->
    @onSubmit() if ev.key is ENTER

  onSubmit: ->
    @props.onSubmit(@refs.input.getValue())

  render: ->
    {collectionUUID} = @props
    button =
      <AsyncButton
        className="btn btn-success"
        isWaiting={!!courses.isBusy(collectionUUID)}
        waitingText={'Confirming…'}
        onClick={@onSubmit}
      >{@props.saveButtonLabel}</AsyncButton>

    <div className="request-student-id form-group">
      <h3 className="text-center">
        {@props.title}
      </h3>
      <ErrorList collectionUUID={collectionUUID} />
      <div className='panels'>
        <div className='field'>
          <BS.Input type="text" ref="input" label={@props.label}
            placeholder="School issued ID" autoFocus
            onKeyPress={@onKeyPress}
            buttonAfter={button} />
        </div>
        <div className="cancel">
          <button className="btn"
            onClick={@props.onCancel}>Cancel</button>
        </div>
      </div>
    </div>

module.exports = RequestStudentId

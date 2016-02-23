React = require 'react'
BS = require 'react-bootstrap'
ENTER = 'Enter'

{CourseListing} = require './listing'
ErrorList = require './error-list'
{AsyncButton} = require 'openstax-react-components'
User = require '../user/model'
courses = require './collection'

InviteCodeInput = React.createClass

  propTypes:
    title: React.PropTypes.string.isRequired
    course: React.PropTypes.object.isRequired
    currentCourses: React.PropTypes.arrayOf(React.PropTypes.object)

  startRegistration: ->
    {collectionUUID} = @props
    courses.register(collectionUUID, @refs.input.getValue())

  onKeyPress: (ev) ->
    {collectionUUID} = @props

    return if courses.isBusy(collectionUUID) # double enter
    @startRegistration() if ev.key is ENTER

  renderCurrentCourses: ->
    <div className='text-center'>
      <h3>You are not registered for this course.</h3>
      <p>Did you mean to go to one of these?</p>
      <CourseListing courses={@props.currentCourses}/>
    </div>

  render: ->
    {collectionUUID} = @props

    button =
      <AsyncButton
        isWaiting={!!courses.isBusy(collectionUUID)}
        waitingText={'Registering…'}
        onClick={@startRegistration}
      >
        Enroll
      </AsyncButton>

    <div className="form-group">
      {@renderCurrentCourses() if @props.currentCourses?.length}
      <h3 className="text-center">{@props.title}</h3>
      <hr/>
      <ErrorList collectionUUID={collectionUUID} />
      <div className="code-wrapper col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12">
        <BS.Input type="text" ref="input" label="Enter the two-word enrollment code"
          placeholder="enrollment code" autoFocus
          onKeyPress={@onKeyPress}
          buttonAfter={button} />
      </div>
    </div>

module.exports = InviteCodeInput

React = require 'react'
BS = require 'react-bootstrap'
EventEmitter2 = require 'eventemitter2'

Status = require './status-mixin'
api = require '../api'

UserMenu = React.createClass
  mixins: [Status]

  contextTypes:
    close: React.PropTypes.func
    navigator: React.PropTypes.instanceOf(EventEmitter2)

  propTypes:
    course: React.PropTypes.object.isRequired

  componentWillMount: ->
    @getUser().ensureStatusLoaded()

  logoutUser: (clickEvent) ->
    clickEvent.preventDefault()
    @context.navigator.emit('show.logout', view: 'logout')

  showProfile: (clickEvent) ->
    clickEvent.preventDefault()
    @context.navigator.emit('show.profile', view: 'profile')

  updateStudentId: (clickEvent) ->
    clickEvent.preventDefault()
    @context.navigator.emit('show.student_id', view: 'student_id')

  close: (clickEvent) ->
    clickEvent.preventDefault()
    @context.close?()

  modifyCourse: (clickEvent) ->
    clickEvent.preventDefault()
    @context.navigator.emit('show.registration', view: 'registration')

  renderCourseOption: ->
    if @props.course?.isRegistered
      courseChangeText = 'Change Course'
    else
      courseChangeText = 'Register for Course'
    <BS.MenuItem onClick={@modifyCourse}>{courseChangeText}</BS.MenuItem>

  renderStudentIdOption: ->
    return null unless @props.course?.isRegistered
    <BS.MenuItem onClick={@updateStudentId}>Change student ID</BS.MenuItem>

  render: ->
    # The menu has no valid actions unless the useris logged in
    user = @getUser()
    return null unless user.isLoggedIn()
    <BS.DropdownButton navItem className='concept-coach-user' title={user.get('name')}>
      {@renderCourseOption()}
      <BS.MenuItem onClick={@showProfile}>Account Profile</BS.MenuItem>
      {@renderStudentIdOption()}
      <BS.MenuItem onClick={@logoutUser}>Logout</BS.MenuItem>
    </BS.DropdownButton>

module.exports = UserMenu

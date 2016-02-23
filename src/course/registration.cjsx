React = require 'react'

NewCourseRegistration = require './new-registration'
ModifyCourseRegistration = require './modify-registration'
EnrollOrLogin = require './enroll-or-login'

UserStatus = require '../user/status-mixin'
courses = require '../course/collection'

CourseRegistration = React.createClass

  propTypes:
    collectionUUID: React.PropTypes.string.isRequired

  mixins: [UserStatus]

  # create a private copy of the course to operate on
  getInitialState: ->
    @getCurrentCourse()

  componentWillMount: ->
    {collectionUUID} = @props
    courses.on("*.#{collectionUUID}", @onCourseChange)

  componentWillUnmount: ->
    {collectionUUID} = @props
    courses.off("*.#{collectionUUID}", @onCourseChange)

  getCurrentCourse: ->
    {collectionUUID} = @props
    course: courses.get(collectionUUID)

  onCourseChange: ->
    @setState(@getCurrentCourse())

  render: ->
    {course} = @state
    user = @getUser()

    body = if course and course.isRegistered
      <ModifyCourseRegistration {...@props} course={course}/>
    else if user.isLoggedIn()
      <NewCourseRegistration {...@props} course={course}/>
    else
      <EnrollOrLogin {...@props} course={course}/>

    <div className="row">
      {body}
    </div>

module.exports = CourseRegistration

_ = require 'underscore'
Course = require '../course/model'
api = require '../api'
{ApiLink} = require '../helpers/api-link'

BLANK_USER =
  is_admin: false
  is_content_analyst: false
  is_customer_service: false
  name: null
  profile_url: null
  courses: []
  isLoaded: false

class UserApi extends ApiLink
  isLoggedIn: ->
    !!@profile_url

  getCourse: (collectionUUID) ->
    _.findWhere( @courses, ecosystem_book_uuid: collectionUUID )

  registeredCourses: ->
    _.filter @courses, (course) -> course.isRegistered()

  validatedPendingCourses: ->
    _.filter @courses, (course) -> course.isValidated()

  isTeacherForCourse: (collectionUUID) ->
    course = _.findWhere @_course_data, ecosystem_book_uuid: collectionUUID
    course and _.detect(course.roles, (role) -> role.type is 'teacher')

  status: (collectionUUID) ->
    course = @getCourse(collectionUUID)
    isLoggedIn: @isLoggedIn()
    isLoaded:   @isLoaded
    isRegistered: !!course?.isRegistered()
    preValidate: (not @isLoggedIn()) and (not course?.isValidated())

  update: (data) ->
    _.extend(this, data.user)
    @_course_data = data.courses
    pending = @validatedPendingCourses()
    @courses = _.compact _.map data.courses, (course) ->
      if course.is_concept_coach and _.detect(course.roles, (role) -> role.type is 'student')
        new Course(course)
    _.each pending, (course) =>
      @courses.push(course)
      course.register(course.enrollment_code, @)
    @emit('change')

  findOrCreateCourse: (collectionUUID) ->
    @getCourse(collectionUUID) or (
      course = new Course(ecosystem_book_uuid: collectionUUID)
      @courses.push(course)
      course
    )

  ensureStatusLoaded: (force = false) ->
    @apiChannel.emit('user.status.fetch') if force or not @isLoggedIn()

  onCourseUpdate: (course) ->
    @emit('change')
    @ensureStatusLoaded(true) # re-fetch course list from server

  removeCourse: (course) ->
    index = @courses.indexOf(course)
    @courses.splice(index, 1) unless index is -1
    @emit('change')

  _signalLogoutCompleted: ->
    _.extend(this, BLANK_USER)
    @isLoggingOut = true
    @emit('logout.received')

  init: ->
    @apiChannel.on 'user.status.*.*', ({data}) =>
      @isLoaded = true

      if data.access_token
        @apiChannel.emit('set.access_token', data.access_token)
      @endpoints = data.endpoints
      if data.user
        @update(data)
      else
        _.extend(this, BLANK_USER)
        @emit('change')

  destroy: ->
    _.each @courses, (course) ->
      course.channel.removeAllListeners()
    super()

module.exports = new UserApi({apiNameSpace: 'user', apiChannel: api.channel}, [], 'model', BLANK_USER)

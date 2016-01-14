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
  _course_data: []
  endpoints: {}
  isLoaded: false
  isLoggingOut: false

isCourseRole = (course, type) ->
  _.detect(course.roles, (role) -> role.type is type)

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
    course and isCourseRole(course, 'teacher')

  status: (collectionUUID) ->
    course = @getCourse(collectionUUID)
    isLoggedIn: @isLoggedIn()
    isLoaded:   @isLoaded
    isRegistered: !!course?.isRegistered()
    preValidate: (not @isLoggedIn()) and (not course?.isValidated())

  findOrCreateCourse: (collectionUUID) ->
    @getCourse(collectionUUID) or (
      course = new Course(ecosystem_book_uuid: collectionUUID)
      @courses.push(course)
      course
    )

  # TODO see if we can remove and just use user.fetch()
  onCourseUpdate: (course) ->
    @ensureStatusLoaded(true) # re-fetch course list from server

  _signalLogoutCompleted: ->
    @reset()
    @isLoggingOut = true
    @emit('logout.received')

  ensureStatusLoaded: (force = false) ->
    @fetch() if force or not @isLoggedIn()

  loadUser: (user) ->
    _.extend(@, user)

  loadCourses: (courses) ->
    @_course_data = courses

    pending = @validatedPendingCourses()
    @courses = _.chain(courses)
      .map (course) ->
        new Course(course) if course.is_concept_coach and isCourseRole(course, 'student')
      .compact()
      .value()

    _.each pending, (course) =>
      @courses.push(course)
      course.register(course.enrollment_code, @)

  load: (topic, data) ->
    @isLoaded = true
    @endpoints = data.endpoints

    if data.access_token
      @apiChannel.emit('set.access_token', data.access_token)

    if data.user
      @loadUser(data.user)
      @loadCourses(data.courses)
    else
      @reset()

    status = if data.errors? then 'failed' else 'loaded'
    @emit('change', {data, status})

  fetch: ->
    super('status', {})

  destroy: ->
    _.each @courses, (course) ->
      course.channel.removeAllListeners()
    super()

module.exports = new UserApi({apiNameSpace: 'user', apiChannel: api.channel}, [], 'model', BLANK_USER)

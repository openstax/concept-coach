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
  isLoaded: false
  isLoggingOut: false

isCourseRole = (course, type) ->
  _.detect(course.roles, (role) -> role.type is type)

class UserApi extends ApiLink
  isLoggedIn: ->
    !!@_data.get('profile_url')

  isLoggingOut: ->
    @_data.get('isLoggingOut')

  getCourse: (collectionUUID) =>
    _.findWhere( @_data.get('courses'), ecosystem_book_uuid: collectionUUID )

  registeredCourses: =>
    _.filter @_data.get('courses'), (course) ->
      course.isRegistered()

  validatedPendingCourses: =>
    _.filter @_data.get('courses'), (course) -> course.isValidated()

  isTeacherForCourse: (collectionUUID) ->
    course = _.findWhere @_course_data, ecosystem_book_uuid: collectionUUID
    course and isCourseRole(course, 'teacher')

  status: (collectionUUID) ->
    course = @getCourse(collectionUUID)
    isLoggedIn: @isLoggedIn()
    isLoaded:   @_data.get('isLoaded')
    isRegistered: !!course?.isRegistered()
    preValidate: (not @isLoggedIn()) and (not course?.isValidated())

  findOrCreateCourse: (collectionUUID) ->
    @getCourse(collectionUUID) or (
      course = new Course(ecosystem_book_uuid: collectionUUID)
      courses = @_data.get('courses')
      courses.push(course)

      @_data.set('courses', {courses})
      course
    )

  _signalLogoutCompleted: ->
    @reset()
    @isLoggingOut = true
    @emit('logout.received')

  ensureStatusLoaded: ->
    @fetch() unless @isLoggedIn()

  filterForUser: (data) ->
    _.property('user')(data)

  filterForCourses: (data) ->
    courses = _.property('courses')(data)
    @_course_data = courses

    pending = @validatedPendingCourses()
    coursesToLoad = _.chain(courses)
      .map (course) ->
        new Course(course) if course.is_concept_coach and isCourseRole(course, 'student')
      .compact()
      .value()

    _.each pending, (course) =>
      coursesToLoad.push(course)
      course.register(course.enrollment_code, @)

    coursesToLoad or []

  load: (topic, data) ->
    dataToLoad = _.pick(data, 'endpoints')
    dataToLoad.isLoaded = true

    if data.access_token
      @apiChannel.emit('set.access_token', data.access_token)

    if data.user
      user = @filterForUser(data)
      courses = @filterForCourses(data)
    else
      @reset()

    dataToLoad.courses = courses
    _.extend(dataToLoad, user)

    super('status', dataToLoad)

  fetch: ->
    super('status', {})

  destroy: ->
    _.invoke @courses, 'destroy'
    super()

module.exports = new UserApi({apiNameSpace: 'user', apiChannel: api.channel}, [], 'model', BLANK_USER)

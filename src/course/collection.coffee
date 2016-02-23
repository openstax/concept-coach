api = require '../api'
{ApiLink} = require '../helpers/api-link'
{CachedCollection} = require '../helpers/cache'

_ = require 'underscore'

user = require '../user/model'

STEP_TYPES =
  'free-response': ['free_response']
  'multiple-choice': ['answer_id', 'is_completed']

ERROR_MAP =
  invalid_enrollment_code: 'This is not a valid enrollment code for this book. Please try again. Contact your instructor to verify your enrollment code.'
  enrollment_code_does_not_match_book: 'The enrollment code is invalid for this content'
  already_enrolled: 'You are already enrolled in this course'
  multiple_roles: 'You are listed as both  teacher and a student'
  dropped_student: 'Your account is  unable to participate at this time'
  already_processed: 'The request has already been processed'
  already_approved: 'The request has already been approved'
  already_rejected: 'The request has been rejected'
  taken: 'The Student ID is already a member'

COURSE_OPTIONS =
  apiNameSpace: 'course'
  apiChannel: api.channel
  errors:
    map: ERROR_MAP

checkStatuses = 
  # complete and ready for use
  isRegistered: (course) ->
    return false unless course?
    course?.id? and not (checkStatuses.isIncomplete(course) or checkStatuses.isPending(course))

  # Freshly initialized, registration code has not been entered
  isIncomplete: (course) ->
    return true unless course?
    not (course.name or course.to)

  # The registration code has been validated but sign-up is not yet started
  isValidated: (course) ->
    return false unless course?
    course.status is "validated"

  # A registration has been created, but not confimed
  isPending: (course) ->
    return false unless course?
    course.status is "pending"

getStatuses = (course) ->
  _.mapObject(checkStatuses, (check) ->
    check(course)
  )

isCourseRole = (course, type) ->
  return false if _.isEmpty(course)
  _.detect(course.roles, (role) -> role.type is type)

getPendingCourseResponse = (response) ->
  {data, query} = response

  pendingCourse = _.omit(data, 'id', 'to')

  if data?.to
    _.extend(pendingCourse, data.to.course)
    pendingCourse.is_concept_coach = true
    pendingCourse.periods = [data.to.period]

  # pendingCourse.description = getDescription(data)

  pendingCourse

getDescription = (data) ->
  if checkStatuses.isIncomplete(data) # still fetching
    ""
  else if checkStatuses.isPending(data) # we originated from a join or move request
    msg = describeMovePart(data.to)
    if data.from then "from #{describeMovePart(data.from)} to #{msg}" else msg
  else
    "#{data.name} #{_.first(data.periods).name}"

describeMovePart = (part) ->
  return '' unless part
  "#{part.course.name} (#{part.period.name}) by #{teacherNames(part)}"

teacherNames = (part) ->
  teachers = part.course.teachers
  names = _.map teachers, (teacher) ->
    teacher.name or "#{teacher.first_name} #{teacher.last_name}"
  # convert array to sentence
  if names.length > 1
    names.slice(0, names.length - 1).join(', ') + " and " + names.slice(-1)
  else
    _.first(names)

class CourseApi extends ApiLink
  init: ->
    @_registrationCache = new CachedCollection()

    @apiChannel.on "#{@apiNameSpace}.*.prevalidation.*", @_onValidated
    @apiChannel.on "#{@apiNameSpace}.*.registration.*", @_onRegistered
    @apiChannel.on "#{@apiNameSpace}.*.confirmation.*", @_onConfirmed
    @apiChannel.on "#{@apiNameSpace}.*.studentUpdate.*", @_onStudentUpdated

    @apiChannel.on "#{@apiNameSpace}.*.*.failure", @handleFailure

    user.on 'load.courses', @updateFromUserStatus
    user.on 'logout.received', @reset.bind(@)

  handleFailure: (response) =>
    super(response)
    # some special error handling logic for errors
    # if response.data.errors? emit error list for ErrorList component to handle
    @emit("failed.#{response.query}", response)

  updateFromUserStatus: (courses) =>
    @_data.reset()
    _.each(courses, (course) =>
      @load(course.ecosystem_book_uuid, course) if course.is_concept_coach
    )

  load: (topic, data) =>
    # add description to data if description isn't in data
    description = getDescription(data)
    data = _.extend {}, {description}, data
    super(topic, data)

  isTeacherOf: (topic) ->
    isCourseRole(@_data.get(topic), 'teacher')

  isBusy: (topic) ->
    @apiChannel.isPending([
      'course.*.prevalidation'
      'course.*.registration'
      'course.*.confirmation'
      'course.*.studentUpdate'
    ], topic)

  unsetRegistration: (topic) ->
    @_registrationCache.unset(topic)

  getRegisteredCourses: ->
    _.filter @get(), checkStatuses.isRegistered

  getPendingValidatedCourses: ->
    _.filter @get(), checkStatuses.isValidated

  getStatus: (topic) ->
    course = @get(topic)

    isLoggedIn: user.isLoggedIn()
    isLoaded: user.get('isLoaded')
    isRegistered: course.isRegistered
    preValidate: (not user.isLoggedIn()) and (not course.isValidated)

  register: (ecosystem_book_uuid, enrollment_code) ->
    data = {enrollment_code, book_uuid: ecosystem_book_uuid, ecosystem_book_uuid}
    if @_registrationCache.get({ecosystem_book_uuid})?
      @_registrationCache.change(ecosystem_book_uuid, data)
    else
      @_registrationCache.set(ecosystem_book_uuid, data)

    if user.isLoggedIn()
      @registration(ecosystem_book_uuid, {data})
    else
      @prevalidation(ecosystem_book_uuid, {data})

  _onValidated: (response) =>
    {data, query} = response

    if data?.response is true
      @_registrationCache.change(query, {status: 'validated'})
      @emitUpdate(query, 'validated')

  _onRegistered: (response) =>
    {query} = response
    throw new Error("response is empty in onRegistered") if _.isEmpty(response)

    pendingCourse = getPendingCourseResponse(response)
    @_registrationCache.set(query, pendingCourse)
    @emitUpdate(query, 'registered')

    # signal the fetch to re-sync courses
    user.fetch()

  confirm: (topic, studentId) ->
    {id} = @get(topic)
    data = {id}
    data.student_identifier = studentId unless _.isEmpty(studentId)

    @confirmation(topic, {data})

  _onConfirmed: (response) =>
    {query} = response
    throw new Error("response is empty in onConfirmed") if _.isEmpty(response)

    @_registrationCache.unset(query)

    pendingCourse = getPendingCourseResponse(response)
    @load(query, pendingCourse)
    @emitUpdate(query, 'confirmed')

    # signal the fetch to re-sync courses
    user.fetch()

  updateStudent: (topic, attributes) ->
    {id} = @get(topic)
    data = _.extend({}, attributes, {id})
    @studentUpdate(topic, {data})

  _onStudentUpdated: (response) =>
    if response?.data
      @change(response.query, response.data)
      @load(response.query, @get(response.query))

  get: (topic) ->
    result = @_data.get(topic) or @_registrationCache.get(topic)

    if _.isEmpty(topic)
      _.mapObject(result, @extendCourse)
    else
      @extendCourse(result)

  extendCourse: (course) =>
    statuses = getStatuses(course)
    description = getDescription(course)

    _.extend({}, course, statuses, {description})

  destroy: ->
    @_registrationCache.reset()
    super()

module.exports = new CourseApi(COURSE_OPTIONS, ['prevalidation', 'registration', 'confirmation', 'studentUpdate'])
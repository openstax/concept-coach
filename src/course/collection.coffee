api = require '../api'
{ApiLink} = require '../helpers/api-link'

_ = require 'underscore'

STEP_TYPES =
  'free-response': ['free_response']
  'multiple-choice': ['answer_id', 'is_completed']

COURSE_OPTIONS =
  apiNameSpace: 'course'
  apiChannel: api.channel

class CourseApi extends ApiLink

  # complete and ready for use
  isRegistered: (topic) ->
    @get(topic).id and not (@isIncomplete(topic) or @isPending(topic))
  # Freshly initialized, registration code has not been entered
  isIncomplete: (topic) ->
    course = @get(topic)
    not (course.name or course.to)
  # The registration code has been validated but sign-up is not yet started
  isValidated: (topic) ->
    @get(topic).status is "validated"
  # A registration has been created, but not confimed
  isPending: (topic) ->
    @get(topic).status is "pending"

  getDescription: (topic) ->
    course = @get(topic)
    if @isIncomplete(topic) # still fetching
      ""
    else if @isPending(topic) # we originated from a join or move request
      msg = @describeMovePart(course.to)
      if course.from then "from #{@describeMovePart(course.from)} to #{msg}" else msg
    else
      "#{course.name} #{_.first(course.periods).name}"

  describeMovePart: (part) ->
    return '' unless part
    "#{part.course.name} (#{part.period.name}) by #{@teacherNames(part)}"


  teacherNames: (part) ->
    teachers = part.course.teachers
    names = _.map teachers, (teacher) ->
      teacher.name or "#{teacher.first_name} #{teacher.last_name}"
    # convert array to sentence
    if names.length > 1
      names.slice(0, names.length - 1).join(', ') + " and " + names.slice(-1)
    else
      _.first(names)

module.exports = new CourseApi(COURSE_OPTIONS)
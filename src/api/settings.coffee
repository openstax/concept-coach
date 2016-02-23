
getDefaultSettings = (apiNameSpace, {action, method, url}) ->
  setting = {}
  triggerEvent = "#{apiNameSpace}.*.#{action}"

  setting[triggerEvent] =
    url: url
    method: method

settings =

  endpoints:
    'exercise.*.save':
      url: 'api/steps/{id}'
      method: 'PATCH'
      base: 'exercise.{id}.save'

    'exercise.*.complete':
      url: 'api/steps/{id}/completed'
      method: 'PUT'
      base: 'exercise.{id}.complete'

    'exercise.*.fetch':
      url: 'api/steps/{id}'
      method: 'GET'
      base: 'exercise.{id}.fetch'

    'task.*.fetch':
      url: 'api/tasks/{id}'
      method: 'GET'
      base: 'task.{id}.fetch'

    'task.*.fetchByModule':
      url: 'api/cc/tasks/{collectionUUID}/{moduleUUID}'
      method: 'GET'
      base: 'task.{collectionUUID}/{moduleUUID}.fetchByModule'

    'user.status.fetch':
      url: 'auth/status'
      method: 'GET'
      useCredentials: true

    'courseDashboard.*.fetch':
      url: 'api/courses/{id}/cc/dashboard'
      method: 'GET'
      base: 'courseDashboard.{id}.fetch'

    'course.*.prevalidation':
      url: 'api/enrollment_changes/prevalidate'
      method: 'POST'
      base: 'course.{book_uuid}.prevalidation'

    'course.*.registration':
      url: 'api/enrollment_changes'
      method: 'POST'
      base: 'course.{book_uuid}.registration'

    'course.*.confirmation':
      url: 'api/enrollment_changes/{id}/approve'
      method: 'PUT'
      base: 'course.{id}.confirmation'

    'course.*.studentUpdate':
      url: 'api/user/courses/{id}/student'
      method: 'PATCH'
      base: 'course.{id}.studentUpdate'

module.exports = settings

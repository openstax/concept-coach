
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

    'exercise.*.complete':
      url: 'api/steps/{id}/completed'
      method: 'PUT'

    'exercise.*.fetch':
      url: 'api/steps/{id}'
      method: 'GET'

    'task.*.fetch':
      url: 'api/tasks/{id}'
      method: 'GET'

    'task.*.fetchByModule':
      url: 'api/cc/tasks/{collectionUUID}/{moduleUUID}'
      method: 'GET'

    'user.status.fetch':
      url: 'auth/status'
      method: 'GET'
      useCredentials: true

    'courseDashboard.*.fetch':
      url: 'api/courses/{id}/cc/dashboard'
      method: 'GET'

    'course.*.prevalidation':
      url: 'api/enrollment_changes/prevalidate'
      method: 'POST'

    'course.*.registration':
      url: 'api/enrollment_changes'
      method: 'POST'

    'course.*.confirmation':
      url: 'api/enrollment_changes/{id}/approve'
      method: 'PUT'

module.exports = settings

_ = require 'underscore'
api = require '../api'
{ApiLink} = require '../helpers/api-link'

BLANK_USER =
  is_admin: false
  is_content_analyst: false
  is_customer_service: false
  name: null
  profile_url: null
  isLoaded: false
  isLoggingOut: false

class UserApi extends ApiLink
  isLoggedIn: ->
    !!@_data.get('profile_url')

  isLoggingOut: ->
    @_data.get('isLoggingOut')

  _signalLogoutCompleted: ->
    @reset()
    @isLoggingOut = true
    @emit('logout.received')

  ensureStatusLoaded: ->
    @fetch() unless @isLoggedIn()

  filterForCourses: (data) ->
    _.property('courses')(data)

  filterForUser: (data) ->
    _.property('user')(data)

  load: (topic, data) ->
    dataToLoad = _.pick(data, 'endpoints')
    dataToLoad.isLoaded = true

    if data.access_token
      @apiChannel.emit('set.access_token', data.access_token)

    if data.user
      user = @filterForUser(data)
      courses = @filterForCourses(data)
      @emit('load.courses', courses)
    else
      @reset()

    _.extend(dataToLoad, user)

    super('status', dataToLoad)

  fetch: ->
    super('status', {})

module.exports = new UserApi({apiNameSpace: 'user', apiChannel: api.channel}, [], 'model', BLANK_USER)

React = require 'react'

api = require '../api'
StatusMixin = require './status-mixin'

getWaitingText = (status) ->
  "#{status}…"

UserStatus = React.createClass

  mixins: [StatusMixin]

  componentWillMount: ->
    @getUser().ensureStatusLoaded()

  render: ->
    user = @getUser()
    status = if user.isLoggedIn() then "logged in as #{user.name}" else 'an unknown user'
    <span>You are {status}</span>


module.exports = UserStatus

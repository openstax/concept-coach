React = require 'react'

UserStatus = require './status-mixin'

UserLoginButton = React.createClass

  PropTypes:
    onDisplayProfile: React.PropTypes.func.isRequired

  mixins: [UserStatus]

  onClick: ->
    # TODO: figure out if we need to save anything before transition
    if @getUser().isLoggedIn()
      @props.onDisplayProfile()
    else
      window.location.href = @getUser().endpoints.login + '?back=' + encodeURI(window.location.href)

  render: ->
    message = if @getUser().isLoggedIn() then 'Profile' else 'Login Now'
    <button onClick={@onClick}>{message}</button>

module.exports = UserLoginButton

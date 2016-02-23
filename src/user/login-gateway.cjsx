React = require 'react'
_ = require 'underscore'
User  = require './model'
api   = require '../api'

SECOND = 1000

LoginGateway = React.createClass

  propTypes:
    title: React.PropTypes.string
    window: React.PropTypes.shape(
      open: React.PropTypes.func
    )

  getDefaultProps: ->
    title: 'You need to login or signup in order to use ConceptCoach™'
    window: window

  getInitialState: ->
    loginWindow: false

  openLogin: (ev) ->
    ev.preventDefault()

    width  = Math.min(1000, window.screen.width - 20)
    height = Math.min(800, window.screen.height - 30)
    options = ["toolbar=no", "location=" + (if @props.window.opera then "no" else "yes"),
      "directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no",
      "width=" + width, "height=" + height,
      "top="   + (window.screen.height - height) / 2,
      "left="  + (window.screen.width - width)   / 2].join()
    loginWindow = @props.window.open(@urlForLogin(), 'oxlogin', options)
    @setState({loginWindow})
    _.delay(@windowClosedCheck, SECOND)

  parseAndDispatchMessage: (msg) ->
    return unless @isMounted()
    try
      data = JSON.parse(msg.data)
      if data.user
        api.channel.emit 'user.status.fetch.success', data: data
      @setState(loginWindow: false) # cancel checking for close
    catch error
      console.warn(error)
  componentWillUnmount: ->
    window.removeEventListener('message', @parseAndDispatchMessage)
  componentWillMount: ->
    window.addEventListener('message', @parseAndDispatchMessage)

  windowClosedCheck: ->
    return unless @isMounted()
    if @state.loginWindow and @state.loginWindow.closed
      User.fetch()
    else
      _.delay( @windowClosedCheck, SECOND)

  renderWaiting: ->
    <p>
      Please log in using your OpenStax account in the window. {@loginLink('Click to reopen window.')}
    </p>

  urlForLogin: ->
    User.get('endpoints').login + '?parent=' + encodeURIComponent(window.location.href)

  loginLink: (msg) ->
    <a data-bypass className='login' onClick={@openLogin} href={@urlForLogin()}>
      {msg}
    </a>

  renderLogin: ->
    <p>
      {@loginLink('click to begin login.')}
    </p>

  render: ->
    <div className='login'>
      <h3>{@props.title}</h3>
      {if @state.loginWindow then @renderWaiting() else @renderLogin()}
    </div>

module.exports = LoginGateway

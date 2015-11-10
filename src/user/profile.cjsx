React = require 'react'

api   = require '../api'
User  = require './model'

UserLogin = React.createClass

  PropTypes:
    onComplete: React.PropTypes.func.isRequired

  getInitialState: ->
    width: '100%', height: 400, currentTitle: ''

  # called by iframe when it's content is loaded and it's ready for requests
  iFrameReady: ->
    @sendCommand('loadPage', 'profile')

  setTitle: (title) ->
    @setState(currentTitle: title)

  pageLoad: (page) ->
    console.log "Loaded #{page}"

  # Note: we're currently not doing anything with the width because we want that to stay at 100%
  pageResize: ({width, height}) ->
    @setState(height: height)

  sendCommand: (command, payload) ->
    msg = JSON.stringify(data: {"#{command}": payload})
    React.findDOMNode(@refs.iframe).contentWindow.postMessage(msg, '*')

  parseAndDispatchMessage: (msg) ->
    return unless @isMounted()
    try
      json = JSON.parse(msg.data)
      return unless json.sourceWindowName is 'OxAccountIframe'
      for method, payload of json.data
        if @[method]
          @[method](payload)
        else
          console.warn?("Received message for unsupported #{method}")
    catch error
      console.warn(error)

  componentWillUnmount: ->
    window.removeEventListener('message', @parseAndDispatchMessage)
  componentDidMount: ->
    window.addEventListener('message', @parseAndDispatchMessage)

  render: ->
    # the other side of the iframe will validate our address and then only send messages to it
    me = window.location.protocol + '//' + window.location.host
    url = "#{User.endpoints.accounts_iframe}?parent=#{me}"
    <div>
      <h3>{@state.currentTitle}</h3>
      <hr/>
      <iframe src={url} ref='iframe'
        style={width: @state.width, height: @state.height, border: 0}
        id="OxAccountIframe" name="OxAccountIframe">
      </iframe>
      <div>
        <button onClick={@props.onComplete}>Done</button>
      </div>
    </div>


module.exports = UserLogin

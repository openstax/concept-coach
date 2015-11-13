React = require 'react'
classnames = require 'classnames'

AccountsIframe = require './accounts-iframe-mixin'
User  = require './model'

UserLogin = React.createClass

  mixins: [AccountsIframe]
  propTypes:
    onComplete: React.PropTypes.func.isRequired

  # called when an login process completes
  onLogin: (payload) ->
    api.channel.emit 'user.receive.statusUpdate', data: payload
    @props.onComplete()

  # called by iframe when it's content is loaded and it's ready for requests
  onIframeReady: ->
    @setState(isLoading: true)
    @sendCommand('displayLogin', User.endpoints.iframe_login)

  render: ->
    classlist = classnames('user-login', 'is-loading': @state.isLoading)

    <div className={classlist}>
      {@renderIframe()}
    </div>


module.exports = UserLogin

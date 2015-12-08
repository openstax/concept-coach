User = require './model'

UserStatusMixin = {

  componentDidMount: ->
    User.channel.on("change", @onUserChange)
    User.channel.on("logout.receive", @handleLogout)
  componentWillUnmount: ->
    User.channel.off("change", @onUserChange)
    User.channel.off("logout.receive", @handleLogout)
  onUserChange: ->
    @forceUpdate() if @isMounted()
  getUser: ->
    User
}

module.exports = UserStatusMixin

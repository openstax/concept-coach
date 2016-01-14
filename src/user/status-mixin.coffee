User = require './model'

UserStatusMixin = {

  componentDidMount: ->
    User.on("change", @onUserChange)
  componentWillUnmount: ->
    User.off("change", @onUserChange)
  onUserChange: ->
    @forceUpdate() if @isMounted()
  getUser: ->
    User
}

module.exports = UserStatusMixin

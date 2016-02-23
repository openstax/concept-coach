React = require 'react'

NewCourseRegistration = require './new-registration'
LoginGateway = require '../user/login-gateway'

EnrollOrLogin = React.createClass

  propTypes:
    collectionUUID: React.PropTypes.string.isRequired

  render: ->
    <div className="enroll-or-login">
      <LoginGateway title="Already entered an enrollment code?" />
      <NewCourseRegistration title='First time here?' {...@props} />
    </div>

module.exports = EnrollOrLogin

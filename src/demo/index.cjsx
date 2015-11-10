React = require 'react'
BS = require 'react-bootstrap'

{Task} = require '../task'
UserStatusMixin = require '../user/status-mixin'
UserStatus = require '../user/status'
UserProfile = require '../user/profile'
UserLoginButton = require '../user/login-button'

{ExerciseStep} = require '../exercise'

COLLECTION_UUID = 'C_UUID'
MODULE_UUID = 'm_uuid'

Demo = React.createClass
  displayName: 'Demo'

  mixins: [UserStatusMixin]

  toggleDisplayProfile: ->
    @setState(displayProfile: not @state?.displayProfile)

  render: ->
    if @state?.displayProfile
      return <UserProfile onComplete={@toggleDisplayProfile} />

    demos =
      task: <Task collectionUUID={COLLECTION_UUID} moduleUUID={MODULE_UUID}/>

    demos = _.map(demos, (demo, name) ->
      <BS.Row>
        <BS.Col xs={12}>
          <h1>{"#{name}"}</h1>
          <section className={"#{name}-demo"}>{demo}</section>
        </BS.Col>
      </BS.Row>
    )

    <BS.Grid className='demo'>
      <UserStatus />
      <UserLoginButton onDisplayProfile={@toggleDisplayProfile} />
      {demos}
    </BS.Grid>

module.exports = Demo

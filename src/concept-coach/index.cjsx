_ = require 'lodash'
EventEmitter2 = require 'eventemitter2'

helpers = require '../helpers'
api = require '../api'

{ModalCoach, channel} = require './modal-coach'

CCWrapped = helpers.wrapComponent(ModalCoach)

publicChannel = new EventEmitter2 wildcard: true

listenAndBroadcast = (channelOut) ->
  api.channel.on 'error', (response) ->
    channelOut.emit('api.error', response)

  api.channel.on 'user.receive.statusUpdate', (response) ->
    channelOut.emit('user.change', response)

  channel.on 'coach.mount.success', (eventData) ->
    channelOut.emit('open', eventData)
  channel.on 'close.clicked', ->
    channelOut.emit('ui.close')

publicMethods =
  init: (baseUrl) ->
    api.initialize(baseUrl)
    listenAndBroadcast(publicChannel)

    api.channel.emit('user.send.statusUpdate')

  open: (mountNode, props) ->
    props = _.clone(props)

    modalNode = document.createElement('div')
    modalNode.classList.add('concept-coach-wrapper')
    mountNode.appendChild(modalNode)

    props.close = ->
      channel.emit('close.clicked')
      CCWrapped.unmountFrom(modalNode)
      mountNode.removeChild(modalNode)

    renderedComponent = CCWrapped.render(modalNode, props)

    @close = props.close

    renderedComponent

  handleError: (error) ->
    channel.emit('error', error)
    console.info(error)

cc = _.defaults(publicChannel, publicMethods)

module.exports = cc

React = require 'react/addons'
classnames = require 'classnames'
api = require '../api'
_ = require 'underscore'

interpolate = require 'interpolate'

Reactive = React.createClass
  displayName: 'Reactive'

  propTypes:
    children: React.PropTypes.node.isRequired
    store: React.PropTypes.object.isRequired
    topic: React.PropTypes.string.isRequired
    apiChannelPattern: React.PropTypes.string
    channelUpdatePattern: React.PropTypes.string
    apiChannelName: React.PropTypes.string
    fetcher: React.PropTypes.func
    filter: React.PropTypes.func
    getStatusMessage: React.PropTypes.func
    getter: React.PropTypes.func

  getDefaultProps: ->
    apiChannelPattern: '{apiChannelName}.{topic}.*'
    channelUpdatePattern: 'load.{topic}'

  getInitialState: ->
    {channelUpdatePattern, apiChannelPattern} = @props

    state = @getState()
    state.status = 'loading'

    state.storeChannelUpdate = interpolate(channelUpdatePattern, @props)
    state.apiChannelSend = interpolate(apiChannelPattern, @props)

    state

  fetchModel: (props) ->
    props ?= @props
    {topic, store, fetcher} = props

    if _.isFunction(fetcher) then fetcher.call(store, props) else store.fetch(topic)

  getState: (eventData = {}, props) ->
    props ?= @props
    {topic, store, getter, channelUpdatePattern, apiChannelPattern} = props
    {status} = eventData
    status ?= 'loaded'

    errors = eventData?.data?.errors

    item: getter?(topic) or store.get?(topic)
    status: status
    errors: errors
    storeChannelUpdate: interpolate(channelUpdatePattern, props)
    apiChannelSend: interpolate(apiChannelPattern, props)

  isForThisComponent: (eventData, props) ->
    props ?= @props
    {topic, filter} = props

    eventData.errors? or filter?(props, eventData) or eventData?.data?.id is topic or eventData?.data?.topic is topic

  update: (eventData, props) ->
    props ?= @props
    return unless @isForThisComponent(eventData, props)

    nextState = @getState(eventData, props)
    @setState(nextState)

  setStatus: (eventData) ->
    return unless @isForThisComponent(eventData)

    {status} = eventData
    @setState({status})

  startListening: (props, state) ->
    props ?= @props
    state ?= @state

    {store} = props
    {storeChannelUpdate, apiChannelSend} = state

    store.on(storeChannelUpdate, @update)
    api.channel.on(apiChannelSend, @setStatus)

  stopListening: (props, state) ->
    props ?= @props
    state ?= @state

    {store} = props
    {storeChannelUpdate, apiChannelSend} = state

    store.off(storeChannelUpdate, @update)
    api.channel.off(apiChannelSend, @setStatus)

  componentWillMount: ->
    @startListening()
    @fetchModel()

  componentWillUnmount: ->
    @stopListening()

  componentWillReceiveProps: (nextProps) ->
    if nextProps.topic isnt @props.topic
      stubDataForImmediateUpdate =
        data:
          id: nextProps.topic
        status: 'cached'

      @update(stubDataForImmediateUpdate, nextProps)
      @fetchModel(nextProps)

  componentDidUpdate: (prevProps, prevState) ->
    @stopListening(prevProps, prevState)
    @startListening()

  render: ->
    {status, item} = @state
    {className} = @props

    classes = classnames 'reactive', "reactive-#{status}", className,
      'is-empty': _.isEmpty(item)

    propsForChildren = _.pick(@state, 'status', 'item', 'errors')

    reactiveItems = React.Children.map(@props.children, (child) ->
      React.addons.cloneWithProps(child, propsForChildren)
    )

    <div className={classes}>
      {reactiveItems}
    </div>

module.exports = {Reactive}

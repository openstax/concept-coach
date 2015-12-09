React = require 'react'
_ = require 'underscore'
classnames = require 'classnames'
tasks = require './collection'
navigation = require '../navigation/model'

{ChapterSectionMixin} = require 'openstax-react-components'
componentModel = require '../concept-coach/model'

TaskTitle = React.createClass
  displayName: 'TaskTitle'
  mixins: [ChapterSectionMixin]

  contextTypes:
    close: React.PropTypes.func

  broadcastNav: ->
    {collectionUUID, moduleUUID, taskId, cnxUrl} = @props
    {close} = @context
    {link} = tasks.getModuleInfo(taskId, cnxUrl)

    componentModel.update(scrollY: 0)
    close()
    navigation.channel.emit('close.for.book', {collectionUUID, moduleUUID, link})

  render: ->
    {taskId, cnxUrl} = @props
    {close} = @context
    moduleInfo = tasks.getModuleInfo(taskId, cnxUrl)
    section = @sectionFormat(moduleInfo.chapter_section)

    sectionProps =
      className: 'chapter-section-prefix'
    sectionProps['data-section'] = section if section?

    linkProps =
      role: 'button'

    if moduleInfo.title
      linkProps.target = '_blank'
      linkProps.onClick = @broadcastNav
      title = <span> Go to
        <span {...sectionProps}>
          {moduleInfo.title}
        </span>
      </span>
    else
      noTitle = <span>Back to Book</span>
      linkProps =
        onClick: close

    titleClasses = classnames 'concept-coach-title',
      'has-title': moduleInfo.title?
      'back-to-book': noTitle?

    <p className={titleClasses}>
      <a {...linkProps}>
        <i className='fa fa-book'></i>
        {title}
        {noTitle}
      </a>
    </p>

module.exports = {TaskTitle}

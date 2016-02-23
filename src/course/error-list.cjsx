React = require 'react'
courses = require './collection'

ErrorList = React.createClass
  render: ->
    return null
    return null unless @props.course.hasErrors()
    <div className="alert alert-danger">
      <ul className="errors">
        {for msg, i in @props.course.errorMessages()
          <li key={i}>{msg}</li>}
      </ul>
    </div>


module.exports = ErrorList

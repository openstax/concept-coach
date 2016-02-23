_ = require 'underscore'
api = require '../api'
{ApiLink} = require '../helpers/api-link'

class ProgressApi extends ApiLink
  getFilteredChapters: (id, uuids = []) ->
    progresses = @get(id)
    return unless progresses?
    {chapters} = progresses

    _.chain(chapters)
      .map((chapter) ->
        chapter.pages = _.reject(chapter.pages, (page) ->
          _.indexOf(uuids, page.uuid) > -1
        )
        return null if _.isEmpty chapter.pages
        chapter
      )
      .compact()
      .value()

module.exports = new ProgressApi(apiNameSpace: 'courseDashboard', apiChannel: api.channel)

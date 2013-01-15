###
A list of blog posts.
###

class window.Blog extends Control

  inherited:
    content: [
      control: "List"
      ref: "postList"
      itemClass: "BlogPost"
      mapFunction: "entry"
    ]

  count: Control.property.integer()

  feed: Control.property()

  initialize: ->
    @reload()

  itemClass: Control.chain("$postList", "itemClass")
  mapFunction: Control.chain("$postList", "mapFunction")
  reload: Control.iterator(->
    return  unless @feed()
    url = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0"
    url += @_urlParam("q", @feed())
    url += @_urlParam("num", @count())
    url += @_urlParam("callback", "?")
    $.getJSON(url).success (data) =>
      entries = (if (data.responseData and data.responseData.feed and data.responseData.feed.entries) then data.responseData.feed.entries else null)
      @_entries entries

  )
  _entries: Control.chain("$postList", "items")
  _urlParam: (key, value) ->
    (if value then "&" + key + "=" + value else "")


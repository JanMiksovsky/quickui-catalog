###
A typical web search box. Ensures search string is non-empty, and pressing
Enter launches search.
###

class window.SearchBox2 extends TextBoxWithButton

  inherited:
    goButtonContent: [
      html: "<img src='http://quickui.org/release/resources/search_16x16.png'/>"
      ref: "searchIcon"
    ]
    placeholder: "Search"

  initialize: ->
    unless @query()
      # Default search is a Google search on the current domain.
      hostname = window.location.hostname
      @query "http://www.google.com/search?q=%s+site%3A" + hostname
    @on "goButtonClick", => @search()

  # The search query that should be executed when the user presses the "Go"
  # button. This should be string containing the sequence "%s", which will
  # be replaced with the search terms the user has entered in the text box.
  # The default value of this property will use Google to search the
  # current site.
  query: Control.property()
  
  # Initiate the search.
  search: Control.iterator ->
    url = @query()?.replace "%s", @content()
    window.location.href = url

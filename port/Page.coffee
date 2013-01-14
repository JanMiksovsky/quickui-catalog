###
General base class for pages. 
###

class window.Page extends Control
  className: "Page"
  inherited:
    generic: "true"



  # True if the page should fill its container. Default is false.
  fill: Control.chain("applyClass/fill")
  initialize: ->
    
    # Force a refresh of the page title. Subclasses may want to handle the
    # title specially (e.g., to reflect it as a heading on the page), and
    # this gives them a chance to do that.
    @title @title()

  # The URL parameters for the current page. Read-only.
  urlParameters: ->
    Page.urlParameters()

  # The title of the page. This will generally be shown in the browser's
  # window title bar, etc.
  title: (title) ->
    if this[0] is document.body
      
      # This page is the document, mirror the document's title.
      if title is undefined
        document.title
      else
        document.title = title
        this
    else
      
      # This page is not (yet) the document, keep a private copy of the title.
      @_title title

  
  # Private copy of the page's title.
  _title: Control.property()

#
# Class members.
# 
Page.extend

  # Start actively tracking changes in a page specified on the URL.
  # For a URL like www.example.com/index.html#page=Foo, load class Foo.
  # If the page then navigates to www.example.com/index.html#page=Bar, this
  # will load class Bar in situ, without forcing the browser to reload the page. 
  trackClassFromUrl: (defaultPageClass, target) ->
    $control = Control(target or "body")
    
    # Watch for changes in the URL after the hash.
    $(window).hashchange ->
      pageClass = Page.urlParameters().page or defaultPageClass
      $control.transmute pageClass

    
    # Trigger a page class load now.
    $(window).hashchange()

  # Return the URL parameters (after "&" and/or "#") as a JavaScript object.
  # E.g., if the URL looks like http://www.example.com/index.html?foo=hello&bar=world
  # then this returns the object
  #
  #    { foo: "hello", bar: "world" }
  #
  urlParameters: ->
    regex = /[?#&](\w+)=([^?#&]*)/g
    results = {}
    match = regex.exec(window.location.href)
    while match?
      parameterName = match[1]
      parameterValue = match[2]
      results[parameterName] = parameterValue
      match = regex.exec(window.location.href)
    results

#
# General utility functions made available to all controls.
# 

# Look up the page hosting a control.
Control::extend page: ->
  
  # Get the containing DOM element subclassing Page that contains the element
  pages = @closest(".Page")
  
  # From the DOM element, get the associated QuickUI control.
  (if (pages.length > 0) then pages.control() else null)


###
Wraps an anchor tag.

Unlike a stock anchor tag, this will show a hand cursor even when the href
is empty, as is often the case with a link whose behavior is determined by
a click event handler.

The link will have the "current" style if it points to the current page.

This can also serve as a useful base class for custom link classes.
###

class window.Link extends Control

  # True if the link points to the current page.
  current: Control.chain "applyClass/current"

  # The location that will be opened if the user clicks the link.
  href: Control.chain( "prop/href", ->
    @_checkIfCurrent()
  )
  
  initialize: ->
    if @href()
      @_checkIfCurrent()
    else      
      # Set a placeholder href which will force the display of an underline, and
      # use of a hand cursor.
      @href "javascript:"

  # True if the link points to an area of the site (with sub-pages). If true,
  # the link will be considered current if it points to any page within that
  # area of the site. The default is false.
  linksToArea: Control.property ->
    @_checkIfCurrent()

  tag: "a"

  # The target of the link.
  target: Control.chain "prop/target"

  # Apply the "current" style if the link points to the page we're on.
  _checkIfCurrent: ->
    localPath = @_localPath()
    current = if localPath?
      pathname = window.location.pathname
      pathToMatch = if @linksToArea()
        # Area link: Current if it matches on the left.
        pathname.substring 0, localPath.length
      else
        # Normal link: Current if the whole path matches. 
        pathname
      ( localPath == pathToMatch )
    else
      false
    @current current

  # Returns the pathname portion of the link (the portion after the domain) if
  # the link points to a location in the current domain. Otherwise return null.
  _localPath: ->
    href = @href()
    unless href?
      return null
    origin = "#{window.location.protocol}//#{window.location.hostname}/"
    # Does left portion of link match origin?
    if href.substring( 0, origin.length ) == origin
      # Remove most of origin, but leave in the last slash.
      href.substring origin.length - 1 
    else
      href

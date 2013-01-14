#
#Wraps an anchor tag.
#
#Unlike a stock anchor tag, this will show a hand cursor even when the href
#is empty, as is often the case with a link whose behavior is determined by
#a click event handler.
#
#The link will have the "current" style if it points to the current page.
#
#This can also serve as a useful base class for custom link classes.
#
window.Link = Control.sub(
  className: "Link"
  tag: "a"
)
Link::extend

  # True if the link points to the current page.
  current: Control.chain("applyClass/current")

  # The location that will be opened if the user clicks the link.
  href: Control.chain("prop/href", ->
    @_checkIfCurrent()
  )
  initialize: ->
    if @href()
      @_checkIfCurrent()
    else
      
      # Set a placeholder href which will force the display of an
      # underline, and use of a hand cursor.
      @href "javascript:"


  # True if the link points to an area of the site (with sub-pages). If
  # true, the link will be considered current if it points to any page within
  # that area of the site. The default is false.
  linksToArea: Control.property(->
    @_checkIfCurrent()
  )

  # The target of the link.
  target: Control.chain("prop/target")

  # Apply the "current" style if the link points to the page we're on.
  _checkIfCurrent: ->
    current = false
    localPath = @_localPath()
    if localPath
      pathname = window.location.pathname
      
      # Area link: Current if it matches on the left.
      
      # Normal link: Current if the whole path matches. 
      pathToMatch = (if @linksToArea() then pathname.substring(0, localPath.length) else pathname)
      current = (localPath is pathToMatch)
    @current current


  # Returns the pathname portion of the link (the portion after the domain)
  # if the link points to a location in the current domain. Otherwise
  # return null.
  _localPath: ->
    href = @href()
    return null  unless href
    origin = window.location.protocol + "//" + window.location.hostname + "/"
    
    # Does left portion of link match origin?
    # Include last slash in origin
    pathname = (if (href.substring(0, origin.length) is origin) then href.substring(origin.length - 1) else href)


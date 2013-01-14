###
Display children as elements on a sliding horizontal strip; only one element
is visible at a time. The strip can be programmatically slid left and right.
###

window.SlidingPanels = Sequence.sub(
  className: "SlidingPanels"
  inherited:
    content: [" ",
      html: "<div />"
      ref: "SlidingPanels_content"
    , " "]
)
SlidingPanels::extend

  # The index of the control currently being shown.
  activeIndex: (activeIndex) ->
    result = @_super(activeIndex)
    if activeIndex isnt `undefined`
      panel = @elements().eq(activeIndex)
      if panel.length > 0
        left = panel.position().left
        if SlidingPanels.hasTransitions(@$SlidingPanels_content())
          
          # Use CSS animation.
          @$SlidingPanels_content().css "left", -left
        else
          
          # Fall back to jQuery animation.
          @$SlidingPanels_content().animate
            left: -left
          , "fast"
    result


  # The array of elements in the sequence; only one will be shown at a time.
  # 
  # If the set changes, this will attempt to preserve the one that was
  # previously active. Otherwise, the first element is made active.
  content: (content) ->
    result = @_super(content)
    @_adjustWidths()  if content isnt `undefined`
    result

  initialize: ->
    self = this
    @inDocument(->
      @_adjustWidths()
    ).on "layout sizeChanged", ->
      self._adjustWidths()


  
  # Force all elements and the control itself to the maximium width of the elements.
  _adjustWidths: ->
    elements = @elements()
    return  if elements.length is 0
    panelWidths = elements.map((index, panel) ->
      $(panel).width()
    ).get()
    maxpanelWidth = Math.max.apply(this, panelWidths)
    elements.width maxpanelWidth  if maxpanelWidth > 0
    panelOuterWidths = elements.map((index, panel) ->
      $(panel).outerWidth true
    ).get()
    maxpanelOuterWidth = Math.max.apply(this, panelOuterWidths)
    @width maxpanelOuterWidth  if maxpanelOuterWidth > 0

  _container: Control.chain("$SlidingPanels_content")


#
# Class methods
# 

# Returns true if the given element has CSS transitions applied to it.
SlidingPanels.extend hasTransitions: ($element) ->
  transitionProperties = ["-webkit-transition", "transition"]
  
  # HACK for IE8, in which jQuery 1.7.2 will throw an exception if we
  # try to get the css("transition") property.
  return false  if Control.browser.msie and parseInt(Control.browser.version) < 9
  i = 0

  while i < transitionProperties.length
    value = $element.css(transitionProperties[i])
    return true  if value isnt `undefined` and value isnt ""
    i++
  false


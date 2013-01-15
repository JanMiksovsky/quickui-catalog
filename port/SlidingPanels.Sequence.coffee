###
Display children as elements on a sliding horizontal strip; only one element
is visible at a time. The strip can be programmatically slid left and right.
###

class window.SlidingPanels extends Sequence

  inherited:
    content: [
      html: "<div />"
      ref: "SlidingPanels_content"
    ]

  # The index of the control currently being shown.
  activeIndex: (activeIndex) ->
    result = super activeIndex
    if activeIndex isnt undefined
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
    result = super content
    @_adjustWidths()  if content isnt undefined
    result

  # Returns true if the given element has CSS transitions applied to it.
  @hasTransitions: ($element) ->
    transitionProperties = ["-webkit-transition", "transition"]
    if Control.browser.msie and parseInt(Control.browser.version) < 9
      # HACK for IE8, in which jQuery 1.7.2 will throw an exception if we
      # try to get the css("transition") property.
      return false
    i = 0
    while i < transitionProperties.length
      value = $element.css(transitionProperties[i])
      return true  if value isnt undefined and value isnt ""
      i++
    false

  initialize: ->
    @inDocument -> @_adjustWidths()
    @on "layout sizeChanged", => @_adjustWidths()
  
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

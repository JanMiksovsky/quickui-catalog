###
Pick exactly one child to show at a time. 
###

class window.Modes extends Sequence

  initialize: ->
    @on "layout sizeChanged", => @_sizeChanged()
    @inDocument -> @_sizeChanged()

  # True if the control should always adjust its own height to be as tall as its
  # tallest child, whether or not that child is currently active.
  maximize: Control.chain "applyClass/maximize"

  # The size of a child may have changed. Make the control as tall as the
  # tallest child.
  _sizeChanged: ->
    elements = @elements()
    unless @maximize() and elements.length > 0
      return
    childHeights = ( element.outerHeight true for element in elements.segments() )
    maxChildHeight = Math.max childHeights...
    if maxChildHeight > 0
      @height maxChildHeight

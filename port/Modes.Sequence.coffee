###
Pick exactly one child to show at a time. 
###

class window.Modes extends Sequence

  initialize: ->
    self = this
    @on "layout sizeChanged", ->
      self._sizeChanged()

    @inDocument ->
      @_sizeChanged()

  # True if the control should always adjust its own height to be as tall
  # as its tallest child, whether or not that child is currently active.
  maximize: Control.chain("applyClass/maximize")

  # The size of a child may have changed. Make the control as tall as the
  # tallest child.
  _sizeChanged: ->
    return  unless @maximize()
    elements = @elements()
    return  if elements.length is 0
    childHeights = elements.map((index, child) ->
      $(child).outerHeight true
    ).get()
    maxChildHeight = Math.max.apply(this, childHeights)
    @height maxChildHeight  if maxChildHeight > 0


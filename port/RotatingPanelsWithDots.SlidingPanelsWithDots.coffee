###
Rotates once through a set of elements automatically when control is loaded.
The rotation stops if the user clicks to navigate to a specific page.
###

class window.RotatingPanelsWithDots extends SlidingPanelsWithDots

  initialize: ->
    @click => @stop()
    @inDocument -> @_queueRotation()

  # Rotates to the next page. When it hits the last one, it rotates
  # back to the first page and stops.
  rotate: Control.iterator ->
    count = @elements().length
    if count > 0
      index = @activeIndex()
      index = ( index + 1 ) % count
      @activeIndex index
      if index > 0
        @_queueRotation()

  # Interval between rotation animations. This does not include the duration
  # of the sliding animation. The default value is 1000 (one second).
  rotationInterval: Control.property.integer( null, 1000 )

  # Stop the rotation in progress.
  stop: Control.iterator ->
    clearTimeout @_timeout()
    @_timeout null
    @

  _queueRotation: ->
    rotationInterval = @rotationInterval()
    @_timeout setTimeout =>
      @rotate()
    , rotationInterval

  _timeout: Control.property()

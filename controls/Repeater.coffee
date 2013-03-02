###
Creates a certain number of instances of another control class. 
###

class window.Repeater extends Control

  # The content which will be repeated in each instance.
  content: Control.property ( content ) ->
    @_refreshContent()

  # The generated collection of controls.
  controls: Control.chain "children", "control"

  # The number of repetitions to create.
  # The default count is 1.
  count: Control.property.integer( ->
    @_refresh()
  , 1 )

  initialize: ->
    unless @controls()?
      @_refresh()

  # True if the Repeater should append "1", "2", "3", etc., after the content of
  # each instance.
  increment: Control.property.bool ->
    @_refreshContent()

  # The class that will be repeated.
  repeatClass: Control.property.class ->
    @_refresh()

  _refresh: ->
    repeatClass = @repeatClass()
    count = @count()
    if repeatClass? and count > 0
      controls = new Control ( repeatClass.create() for i in [ 0 .. count - 1 ] )
      @_refreshContent controls
      # Use base .content() property since we've overridden it.
      ( new Control( this )).content controls

  _refreshContent: ( controls ) ->
    controls = controls ? @controls()
    # TODO: if content is jQuery object, should clone elements. 
    content = @content()
    increment = @increment()
    for control, index in controls.segments()
      instanceContent = if content and increment
        content + " " + ( index + 1 )
      else if content
        content
      else if increment
        index + 1
      if instanceContent
        control.content instanceContent

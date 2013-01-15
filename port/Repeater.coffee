###
Creates a certain number of instances of another control class. 
###

class window.Repeater extends Control
Repeater::extend

  # The content which will be repeated in each instance.
  content: Control.property((content) ->
    @_refreshContent @controls()
  )

  # The generated collection of controls.
  controls: Control.chain("children", "control")

  # The number of repetitions to create.
  # The default count is 1.
  count: Control.property.integer(->
    @_refresh()
  , 1)
  initialize: ->
    @_refresh()  unless @controls()?

  # True if the Repeater should append "1", "2", "3", etc., after the
  # content of each instance.
  increment: Control.property.bool(->
    @_refreshContent @controls()
  )

  # The class that will be repeated.
  repeatClass: Control.property.class(->
    @_refresh()
  )
  _refresh: ->
    repeatClass = @repeatClass()
    count = @count()
    if repeatClass and count > 0
      controls = []
      i = 0

      while i < count
        $control = repeatClass.create()
        controls.push $control
        i++
      @_refreshContent controls
    
    # Use base .content() property since we've overridden it.
    Control(this).content controls

  _refreshContent: (controls) ->
    return  unless controls?
    content = @content()
    increment = @increment()
    i = 0

    while i < controls.length
      $control = $(controls[i]).control()
      
      # TODO: if content is jQuery object, should clone elements. 
      instanceContent = undefined
      if content and increment
        instanceContent = content + " " + (i + 1)
      else if content
        instanceContent = content
      else instanceContent = i + 1  if increment
      $control.content instanceContent  if instanceContent
      i++


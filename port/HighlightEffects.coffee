###
Apply effects on hover, which can include changing the item's size
and position.

To animate color properties, use a plugin such as Color Animation at
http://plugins.jquery.com/project/color-animation.
###

class window.HighlightEffects extends Control

  inherited:
    content: [
      html: "<div />"
      ref: "HighlightEffects_content"
    ]
    generic: "true"

  _originalState: Control.property()

  # The control's content.
  content: Control.chain( "$HighlightEffects_content", "content", ->
    @_recalc()  if @inDocument()
  )

  # The CSS to apply to the content in the normal state.
  contentCss: Control.chain "$HighlightEffects_content", "css"

  # The speed with which animations are applied.
  # 
  # This uses a faster default than $.animate(), since hover animations
  # should generally respond quickly.
  # 
  # Set this to 0 to have effects applied instantaneously.
  duration: Control.property( null, 100 )

  # The effects that will be applied on hover.
  effects: Control.property( ->
    @_originalState @_getCurrentState()
  )
  initialize: ->
    @on "layout", => @_recalc()
    @hover =>
      @_hoverIn()
    , =>
      @_hoverOut()
    @inDocument ->
      @_originalState( @_getCurrentState() )._recalc()

  # Get the current values of all CSS attributes which will be overwritten
  # by the effects. This snapshot is used on hover out to restore the
  # original state.
  _getCurrentState: ->
    currentState = {}
    $content = @$HighlightEffects_content()
    effects = @effects()
    for key of effects
      value = undefined
      switch key

        # When border properties are applied, they may get split up
        # into border-<side> properties, leaving the overall border
        # properties empty. So, use the properties of one of the
        # border sides as a proxy for the overall border properties.
        when "border-color"
          value = $content.css( "border-top-color" )
        when "border-width"
          value = $content.css( "border-top-width" )

        # Map dimensions of "auto" to "0" so that the dimension can
        # be animated. 
        when "bottom", "left", "right", "top"
          value = $content.css( key )
          value = "0"  if value is "auto"
        else
          value = $content.css( key )
      currentState[key] = value
    currentState

  _hoverIn: ->
    # In case this was doing its _hoverOut animation
    # In front of any element doing _hoverOut
    @$HighlightEffects_content().stop().css( 
      position: "absolute"
      "z-index": "2"
    ).animate @effects(), @duration()

  _hoverOut: ->
    savedState = @_originalState() or {}
    # In case this was doing its _hoverIn animation
    
    # Show in front of peer elements, but behind _hoverIn element.
    @$HighlightEffects_content().stop().css( "z-index": "1" ).animate savedState, @duration(), null, ->
      
      # Restore normal positioning when animation completes.
      $( this ).css
        position: "inherit"
        "z-index": "inherit"

  # Update the control's size to match the contents. This lets us
  # apply absolute positioning to the contents on hover while still
  # preserving room for the content in the normal document flow.
  _recalc: ->
    @height @$HighlightEffects_content().outerHeight()
    @width @$HighlightEffects_content().outerWidth()


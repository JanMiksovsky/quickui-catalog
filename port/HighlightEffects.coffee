###
Apply effects on hover, which can include changing the item's size
and position.

To animate color properties, use a plugin such as Color Animation at
http://plugins.jquery.com/project/color-animation.
###

class window.HighlightEffects extends Control

  inherited:
    content: [
      html: "<div/>", ref: "HighlightEffects_content"
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
  # This uses a faster default than $.animate(), since hover animations should
  # generally respond quickly.
  # 
  # Set this to 0 to have effects applied instantaneously.
  duration: Control.property null, 100

  # The effects that will be applied on hover.
  effects: Control.property ->
    @_originalState @_getCurrentState()
  
  initialize: ->
    @on
      layout: => @_recalc()
      mouseenter: => @_hoverIn()
      mouseleave: => @_hoverOut()
    @inDocument ->
      @_originalState @_getCurrentState()
      @_recalc()

  # Get the current values of all CSS attributes which will be overwritten by
  # the effects. This snapshot is used on hover out to restore the original
  # state.
  _getCurrentState: ->
    currentState = {}
    $content = @$HighlightEffects_content()
    for key of @effects()
      currentState[ key ] = switch key
        # When border properties are applied, they may get split up into
        # border-<side> properties, leaving the overall border properties empty.
        # So, use the properties of one of the border sides as a proxy for the
        # overall border properties.
        when "border-color"
          $content.css "border-top-color"
        when "border-width"
          $content.css "border-top-width"
        when "bottom", "left", "right", "top"
          if $content.css( key ) == "auto"
            # Map "auto" to "0" so that the dimension can be animated.
            "0"
          else
            $content.css key
        else
          $content.css key
    currentState

  _hoverIn: ->
    @$HighlightEffects_content()
      .stop() # In case this was doing its _hoverOut animation.
      .css(
        position: "absolute"
        "z-index": "2"  # In front of any element doing _hoverOut
      )
      .animate @effects(), @duration()

  _hoverOut: ->
    savedState = @_originalState() ? {}
    
    @$HighlightEffects_content()
      .stop() # In case this was doing its _hoverIn animation
      .css( "z-index": "1" ) # In front of peer elements, but behind _hoverIn element.
      .animate savedState, @duration(), null, ->      
        # Restore normal positioning when animation completes.
        $( this ).css
          position: "inherit"
          "z-index": "inherit"

  # Update the control's size to match the contents. This lets us apply absolute
  # positioning to the contents on hover while still preserving room for the
  # content in the normal document flow.
  _recalc: ->
    @height @$HighlightEffects_content().outerHeight()
    @width @$HighlightEffects_content().outerWidth()

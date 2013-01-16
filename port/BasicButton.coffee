###
Button base class.

Handles mouse events, abstract styles. 
###

class window.BasicButton extends Control

  inherited:
    generic: "true"

  # The current state of the button. Read-only.
  # This will return one of the following values:
  # 
  #  BasicButton.normal
  #  BasicButton.hover
  #  BasicButton.focus
  #  BasicButton.active
  #  BasicButton.disabled
  #
  buttonState: ->
    if @disabled()
      BasicButton.state.disabled
    else if ( @isMouseButtonDown() and @isMouseOverControl() ) or @isKeyPressed()
      BasicButton.state.active
    else if @isFocused()
      BasicButton.state.focus
    else if @isMouseOverControl()
      BasicButton.state.hover
    else
      BasicButton.state.normal

  # True if the button is disabled.
  # 
  # Setting this also applies "disabled" class for IE8, which doesn't support
  # the :disabled pseudo-class.
  disabled: Control.chain( "prop/disabled", ( disabled ) ->    
    if disabled
      # Force removal of interactive states.
      @removeClass "active focus hover"
    @toggleClass "disabled", disabled
    @_renderButton()
  )
  
  initialize: ->
    @on
      blur: ( event ) => @_trackBlur event
      focus: ( event ) => @_trackFocus event
      keydown: ( event ) => @_trackKeydown event
      keyup: ( event ) => @_trackKeyup event
      mousedown: ( event ) => @_trackMousedown event
      mouseenter: ( event ) => @_trackMousein event
      mouseleave: ( event ) => @_trackMouseout event
      mouseup: ( event ) => @_trackMouseup event
    @_renderButton()

  # True if the button currently has the focus.
  isFocused: Control.property.bool( null, false )

  # True if the user is currently pressing down a key.
  isKeyPressed: Control.property.bool( null, false )

  # True if the mouse button is currently down.
  isMouseButtonDown: Control.property.bool( null, false )

  # True if the mouse is currently over the button.
  isMouseOverControl: Control.property.bool( null, false )

  # True if the button's "quiet" style should be applied. The generic quiet
  # styling shows no background or border effects in the button's normal
  # state -- only when the user is interacting with the button -- so that
  # the button can more easily blend in as a component of other controls.
  quiet: Control.chain "applyClass/quiet"

  @state:
    normal: 0
    hover: 1
    focus: 2
    active: 3
    disabled: 4

  tag: "button"

  _renderButtonState: ( buttonState ) ->

  _renderButton: ->
    @_renderButtonState @buttonState()

  _trackBlur: ( event ) ->
    # Losing focus causes the button to override any key that had been active.
    @removeClass( "focus" )
      .isKeyPressed( false )
      .isFocused( false )
      ._renderButton()

  _trackFocus: ( event ) ->
    @addClass( "focus" )
      .isFocused( true )
      ._renderButton()

  _trackKeydown: ( event ) ->
    if event.which == 32 or event.which == 13 # Space or Enter
      @isKeyPressed( true )._renderButton()

  _trackKeyup: ( event ) ->
    @isKeyPressed( false )._renderButton()

  _trackMousedown: ( event ) ->
    @addClass( "active" )
      .isMouseButtonDown( true )
      ._renderButton()

  _trackMousein: ( event ) ->
    @addClass( "hover" )
      .isMouseOverControl( true )
      ._renderButton()

  _trackMouseout: ( event ) ->
    @removeClass( "focus hover active" )
      .isMouseOverControl( false )
      ._renderButton()

  _trackMouseup: ( event ) ->
    @removeClass( "active" )
      .isMouseButtonDown( false )
      ._renderButton()

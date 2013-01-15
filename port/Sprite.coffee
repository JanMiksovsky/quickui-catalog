###
Very basic CSS image sprite.
The images have to be stacked vertically, and all be the same height.
###

class window.Sprite extends Control

  # The sprite image.
  image: Control.chain "css/background-image"

  # The height of a single cell in the sprite image, in pixels.
  cellHeight: Control.property ( value ) ->
    @css "height", value + "px"
    @_shiftBackground()

  # The sprite cell currently shown.
  currentCell: Control.property( ( value ) ->
    @_shiftBackground()
  , 0 )
  
  _shiftBackground: Control.iterator( ->
    if @currentCell()? and @cellHeight()?
      y = ( @currentCell() * -@cellHeight() ) + "px"
      if Control.browser.mozilla
        
        # Firefox 3.5.x doesn't support background-position-y,
        # use background-position instead.
        backgroundPosition = @css( "background-position" ).split( " " )
        backgroundPosition[1] = y
        @css "background-position", backgroundPosition.join( " " )
      else
        
        # Not Firefox
        @css "background-position-y", y
  )


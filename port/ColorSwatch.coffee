###
Shows a block of a CSS color, either a color name or value. 
###

class window.ColorSwatch extends Control

  # The color to show. This will become the control's background color.
  color: (color) ->
    if color is undefined
      @css "background-color"
    else
      # Apply white first
      @css("background-color", "white").css "background-color", color # Apply new color
      
      # Validate the color value. 
      colorValid = undefined
      if color is "" or color is null
        colorValid = false
      else if color is "white" or color is "rgb(255, 255, 255)"
        
        # White color values are known to be good.
        colorValid = true
      else
        
        # See if the new value "stuck", or is still white.
        colorValue = @css("background-color")
        colorValid = not (colorValue is "white" or colorValue is "rgb(255, 255, 255)")
      @toggleClass "none", not colorValid


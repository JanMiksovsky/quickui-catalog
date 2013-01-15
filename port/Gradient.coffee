###
Gradient. Supports the different browser-specific syntax.
Alpha values are possible, but all colors must be specified as RGBA hex values.
###

class window.Gradient extends Control

  # The direction of the gradient: "horizontal" or "vertical" (the default).
  direction: Control.property(->
    @_redraw()
  , "vertical")

  # The ending value for the gradient.
  end: Control.property(->
    @_redraw()
  )
  initialize: ->
    @inDocument ->
      @_redraw()

  # The starting value for the gradient.
  start: Control.property(->
    @_redraw()
  )
  _redraw: ->
    return  unless @inDocument()
    direction = @direction()
    start = @start()
    end = @end()
    if direction and start and end
      horizontal = (direction is "horizontal")
      startColorString = @_hexColorToRgbString(start)
      endColorString = @_hexColorToRgbString(end)
      property = undefined
      value = undefined
      if Control.browser.mozilla
        property = "background-image"
        position = (if horizontal then "left" else "top")
        value = "-moz-linear-gradient(" + position + ", " + startColorString + ", " + endColorString + ")"
      else if Control.browser.webkit
        property = "background-image"
        position2 = (if horizontal then "right top" else "left bottom")
        value = "-webkit-gradient(linear, left top, " + position2 + ", from(" + startColorString + "), to(" + endColorString + "))"
      else if Control.browser.msie
        property = "filter"
        gradientType = (if horizontal then 1 else 0)
        value = "progid:DXImageTransform.Microsoft.gradient(gradientType=" + gradientType + ", startColorStr=" + startColorString + ", endColorStr=" + endColorString + ")"
      @css property, value

  
  # Convert a hex color like #00ff00 to "rgb(0, 255, 0)" 
  _hexColorToRgbString: (hex) ->
    
    # Remove "#"
    hex = hex.substring(1)  if hex.substr(0, 1) is "#"
    hasAlpha = (hex.length is 8)
    color = parseInt(hex, 16)
    a = undefined
    rgbString = undefined
    if Control.browser.msie
      
      # Internet Explorer
      rgbString = hex
      if hasAlpha
        
        # Move alpha to front, from RGBA to ARGB.
        a = rgbString.slice(6)
        rgbString = a + rgbString.substr(0, 6)
      rgbString = "#" + rgbString
    else
      
      # WebKit, Mozilla
      colorStringType = (if hasAlpha then "rgba" else "rgb")
      alphaString = ""
      if hasAlpha
        
        # Convert alpha from hex to decimal.
        a = (color & 0xFF) / 255
        alphaString = "," + a
        color = color >> 8
      r = (color >> 16) & 0xFF
      g = (color >> 8) & 0xFF
      b = color & 0xFF
      rgbString = colorStringType + "(" + r + "," + g + "," + b + alphaString + ")"
    rgbString


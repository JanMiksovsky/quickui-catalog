###
Fades its content to the background color on the right/bottom edge if the
content is too long. Must set explicitly set the control's background-color
if the color is not white. 
###

class window.Fader extends Control

  inherited:
    class: "horizontal"
    content: [
      html: "<div />"
      ref: "Fader_content"
    ,
      control: "Gradient"
      ref: "gradient"
      direction: "horizontal"
    ]

  content: Control.chain( "$Fader_content", "content" )

  # The direction in which the content should fade. If "horizontal" (the
  # default), the content will fade to the right. If "vertical", the content
  # will fade to the bottom.
  direction: Control.property( ( direction ) ->
    vertical = ( direction isnt "horizontal" )
    @toggleClass( "horizontal", not vertical ).toggleClass "vertical", vertical
    @_redraw()  if @inDocument()
    @$gradient().direction direction
  )
  initialize: ->
    @inDocument ->
      @_redraw()

  
  # Expand a color like #abc into #aabbcc.
  _expandShortHexValue: ( s ) ->
    shortHex = s.slice( 1 ) # Remove "#"
    longHex = ""
    i = 0

    while i < shortHex.length
      c = shortHex[i]
      longHex += c + c
      i++
    "#" + longHex

  _hexByte: ( n ) ->
    s = ( new Number( n & 0xFF ) ).toString( 16 )
    s = "0" + s  if s.length is 1
    s

  _redraw: Control.iterator( ->
    backgroundColor = @css( "background-color" )
    backgroundHex = ( if ( backgroundColor.length is 4 ) then @_expandShortHexValue( backgroundColor ) else ( if ( backgroundColor.substr( 0, 3 ).toLowerCase() is "rgb" ) then @_rgbStringToHexColor( backgroundColor ) else backgroundColor ) )
    @$gradient().start( backgroundHex + "00" ).end backgroundHex
  )
  _rgbStringToHexColor: ( rgbString ) ->
    rgb = rgbString.match( /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/ )
    "#" + @_hexByte( rgb[1] ) + @_hexByte( rgb[2] ) + @_hexByte( rgb[3] )

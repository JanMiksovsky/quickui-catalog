###
A text box that shows a color swatch of the currently-entered color.
###

class window.ColorSwatchTextBox extends Control

  inherited:
    content: [
      control: "ColorSwatch"
      ref: "swatch"
    ,
      html: "<input type=\"text\" />"
      ref: "ColorSwatchTextBox_content"
    ]

  # The text box's content. Setting this to a color name or RGB value
  # will show a color swatch of the color with that name.
  content: Control.chain( "$ColorSwatchTextBox_content", "content", ( content ) ->
    @_refresh()
  )
  initialize: ->
    @keyup => @_refresh()

  _refresh: ->
    @$swatch().color @content()


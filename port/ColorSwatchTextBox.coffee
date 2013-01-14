ColorSwatchTextBox = Control.sub(
  className: "ColorSwatchTextBox"
  inherited:
    content: [" ",
      control: "ColorSwatch"
      ref: "swatch"
    ,
      html: "<input type=\"text\" />"
      ref: "ColorSwatchTextBox_content"
    , " "]
)
ColorSwatchTextBox::extend
  
  #
  #     * The text box's content. Setting this to a color name or RGB value
  #     * will show a color swatch of the color with that name.
  #     
  content: Control.chain("$ColorSwatchTextBox_content", "content", (content) ->
    @_refresh()
  )
  initialize: ->
    self = this
    @keyup ->
      self._refresh()


  _refresh: ->
    @$swatch().color @content()


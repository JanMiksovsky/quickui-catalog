LabeledColorSwatch = Control.sub(
  className: "LabeledColorSwatch"
  inherited:
    content: [" ",
      control: "ColorSwatch"
      ref: "swatch"
    ,
      html: "<div />"
      ref: "ColorSwatchButton_content"
    , " "]
)
LabeledColorSwatch::extend
  
  #
  #     * The color to show.
  #     
  color: Control.chain("$swatch", "color")
  
  #
  #     * The swatch's label. Setting this implicitly sets the color to show
  #     * the color with the indicated name.
  #     
  content: Control.chain("$ColorSwatchButton_content", "content", (content) ->
    @$swatch().color content
  )


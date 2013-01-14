ColorSwatchComboBox = ListComboBox.sub(
  className: "ColorSwatchComboBox"
  inherited:
    textBoxClass: "ColorSwatchTextBox"
    itemClass: "LabeledColorSwatch"
)
ColorSwatchComboBox::extend initialize: ->
  @items ["Black", "Blue", "Gray", "Green", "Red", "Orange", "Pink", "Purple", "Yellow"]  if not @items()? or @items().length is 0


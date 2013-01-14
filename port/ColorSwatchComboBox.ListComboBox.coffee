###
A combo box optimized for selecting colors.
###

class window.ColorSwatchComboBox extends ListComboBox

  inherited:
    textBoxClass: "ColorSwatchTextBox"
    itemClass: "LabeledColorSwatch"

 initialize: ->
  @items ["Black", "Blue", "Gray", "Green", "Red", "Orange", "Pink", "Purple", "Yellow"]  if not @items()? or @items().length is 0


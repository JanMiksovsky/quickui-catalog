###
A combo box optimized for selecting colors.
###

class window.ColorSwatchComboBox extends ListComboBox

  inherited:
    itemClass: "LabeledColorSwatch"
    textBoxClass: "ColorSwatchTextBox"

  initialize: ->
    if not @items()?.length > 0
      @items [
        "Black"
        "Blue"
        "Gray"
        "Green"
        "Red"
        "Orange"
        "Pink"
        "Purple"
        "Yellow"
      ]

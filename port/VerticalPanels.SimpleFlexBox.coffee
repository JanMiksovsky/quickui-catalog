###
Position a top and/or bottom panel above or below a main content panel. 
###

class window.VerticalPanels extends SimpleFlexBox

  inherited:
    orient: "vertical"

  # The content of the bottom panel.
  bottom: Control.chain "_panel2"

  # The content of the top panel.
  top: Control.chain "_panel1"


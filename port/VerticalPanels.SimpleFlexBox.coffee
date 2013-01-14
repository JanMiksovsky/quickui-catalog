###
Position a top and/or bottom panel above or below a main content panel. 
###

window.VerticalPanels = SimpleFlexBox.sub(
  className: "VerticalPanels"
  inherited:
    orient: "vertical"
)
VerticalPanels::extend

  # The content of the bottom panel.
  bottom: Control.chain("_panel2")

  # The content of the top panel.
  top: Control.chain("_panel1")


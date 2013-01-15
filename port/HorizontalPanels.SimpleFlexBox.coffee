###
Position a left and/or right panel on the sides of a main content panel. 
###

class window.HorizontalPanels extends SimpleFlexBox

  inherited:
    orient: "horizontal"

  # The content of the left panel.
  left: Control.chain "_panel1"
  leftClass: Control.property.class( ( leftClass ) ->
    $new = @$SimpleFlexBox_panel1().transmute( leftClass, true )
    $new.addClass "panel"
    @referencedElement "SimpleFlexBox_panel1", $new
  )

  # The content of the right panel.
  right: Control.chain "_panel2"
  rightClass: Control.property.class( ( right ) ->
    $new = @$SimpleFlexBox_panel2().transmute( right, true )
    $new.addClass "panel"
    @referencedElement "SimpleFlexBox_panel2", $new
  )


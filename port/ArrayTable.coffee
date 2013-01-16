###
Render a JavaScript array as a table. 
###

class window.ArrayTable extends Control

  # The array-of-arrays to show as the control's content.
  # 
  # A row will be created for each outer array item, and a cell for each item
  # in the inner arrays.     
  content: Control.property ( array ) ->
    rows = ( for innerArray in array
      cells = ( for item in innerArray
        Control( "<div/>" ).content item
      )
      Control( "<div/>" ).content cells
    )
    Control( this ).content rows

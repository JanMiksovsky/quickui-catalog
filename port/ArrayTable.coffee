###
Render a JavaScript array as a table. 
###

class window.ArrayTable extends Control

  # The array-of-arrays to show as the control's content.
  # 
  # A row will be created for each outer array item, and a cell for each item
  # in the inner arrays.     
  content: Control.property( ( outerArray ) ->
    rows = $.map( outerArray, ( innerArray, index ) ->
      cells = $.map( innerArray, ( item, index ) ->
        Control( "<div/>" ).content item
      )
      row = $( "<div/>" )
      row.append.apply row, cells
      row
    )
    Control( this ).content rows
  )

###
Renders a JavaScript dictionary as a table. 
###

class window.DictionaryTable extends ArrayTable

  # A standard JavaScript { key: value } dictionary to render as a table.
  # Each item will be a row with two columns for its key and value.
  content: Control.property ( dictionary ) ->
    array = ( [  key, value  ] for key, value of dictionary )
    ArrayTable( this ).content array

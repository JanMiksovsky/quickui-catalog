# Renders a JavaScript dictionary as a table. 
window.DictionaryTable = ArrayTable.sub(
  className: "DictionaryTable"
  inherited: {}
)

#
#     * A standard JavaScript { key: value } dictionary to render as a table.
#     * Each item will be a row with two columns for its key and value.
#     
DictionaryTable::extend content: Control.property((dictionary) ->
  array = $.map(dictionary, (value, key) ->
    [[key, value]]
  )
  ArrayTable(this).content array
)

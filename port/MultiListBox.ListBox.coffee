###
A ListBox capable of multiple selection.
###

class window.MultiListBox extends ListBox

  # The controls in the list which are currently selected.
  selectedControls: Control.iterator ( selectedControls ) ->
    if selectedControls is undefined
      @controls().filter ".selected"
    else
      @controls().eachControl ( index, control ) =>
        filter = selectedControls.filter control
        select = ( filter and filter.length > 0 )
        @selectControl control, select
      @trigger "selectionChanged"

  # The indices of the currently-selected controls.
  selectedIndices: Control.iterator ( selectedIndices ) ->
    controls = @controls()
    if selectedIndices is undefined
      indices = []
      i = 0

      while i < controls.length
        indices.push i  if controls.eq( i ).hasClass "selected" 
        i++
      indices
    else
      selectedControls = []
      if selectedIndices
        i = 0

        while i < selectedIndices.length
          index = selectedIndices[i]
          selectedControls.push controls[index]
          i++
      @selectedControls selectedControls

  # The items represented by the currently-selected controls.
  selectedItems: Control.iterator ( selectedItems ) ->
    if selectedItems is undefined
      indices = @selectedIndices()
      items = @items()
      selectedItems = []
      i = 0

      while i < indices.length
        index = indices[i]
        selectedItems.push items[i]
        i++
      selectedItems
    else
      selectedControls = []
      if selectedItems
        controls = @controls()
        items = @items()
        i = 0

        while i < selectedItems.length
          item = selectedItems[i]
          index = $.inArray item, items
          selectedControls.push controls[index]  if index >= 0
          i++
      @selectedControls selectedControls

  # Toggle the selected state of the given control (if toggle is undefined),
  # or set the selected state to the indicated toggle value.
  toggleControl: ( control, toggle ) ->
    toggle = toggle or not control.hasClass "selected"
    @selectControl control, toggle
    @trigger "selectionChanged"
    this

  _controlClick: ( control ) ->
    @toggleControl control


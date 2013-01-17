###
A ListBox capable of multiple selection.
###

class window.MultiListBox extends ListBox

  # The controls in the list which are currently selected.
  selectedControls: Control.iterator ( selectedControls ) ->
    if selectedControls is undefined
      @controls().filter ".selected"
    else
      $selectedControls = $ selectedControls
      for control in @controls().segments()
        filter = $selectedControls.filter control
        select = ( filter and filter.length > 0 )
        @selectControl control, select
      @trigger "selectionChanged"

  # The indices of the currently-selected controls.
  selectedIndices: Control.iterator ( selectedIndices ) ->
    controls = @controls()
    if selectedIndices is undefined
      ( i for i in [ 0 .. controls.length - 1 ] when controls.eq( i ).hasClass "selected" )
    else
      selectedControls = ( controls[ index ] for index in selectedIndices ? [] )
      @selectedControls selectedControls

  # The items represented by the currently-selected controls.
  selectedItems: Control.iterator ( selectedItems ) ->
    items = @items()
    if selectedItems is undefined
      ( items[ index ] for index in @selectedIndices() )
    else
      controls = @controls()
      selectedIndices = ( $.inArray( item, items ) for item in selectedItems ? [] )
      selectedControls = ( controls[ index ] for index in selectedIndices when index >= 0 )
      @selectedControls selectedControls

  # Toggle the selected state of the given control (if toggle is undefined),
  # or set the selected state to the indicated toggle value.
  toggleControl: ( control, toggle ) ->
    toggle = toggle ? not control.hasClass "selected"
    @selectControl control, toggle
    @trigger "selectionChanged"
    @

  _controlClick: ( control ) ->
    @toggleControl control

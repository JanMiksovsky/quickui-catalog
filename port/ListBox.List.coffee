###
A list box that allows single selection.
The user can select an item with the mouse or keyboard.
###

class window.ListBox extends List

  inherited:
    generic: "true"

  # True if clicking on the list background (if there aren't enough
  # items to fill the list's available space) will deselect the
  # currently-selected item. Default is true.
  deselectOnBackgroundClick: Control.property.bool( null, true )

  # True if the operating system-dependent "highlight" CSS classes should
  # be applied to a generic selected item. Default is true.
  highlightSelection: Control.property.bool ( highlightSelection ) ->
    @toggleClass "highlightSelection", highlightSelection

  initialize: ->

    # Try to convince the browser that the list is focusable, but without
    # forcing it into the tab order (as a positive tabindex would do).
    # Firefox, Chrome, and IE seem to handle this as desired if tabindex
    # is set to a negative number.
    @attr "tabindex", "-1"
    @on
      click: ( event ) =>
        if event.target is @[0]
          # User clicked the list box's background. 
          @selectedControl null  if @deselectOnBackgroundClick()
        else
          control = @_getControlContainingElement event.target
          @_controlClick control  if control
      keydown: ( event ) => @_keydown event
    
    # By default, highlight the selection.
    @highlightSelection true  if @highlightSelection() is undefined

  # The array of items shown in the list box.
  items: ( value ) ->
    # Preserve selection index when items change 
    previousIndex = @selectedIndex()
    result = super value
    if value isnt undefined and value.length > 0
      # Restore previous selection.
      index = if previousIndex >= 0 and previousIndex < value.length
        previousIndex
      else
        -1 # Nothing will be selected.
      @selectedIndex index
    result

  # Toggles the selected state of a control in the list.
  # 
  # If the select parameter is true, this applies the "selected" class to the
  # control, which the list uses to track which control is selected. If the
  # control supports a selected() function, that will be invoked as well.
  # Subclasses can perform additional manipulations here.
  selectControl: ( control, select ) ->
    control.toggleClass "selected", select
    if $.isFunction control.selected
      control.selected select

  # The control in the list which is currently selected.
  selectedControl: Control.iterator ( selectedControl ) ->
    if selectedControl is undefined
      control = @controls().filter( ".selected" ).eq 0
      if control.length > 0
        control
      else
        null
    else
      previousControl = @selectedControl()
      selectedElement = if selectedControl then selectedControl[0] else null
      for control in @controls().segments()
        @selectControl control, control[0] is selectedElement
      @_scrollToControl selectedControl  if selectedControl
      @trigger "selectionChanged"  if selectedControl isnt previousControl

  # The index of the currently-selected control.
  selectedIndex: Control.iterator ( selectedIndex ) ->
    controls = @controls()
    if selectedIndex is undefined
      control = @selectedControl()
      if control
        controls.index control
      else
        -1
    else
      index = parseInt selectedIndex
      control = if ( index >= 0 and index < controls.length ) then controls.eq( index ) else null
      @selectedControl control

  # The item represented by the currently-selected control.
  selectedItem: Control.iterator ( selectedItem ) ->
    if selectedItem is undefined
      index = @selectedIndex()
      if index >= 0
        @items()[index]
      else
        null
    else
      index = $.inArray selectedItem, @items()
      @selectedIndex index

  _controlClick: ( control ) ->
    @selectedControl control

  _getControlContainingElement: ( element ) ->
    $( element ).closest( @controls() ).control()

  # Return the control that spans the given y position, or -1 if not found.
  # If downward is true, move down the list of controls to find the
  # first control found at the given y position; if downward is false,
  # move up the list of controls to find the last control at that position. 
  _getControlAtY: ( y, downward ) ->
    controls = @controls()
    start = if downward then 0 else controls.length - 1
    end = if downward then controls.length else 0
    step = if downward then 1 else -1
    i = start

    while i isnt end
      $control = controls.eq i
      controlTop = Math.round $control.offset().top
      controlBottom = controlTop + $control.outerHeight()
      return i  if controlTop <= y and controlBottom >= y
      i += step
    -1

  # Handle a keydown event.
  _keydown: ( event ) ->
    handled = undefined
    switch event.which
      when 33 # Page Up
        handled = @_pageUp()
      when 34 # Page Down
        handled = @_pageDown()
      when 35 # End
        handled = @_selectLastControl()
      when 36 # Home
        handled = @_selectFirstControl()
      when 37 # Left
        handled = @_selectPreviousControl()  if @_selectedControlIsInline()
      when 38 # Up
        handled = if event.altKey then @_selectFirstControl() else @_selectPreviousControl()
      when 39 # Right
        handled = @_selectNextControl()  if @_selectedControlIsInline()
      when 40 # Down
        handled = if event.altKey then @_selectLastControl() else @_selectNextControl()
      else
        handled = false
    if handled
      event.stopPropagation()
      event.preventDefault()

  _pageDown: ->
    @_scrollOnePage true

  _pageUp: ->
    @_scrollOnePage false

  # Move by one page downward ( if downward is true ), or upward (if false).
  _scrollOnePage: ( downward ) ->
    selectedIndex = @selectedIndex()
    
    # Find the control at the bottom/top edge of the viewport.
    viewPortDimensions = @_viewPortDimensions()
    edge = if downward then viewPortDimensions.bottom else viewPortDimensions.top
    index = @_getControlAtY edge, downward
    if index >= 0 and selectedIndex is index
      
      # The control at that edge is already selected.
      # Move one page further down/up.
      delta = if downward then viewPortDimensions.height else -viewPortDimensions.height
      index = @_getControlAtY edge + delta, downward
    
    # Would have scrolled too far in that direction.
    # Just select the last/first control.
    index = ( if downward then @controls().length - 1 else 0 )  if index < 0
    if index isnt @selectedIndex()
      @selectedIndex index
      return true
    false

  # Scroll the given control into view.
  _scrollToControl: ( $control ) ->
    controlTop = $control.offset().top
    controlBottom = controlTop + $control.outerHeight()
    viewPortDimensions = @_viewPortDimensions()
    scrollTop = @scrollTop()
    if controlBottom > viewPortDimensions.bottom
      
      # Scroll up until control is entirely visible.
      @scrollTop scrollTop + controlBottom - viewPortDimensions.bottom
    
    # Scroll down until control is entirely visible.
    else @scrollTop scrollTop - ( viewPortDimensions.top - controlTop )  if controlTop < viewPortDimensions.top

  # Return true if the selected control is displayed inline.
  _selectedControlIsInline: ->
    selectedControl = @selectedControl()
    inline = false
    if selectedControl
      display = selectedControl.css "display"
      inline = $.inArray( display, ["inline", "inline-block", "inline-table"] ) >= 0
    inline

  _selectFirstControl: ->
    if @controls().length > 0
      @selectedIndex 0

      # The list will have already scrolled the first control into view,
      # but if the list has top padding, the scroll won't be all the way
      # at the top. So, as a special case, force it to the top.
      @scrollTop 0
      return true
    false

  _selectLastControl: ->
    if @controls().length > 0
      @selectedIndex @controls().length - 1
      return true
    false

  _selectNextControl: ->
    index = @selectedIndex() + 1
    if index < @controls().length
      @selectedIndex index
      return true
    false

  _selectPreviousControl: ->
    index = @selectedIndex() - 1
    if index >= 0 and @controls().length > 0
      @selectedIndex index
      return true
    false

  _viewPortDimensions: ->
    viewPortTop = @offset().top
    viewPortHeight = @height()
    top: viewPortTop
    height: viewPortHeight
    bottom: viewPortTop + viewPortHeight


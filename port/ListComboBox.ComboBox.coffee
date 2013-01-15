###
Renders a list of items in a combo box.

The user can type arbitrary text; if they type the beginning of a list item's
content, the remainder of the item's content is AutoCompleted. For this to
work, both the control's content and the content of the list items should
be strings.
###

class window.ListComboBox extends ComboBox

  inherited:
    popup: [
      control: "ListBox"
      ref: "list"
    ]

  # The array of items in the dropdown list. See List for details.
  items: Control.chain( "$list", "items", ->
    @_updateItemContents()
  )

  # A mapping of items to controls and back. See List for details.
  mapFunction: Control.chain "$list", "mapFunction"
  initialize: ->
    @$list().on

      click: ( event ) =>
        # Clicking a list item puts its content into the text box portion.
        $closestItem = $( event.target ).closest( @$list().children() )
        if $closestItem
          itemContent = $closestItem.control().content()
          @content( itemContent ).close()

      keydown: ( event ) =>
        if event.which is 13 # Enter
          if @opened()
            @close()
            event.stopPropagation()
            event.preventDefault()

      selectionChanged: =>
        selectedControl = @$list().selectedControl()
        if selectedControl
          content = selectedControl.content()
          if content isnt @content()
            @content content
            @_selectText 0, content.length

  # The class which should be used to render the list items as controls.
  itemClass: Control.property.class( ( itemClass ) ->
    @$list().itemClass itemClass
  )
  open: ->
    
    # See if current text is in the list and, if so, select it.
    content = @content()
    index = $.inArray( content, @_itemContents() )
    @$list().selectedIndex index  if index >= 0
    result = super()
    
    # Give the input control focus if it doesn't already have it.
    inputElement = @inputElement()
    @inputElement().focus()  if document.activeElement isnt inputElement[0]
    result

  
  # Try to auto-complete the current text against the item contents.
  _autoComplete: ->
    content = @content()
    match = @_matchingItem( content )
    unless match
      @$list().selectedControl null
      return
    @content match
    
    # Select the auto-completed text.
    @_selectText content.length, match.length
    @_selectTextInList()

  _bindContentEvents: ->
    super()
    
    # See notes at _contentKeydown.
    @inputElement().keydown ( event ) => @_contentKeydown event

  # Handle a keydown event. Keydown gives the best AutoComplete performance
  # and behavior: among other things, the AutoComplete happens as soon as
  # the user begins typing. However, using keydown creates a problem that
  # the input control's content won't actually reflect the effects key the
  # user just pressed down. So we set a timeout to give the keydown event a
  # chance to bubble up and do its work, then do our AutoComplete work
  # against the resulting text.
  _contentKeydown: ( event ) ->
    handled = false
    # Page Up
    # Page Down
    # Up
    navigationKeys = [33, 34, 38, 40] # Down
    
    # Do AutoComplete on Space, or characters from zero (0) and up,
    # ignoring any combinations that involve Alt or Ctrl.
    if ( event.which is 32 or event.which >= 48 ) and not ( event.altKey or event.ctrlKey or event.metaKey )
      @_setTimeout => @_autoComplete()

    else if @opened() and $.inArray( event.which, navigationKeys ) >= 0
      
      # Forward navigation keys to opened list.
      @$list().trigger event
      handled = true
    else if event.which is 8 or event.which is 46
      
      # On Backspace or Delete, clear list select if text is empty.
      @_setTimeout => @_selectTextInList()

    else if event.which is 40
      
      # Pressing Down when list is closed will open list.
      @open()
      
      # If the input text is empty, select the first list item.
      content = @content()
      @$list().selectedIndex 0  if not content? or content.length is 0
      handled = true
    if handled
      event.stopPropagation()
      event.preventDefault()

  _itemContents: Control.property()
  
  # Return the item whose prefix matches the given string, ignoring case.
  # Return null if not found.
  _matchingItem: ( s ) ->
    length = s.length
    if length > 0
      lower = s.toLowerCase()
      itemContents = @_itemContents()
      i = 0
      itemCount = itemContents.length

      while i < itemCount
        itemContent = itemContents[i]
        return itemContent  if length <= itemContent.length and itemContent.substr( 0, length ).toLowerCase() is lower
        i++
    null

  
  # Select the current input text in the list if it's there.
  # Clear the list selection if the text is not found.
  _selectTextInList: ->
    if @opened()
      content = @content()
      index = $.inArray( content, @_itemContents() )
      @$list().selectedIndex index

  
  # Arrange for a callback to be performed via a timeout.
  # See notes at _contentKeydown.
  _setTimeout: ( callback ) ->
    
    # Cancel any pending AutoComplete timeout.
    timeout = @_timeout()
    clearTimeout timeout  if timeout
    
    # Queue a new timeout.
    timeout = window.setTimeout( callback, 50 )
    @_timeout timeout

  _timeout: Control.property()

  # Extract a copy of all the items so we can match against them when
  # the user types. We get the contents from the list's controls, rather
  # than from the list's items() property, since the items could be
  # arbitrary JavaScript objects. Once the list's mapFunction has mapped
  # those objects into the controls, the controls' content should best
  # reflect the text to map against. 
  _updateItemContents: ->
    itemContents = []
    @$list().controls().eachControl ( index, $control ) ->
      itemContents.push $control.content()

    @_itemContents itemContents


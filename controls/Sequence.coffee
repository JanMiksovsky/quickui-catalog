###
An ordered sequence of elements which can be navigated through one at a time.
###

class window.Sequence extends Control

  inherited:
    generic: "true"

  # The currently visible element. The getter returns the element as an instance
  # of the appropriate control class.
  activeElement: Control.iterator ( activeElement ) ->
    if activeElement is undefined
      @elements().filter( ".active" ).eq( 0 ).cast jQuery
    else
      # Apply a "inactive" style instead of just forcing display to none. If we
      # did that, we would have no good way to undo the hiding. A simple
      # .toggle(true) would set display: block, which wouldn't be what we'd want
      # for inline elements.
      @elements().not( activeElement )
        .addClass( "inactive" )
        .removeClass "active"
      index = @elements().index( activeElement )
      
      # Tell the child it's now active, and show it.
      $( activeElement )
        .trigger( "active" )
        .removeClass( "inactive" )
        .addClass "active"
      
      # Trigger our own activeElementChanged event.
      @trigger "activeElementChanged", [ index, activeElement ]

      @checkForSizeChange() # In case the new child changed our size.
      @

  # The index of the currently visible element.
  activeIndex: ( index ) ->
    if index is undefined
      @elements().index @activeElement()
    else
      @activeElement @elements().eq index

  # The array of elements in the sequence; only one will be shown at a time.
  # 
  # If the set changes, this will attempt to preserve the one that was
  # previously active. Otherwise, the first element is made active.
  content: ( content ) ->
    container = @_container()
    if content is undefined
      if this[0] is container[0]
        super content
      else
        container.content content
    else
      # Save active element before setting content.
      previousControl = @activeElement()
      result = if this[0] is container[0]
        super content
      else
        container.content content
      if previousControl?.parent()[0] is this[0]
        # Still have previously active child; hide other elements.
        @activeElement previousControl
      else
        @activeIndex 0
      result

  # The set of elements in the sequence.
  elements: Control.chain "_container", "children", "cast"
  
  initialize: ->
    if @elements().length > 0 and @activeIndex() < 0
      # Show first child by default. 
      @activeIndex 0

  # Show the next child. If the last child is currently shown, this has no
  # effect.
  next: Control.iterator ->
    index = @activeIndex()
    if index < @elements().length - 1
      @activeIndex index + 1

  # Show the previous child. If the first child is currently shown, this has
  # no effect.
  previous: Control.iterator ->
    index = @activeIndex()
    if index > 0
      @activeIndex index - 1
  
  _container: ->
    this

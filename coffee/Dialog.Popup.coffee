###
Base class for modal dialogs.
###

class window.Dialog extends Popup

  inherited:
    cancelOnOutsideClick: "false"
    cancelOnWindowBlur: "false"
    cancelOnWindowResize: "false"
    cancelOnWindowScroll: "false"
    closeOnInsideClick: "false"
    overlayClass: ModalOverlay
  
  # Cancel the dialog. This implicitly closes the dialog.
  cancel: ->
    super.remove()

  # Close the dialog normally.
  close: ->
    super.remove()

  initialize: ->
    @on "layout sizeChanged", => @positionPopup()
  
  # Position the dialog.
  # By default, center dialog horizontally and vertically. 
  positionPopup: ->
    $window = $ window
    @css
      left: ( $window.width() - @outerWidth() ) / 2
      top: ( $window.height() - @outerHeight() ) / 2
  
  # Create and show an instance of a given dialog class.
  @showDialog: (dialogClass, properties, callbackOk, callbackCancel) ->
    dialog = dialogClass.create properties
    dialog.on
      closed: =>
        if callbackOk?
          callbackOk.call $(this).control()
      canceled: =>
        if callbackCancel?
          callbackCancel.call $(this).control()
    
    # Use a z-index one higher than the highest one in use on the page.
    # Technically speaking, we might be able to get away with using a
    # lower z-index if we very carefully looked at the actual stacking
    # contexts, but that would be a bunch more work, and all we care
    # about here is making sure a transient element ends up above
    # everything else.
    maximumZIndex = Dialog._maximumZIndex()
    if maximumZIndex
      dialog.css "z-index", maximumZIndex + 1
    
    # Add the dialog to the end of the body so that it will paint over
    # other controls in the same stacking context.
    $( document.body ).append dialog
    dialog.open()
    dialog
  
  # Return the maximum Z-index in use on the page, or null if none is set.
  @_maximumZIndex: ->
    # z-index only applies if position is also set.
    zIndices = $( "*" ).map ( index, element ) ->
      $element = $ element
      if $element.css("position") isnt "static"
        zIndex = parseInt $element.css "z-index"
        zIndex if zIndex
    zIndices = zIndices.get()
    if zIndices.length > 0
      Math.max zIndices...
    else
      null

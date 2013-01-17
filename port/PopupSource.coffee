###
A control with a popup.
###

class window.PopupSource extends Control

  inherited:
    content: [
      html: "<div/>", ref: "PopupSource_content"
    ,
      control: "Popup", ref: "PopupSource_popup"
    ]

  # Cancels the popup.
  cancel: Control.chain "$PopupSource_popup", "cancel"

  # True if the user can cancel an open popup by pressing the Escape key.
  # Default is true.
  cancelOnEscapeKey: Control.chain "$PopupSource_popup", "cancelOnEscapeKey"

  # True if the popup should be canceled if the user clicks outside it.
  # Default is true.
  cancelOnOutsideClick: Control.chain "$PopupSource_popup", "cancelOnOutsideClick"

  # True if the popup should be canceled if the window loses focus.
  # Default is true.
  cancelOnWindowBlur: Control.chain "$PopupSource_popup", "cancelOnWindowBlur"

  # True if the popup should be canceled if the window changes size.
  # Default is true.
  cancelOnWindowResize: Control.chain "$PopupSource_popup", "cancelOnWindowResize"

  # True if the popup should be canceled if the window is scrolled.
  # Default is true.
  cancelOnWindowScroll: Control.chain "$PopupSource_popup", "cancelOnWindowScroll"

  # Close the popup normally.
  close: Control.chain "$PopupSource_popup", "close"

  # True if the popup should be closed normally if the user clicks inside
  # it. Default is true.
  closeOnInsideClick: Control.chain "$PopupSource_popup", "closeOnInsideClick"

  # The element(s) with which the popup will be associated. By default,
  # clicking in the content will open the popup, and the popup will be
  # positioned with respect to this content.
  content: Control.chain "$PopupSource_content", "content"

  # The class of the content portion.
  contentClass: Control.property.class ( contentClass ) ->
    # If the content element changes (e.g., from a div to a button), we must
    # update our element reference to point to the new element.
    # 
    # TODO: This facility is needed anywhere a control lets the host transmute
    # one of the control's elements, and so should be generalized and moved into
    # the QuickUI runtime.
    $newContent = @$PopupSource_content().transmute contentClass, true, true, true
    @referencedElement "PopupSource_content", $newContent
  
  initialize: ->
    @$PopupSource_content().click ( event ) =>
      if @openOnClick()
        @open()
    @$PopupSource_popup().on
      "closed canceled": =>
        @$PopupSource_popup().removeClass "popupAppearsAbove popupAppearsBelow popupAlignLeft popupAlignRight"
        @opened false
      opened: => @positionPopup().opened true

  # True if the popup should open when the user clicks in the control's
  # content. Default is true. 
  openOnClick: Control.property.bool( null, true )

  # Open the popup.
  open: Control.chain "$PopupSource_popup", "open"

  # Returns true if the popup is currently opened.
  opened: ( opened ) ->
    if opened is undefined
      # We mirror the popup's own open state.
      @$PopupSource_popup().opened()
    else
      # If we're setting this, only set our own state.
      # The popup will have taken care of itself.
      @applyClass "opened", opened

  # The class used to render the overlay behind the popup.
  overlayClass: Control.chain "$PopupSource_popup", "overlayClass"

  # The content of the popup associated with the control.
  popup: Control.chain "$PopupSource_popup", "content"

  # Position the popup with respect to the content. By default, this will
  # position the popup below the content if the popup will fit on the page,
  # otherwise show the popup above the content. Similarly, align the popup with
  # the content's left edge if the popup will fit on the page, otherwise right-
  # align it.
  # 
  # Subclasses can override this for custom positioning.
  positionPopup: ->
    offset = @offset()
    position = @position()
    top = Math.round offset.top
    left = Math.round offset.left
    height = @outerHeight()
    width = @outerWidth()
    bottom = top + height
    right = left + width
    $popup = @$PopupSource_popup()
    popupHeight = $popup.outerHeight true
    popupWidth = $popup.outerWidth true
    scrollTop = $( document ).scrollTop()
    scrollLeft = $( document ).scrollLeft()
    windowHeight = $( window ).height()
    windowWidth = $( window ).width()
    popupCss = {}
    
    # Vertically position below (preferred) or above the content.
    popupFitsBelow = ( bottom + popupHeight <= windowHeight + scrollTop )
    popupFitsAbove = ( top - popupHeight >= scrollTop )
    popupAppearsBelow = ( popupFitsBelow or not popupFitsAbove )

    popupCss.top = if popupAppearsBelow
      "" # Use default top
    else
      position.top - popupHeight # Show above content
    
    # Horizontally left (preferred) or right align w.r.t. content.
    popupFitsLeftAligned = ( left + popupWidth <= windowWidth + scrollLeft )
    popupFitsRightAligned = ( right - popupWidth >= scrollLeft )
    popupAlignLeft = ( popupFitsLeftAligned or not popupFitsRightAligned )

    popupCss.left = if popupAlignLeft
      "" # Use default left
    else
      position.left + width - popupWidth # Right align

    $popup
      .toggleClass( "popupAppearsAbove", not popupAppearsBelow )
      .toggleClass( "popupAppearsBelow", popupAppearsBelow )
      .toggleClass( "popupAlignLeft", popupAlignLeft )
      .toggleClass( "popupAlignRight", not popupAlignLeft )
      .css popupCss
    @

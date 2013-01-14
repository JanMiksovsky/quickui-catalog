###
An input area with a dropdown arrow, which invokes a popup.
###

class window.ComboBox extends PopupSource
  className: "ComboBox"
  inherited:
    closeOnInsideClick: "false"
    openOnClick: "false"
    content: [" ",
      html: "<div />"
      ref: "ComboBox_content"

    , " ", " ",
      # Negative tabindex prevents tabstop, which isn't necessary here
      # as the text box portion will get the focus, and the user can
      # invoke the popup from there. E.g., ListComboBox opens the popup
      # when the Down key is pressed.
      # TODO: Promote Down key behavior from ListComboBox to this class.
      control: "ToggleButton"
      ref: "dropdownButton"
      class: "quiet"
      tabindex: "-1"
      content: "▼"
    , " "]
    generic: "true"



  # True if the dropdown portion should automatically close if the user
  # presses Enter. Default is true.
  closeOnEnter: Control.property.bool(null, true)

  # The content of the combo box's input portion.
  content: Control.chain("$ComboBox_content", "content")

  # The content of the dropdown button. By default, this shows a
  # downward-pointing arrow.
  dropdownButtonContent: Control.chain("$dropdownButton", "content")
  initialize: ->
    self = this
    @$PopupSource_popup().on
      canceled: ->
        self.$dropdownButton().selected false

      closed: ->
        
        # Closing the popup leaves the text selected.
        # HACK for IE: If we set focus to the input while the popup is
        # being closed, IE won't hide the popup. It seems quite hard
        # to prevent this behavior, so we simply disable the selection
        # behavior in IE.
        unless Control.browser.msie
          content = self.content()
          self.inputElement().focus()
          self._selectText 0, content.length
        self.$dropdownButton().selected false

    
    # Close the popup when the control loses focus.
    @on focusout: (event) ->

      # We want to close the popup if the focus moves completely
      # outside the combo box; i.e., is not within the input box or
      # the popup. Unfortunately, if the user clicks in the popup,
      # the input will blur before we've had a chance to even
      # register the click. And at the point the blur handler here
      # is invoked, the new activeElement is not yet known, so we
      # can't test that.  
      # 
      # Our solution is to set a timeout which will defer testing
      # of activeElement until after the normal focusout sequence
      # has completed and focus has been placed in the new control.
      if self.opened()
        setTimeout (->
          focusInControl = $.contains(self[0], document.activeElement)
          # Still open?
          self.cancel()  if not focusInControl and self.opened()
        ), 1

    @$dropdownButton().click (event) ->
      self.open()

    
    # Allow the popup container itself to receive the focus.
    # This allows clicks on the popup to still keep focus within the
    # overall ComboBox controls.
    @$PopupSource_popup().prop "tabindex", -1
    
    # Set a default text box class
    @textBoxClass TextBox  unless @textBoxClass()

  # Returns the combo box's input element. By default this is the content
  # element itself (if it's a text box) or else the first text input element
  # in the content. Subclasses can override this to indicate that a different
  # element should be used for input.
  inputElement: ->
    $content = @$ComboBox_content()
    
    # Content itself is a text input element.
    return $content  if $content[0].nodeName.toLowerCase() is "input" and $content.prop("type") is "text"
    
    # Return the first text input element.
    @$ComboBox_content().find("input[type='text']").eq 0

  # Open the combo box.
  open: ->
    unless @opened()
      if @hasClass("generic")
        
        # Make popup at least as wide as content.
        @eachControl (index, $control) ->
          width = $control.outerWidth()
          @$PopupSource_popup().css "min-width", width + "px"

      
      # User may have invoked popup by clicking in text box with
      # openOnFocus true, in which case we should ensure button looks
      # pressed while popup is open.
      @$dropdownButton().selected true
    @_super()

  # True if the control should automatically open when it receives the
  # keyboard focus. Default is true.
  openOnFocus: Control.property.bool(null, true)

  # The control serving as the text box portion of the combo box.
  textBox: Control.chain("$ComboBox_content", "control")

  # The class of the text box portion of the combo box.
  textBoxClass: Control.property["class"]((textBoxClass) ->
    $textBox = @$ComboBox_content().transmute(textBoxClass, true)
    @referencedElement "ComboBox_content", $textBox
    
    # Rebind any content events we want to track.
    @_bindContentEvents()
  )
  _bindContentEvents: ->
    self = this
    @$ComboBox_content().on
      "click focusin": (event) ->
        self.open()  if self.openOnFocus() and not self.opened()

      keydown: (event) ->
        opened = self.opened()
        if event.which is 13 and opened and self.closeOnEnter()
          
          # Enter key closes popup. 
          self.close()
        
        # Tabbing out of text box portion closes popup. 
        else self.close()  if event.which is 9 and opened

  
  # Hint for documentation tools.
  _requiredClasses: ["TextBox"]

  # Select the text at the indicated positions in the input control.
  _selectText: (start, end) ->
    inputElement = @inputElement()[0]
    return  unless inputElement # Can't find input control.
    if inputElement.setSelectionRange
      
      # Mozilla/WebKit
      inputElement.setSelectionRange start, end
    else if inputElement.createTextRange
      
      # IE
      range = inputElement.createTextRange()
      range.moveStart "character", start
      range.moveEnd "character", end
      range.select()


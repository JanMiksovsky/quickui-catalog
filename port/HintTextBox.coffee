###
A text box that shows a "hint" as to what the user should enter. 
###

class window.HintTextBox extends Control

  inherited:
    content: [
      html: "<input type=\"text\" />", ref: "HintTextBox_textBox"
    ,
      html: "<div/>", ref: "HintTextBox_hint"
    ]
    generic: "true"

  # The content of the text box.
  content: Control.chain( "$HintTextBox_textBox", "content", ->
    @_showHintIfEmpty()
  )

  # The "hint" shown within the text box that suggests what the user should
  # type there. This hint is hidden if: the text box has content, the
  # text box has just acquired the keyboard focus, or if the user clicks in
  # the text box. 
  hint: Control.chain "$HintTextBox_hint", "content"
  initialize: ->
    @on
      click: => @_hideHint()
      focus: =>
        unless @_isTextBoxFocused()
          @$HintTextBox_textBox().focus()
    @$HintTextBox_textBox().on
      blur: => @_isTextBoxFocused( false )._showHintIfEmpty()
      focus: => @_isTextBoxFocused true
      keydown: ( event ) => @_handleKeydown event
      keyup: => @_showHintIfEmpty()
    @$HintTextBox_hint().click => @_hideHint()

  _isTextBoxFocused: Control.property( null, false )

  # The keydown event comes before the browser has processed it, so we can't
  # tell at this point for sure what the final text is. However, we can
  # speculate as to whether the result of the key will add or remove text.
  # Most keys will add a character to the text box, in which case we'll end
  # up removing the hint; rather than waiting for keyup to check whether the
  # text is non-empty, we'll hide the hint now. In special cases, we defer
  # hiding the hint until the keyup event, when we can check the final text
  # that includes the result of the key.
  _handleKeydown: ( event ) ->
    keysOfUnknownEffect = [
      8   # Backspace
      9   # Tab
      16  # Shift
      17  # Ctrl
      18  # Alt
      19  # Pause/Break
      20  # Caps Lock
      27  # Esc
      33  # Page Up
      34  # Page Down
      35  # End
      36  # Home
      37  # Left
      38  # Up
      39  # Right
      40  # Down
      45  # Insert
      46  # Delete
      91  # Windows
      93  # Context menu
      144 # Num lock
      145 # Scroll lock
      182 # Computer
      183 # Calculator
    ]
    if $.inArray( event.which, keysOfUnknownEffect ) < 0
      # Probably a text key. Preemptively hide the hint.
      @$HintTextBox_hint().hide()

  _hideHint: ->
    @$HintTextBox_hint().hide()
    @$HintTextBox_textBox().focus()

  # This routine is a more careful check to see whether we should show the
  # hint or not. We can call this on blur or keyup (when, unlike keydown,
  # the final state of the text is known).
  _showHintIfEmpty: ->
    @$HintTextBox_hint().toggle ( @content().length == 0 )

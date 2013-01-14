# A text box that shows a "hint" as to what the user should enter. 
window.HintTextBox = Control.sub(
  className: "HintTextBox"
  inherited:
    content: [" ",
      html: "<input type=\"text\" />"
      ref: "HintTextBox_textBox"
    , " ",
      html: "<div />"
      ref: "HintTextBox_hint"
    , " "]
    generic: "true"
)
HintTextBox::extend

  # The content of the text box.
  content: Control.chain("$HintTextBox_textBox", "content", ->
    @_showHintIfEmpty()
  )

  # The "hint" shown within the text box that suggests what the user should
  # type there. This hint is hidden if: the text box has content, the
  # text box has just acquired the keyboard focus, or if the user clicks in
  # the text box. 
  hint: Control.chain("$HintTextBox_hint", "content")
  initialize: ->
    self = this
    @on
      click: ->
        self._hideHint()

      focus: ->
        self.$HintTextBox_textBox().focus()  unless self._isTextBoxFocused()

    @$HintTextBox_textBox().on
      blur: ->
        self._isTextBoxFocused(false)._showHintIfEmpty()

      focus: ->
        self._isTextBoxFocused true

      keydown: (event) ->
        self._handleKeydown event

      keyup: ->
        self._showHintIfEmpty()

    @$HintTextBox_hint().click ->
      self._hideHint()


  _isTextBoxFocused: Control.property(null, false)

  # The keydown event comes before the browser has processed it, so we can't
  # tell at this point for sure what the final text is. However, we can
  # speculate as to whether the result of the key will add or remove text.
  # Most keys will add a character to the text box, in which case we'll end
  # up removing the hint; rather than waiting for keyup to check whether the
  # text is non-empty, we'll hide the hint now. In special cases, we defer
  # hiding the hint until the keyup event, when we can check the final text
  # that includes the result of the key.
  _handleKeydown: (event) ->
    # Backspace
    # Tab
    # Shift
    # Ctrl
    # Alt
    # Pause/Break
    # Caps Lock
    # Esc
    # Page Up
    # Page Down
    # End
    # Home
    # Left
    # Up
    # Right
    # Down
    # Insert
    # Delete
    # Windows
    # Context menu
    # Num lock
    # Scroll lock
    # Computer
    keysOfUnknownEffect = [8, 9, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 91, 93, 144, 145, 182, 183] # Calculator
    
    # Probably a text key. Preemptively hide the hint.
    @$HintTextBox_hint().hide()  if $.inArray(event.which, keysOfUnknownEffect) < 0

  _hideHint: ->
    @$HintTextBox_hint().hide()
    @$HintTextBox_textBox().focus()


  # This routine is a more careful check to see whether we should show the
  # hint or not. We can call this on blur or keyup (when, unlike keydown,
  # the final state of the text is known).
  _showHintIfEmpty: ->
    @$HintTextBox_hint().toggle @content().length is 0


###
Control with a content area (usually some form of text box) and an associated "Go" button
(labeled something like "Search"), where clicking the button does something with the content.
###

class window.TextBoxWithButton extends Control

  inherited:
    content: 
      control: HorizontalPanels
      content:
        control: TextBox, ref: "TextBoxWithButton_textBox"
      right:
        control: BasicButton, ref: "TextBoxWithButton_goButton", content: "Go"
  
  # The content of the text box.
  content: ( value ) ->
    result = @$TextBoxWithButton_textBox().content value
    if value isnt undefined
      @_disableGoButtonIfContentEmpty()
    result

  # The button shown next to the text box. This button is disabled if the
  # text box is currently empty.
  goButton: Control.chain "$TextBoxWithButton_goButton", "control"

  initialize: ->
    @$TextBoxWithButton_textBox().on "change keydown keyup", ( event ) =>
      @_disableGoButtonIfContentEmpty()
      keyCode = event.keyCode or event.which
      if not @._isContentEmpty() and keyCode is 13 # Enter 
        @trigger "goButtonClick"
        return false
    @$TextBoxWithButton_goButton().click =>
      @trigger "goButtonClick"
    @_disableGoButtonIfContentEmpty()

  # The placeholder (hint text) shown in the text box if it's empty.
  placeholder: Control.chain "textBox", "prop/placeholder"
  
  # True if the text box should do spell-checking.
  spellcheck: Control.chain "textBox", "prop/spellcheck"

  # The text box
  textBox: Control.chain "$TextBoxWithButton_textBox", "control"


  _disableGoButtonIfContentEmpty: ->
    content = @content()
    goButton = @goButton()
    if goButton? and goButton instanceof BasicButton
      goButton.disabled @_isContentEmpty()

  _isContentEmpty: ->
    content = @content()
    not content? or content.length == 0

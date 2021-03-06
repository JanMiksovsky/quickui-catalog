###
General purpose base class for text box controls.
This simply wraps a normal input element.
###

class window.TextBox extends Control

  tag: "input"

  content: ( content ) ->
    result = super content
    if content isnt undefined
      # Setting content programmatically generates a change event so that the UI
      # can react accordingly.
      @trigger "change"
    result

  # True if the text box is disabled. 
  disabled: Control.chain "prop/disabled"
  
  initialize: ->
    if @type() is "text"
      # Explicitly stamp type="text" on the control if a type hasn't been set.
      # Chrome reports the type as "text" even if no type has actually been set,
      # but the code below will at least upgrade that implict type to an
      # explicit type.
      @type "text"

  # The placeholder (hint text) shown in the text box if it's empty.
  placeholder: Control.chain "prop/placeholder"

  # True if the text box should do spell-checking.
  spellcheck: Control.chain "prop/spellcheck"

  # The type of input: "text", "email", "password", etc.
  type: Control.chain "prop/type"

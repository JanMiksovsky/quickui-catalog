###
An input control ( e.g., a check box or radio button ) with an associated label.

The control's top element is a label, which ensures that user clicks anywhere
within have the same effect as clicking the input control.
###

class window.LabeledInput extends Control

  tag: "label"
  inherited:
    content: [
      "<input/>"
    ,
      html: "<span/>", ref: "LabeledInput_content"
    ]

  # True if the input control is checked, false if unchecked.
  checked: Control.chain "_inputControl", "prop/checked"

  # The label for the input control.
  # This can be arbitrary content, not just text.
  content: Control.chain "$LabeledInput_content", "content"

  # True if the input control should be disabled.
  disabled: Control.chain "_inputControl", "prop/disabled"

  # Return the input control.
  # We restrict our search to direct children, in case the label also includes
  # input controls.
  _inputControl: Control.chain "children", "filter/input"

  # Sets the input control's type.
  # This is set in subclasses CheckBox and RadioButton.
  _type: ( type ) ->
    input = @_inputControl()
    if type? and Control.browser.msie and parseInt( Control.browser.version ) < 9      
      # IE8 can't change an input's "type" attribute.
      # Create new input(s) to replace the existing input(s).
      for oldInput in input.segments()
        newInput = $( "<input type='" + type + "'/>" ).prop
          # Copy old input's properties to new one.
          checked: oldInput.prop "checked"
          disabled: oldInput.prop "disabled"
        oldInput.replaceWith newInput
      this
    else
      input.prop "type", type

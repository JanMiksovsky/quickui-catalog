###
A button which can hold a selected state. 
###

class window.ToggleButton extends BasicButton
  className: "ToggleButton"
  inherited: {}


  initialize: ->
    self = this
    @click ->
      self.toggleSelected()  unless self.disabled()


  # True if the button is currently in the selected state.
  selected: Control.chain("applyClass/selected")

  # Toggle the button's selected state.
  toggleSelected: (value) ->
    @selected value or not @selected()


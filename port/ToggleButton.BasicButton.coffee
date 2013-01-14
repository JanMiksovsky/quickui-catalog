###
A button which can hold a selected state. 
###

window.ToggleButton = BasicButton.sub(
  className: "ToggleButton"
  inherited: {}
)
ToggleButton::extend
  initialize: ->
    self = this
    @click ->
      self.toggleSelected()  unless self.disabled()



  # True if the button is currently in the selected state.
  selected: Control.chain("applyClass/selected")

  # Toggle the button's selected state.
  toggleSelected: (value) ->
    @selected value or not @selected()


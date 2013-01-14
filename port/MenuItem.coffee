###
A command in a Menu. 
###

window.MenuItem = Control.sub(
  className: "MenuItem"
  inherited:
    generic: "true"
)
MenuItem::extend

  # True if the menu item is disabled. The default is false.
  disabled: Control.chain("applyClass/disabled")
  initialize: ->
    self = this
    @click (event) ->
      false  if self.disabled()



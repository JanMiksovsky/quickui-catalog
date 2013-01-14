###
A command in a Menu. 
###

class window.MenuItem extends Control

  inherited:
    generic: "true"

  # True if the menu item is disabled. The default is false.
  disabled: Control.chain("applyClass/disabled")
  initialize: ->
    self = this
    @click (event) ->
      false  if self.disabled()


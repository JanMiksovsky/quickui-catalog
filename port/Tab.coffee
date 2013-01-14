###
A control that can be used as a tab in a Tabs. 
###

window.Tab = Control.sub(className: "Tab")
Tab::extend

  # The content of the tab.
  content: (value) ->
    result = @_super(value)
    
    # The parent (e.g., a Tabs) may want to know that the size
    # of this element has changed.
    @checkForSizeChange()  if value isnt undefined
    result

  # The description which should be rendered in the button for the tab.
  description: Control.property()


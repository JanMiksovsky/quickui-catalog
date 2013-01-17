###
A control that can be used as a tab in a Tabs. 
###

class window.Tab extends Control

  # The content of the tab.
  content: ( value ) ->
    result = super value  
    if value isnt undefined
      # The parent (e.g., a Tabs) may want to know that the size of this element
      # has changed.
      @checkForSizeChange()
    result

  # The description which should be rendered in the button for the tab.
  description: Control.property()

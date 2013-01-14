###
A popup menu. This is typically used in a Menu bar. 
###

class window.Menu extends PopupSource
  className: "Menu"
  inherited:
    popup: [" ",
      html: "<div />"
      ref: "shield"
    
    # Used to obscure borders between description and content. 
    , " ", " ",
      html: "<div />"
      ref: "Menu_popup"
    , " "]
    generic: "true"


  initialize: ->
    @$PopupSource_popup().on "click", (event) ->
      
      # Absorb clicks outside of menu items.
      $menuItem = $(event.target).closest(".MenuItem")
      event.stopPropagation()  if $menuItem.length is 0

  open: ->
    
    # Ensure the little shield matches the current width of the content
    # before opening the menu.
    @_updateShield()
    @_super()

  popup: Control.chain("$Menu_popup", "content")
  
  # Hint for documentation tools.
  _requiredClasses: ["MenuItem"]

  # The "shield" is a thin block that can be used to obscure the boundary
  # between the content and popup so that those two elements can
  # appear to exist on a seamless surface. For this to work, the shield
  # needs to be (almost) as wide as the description. 
  _updateShield: ->
    
    # We want the width of the content including padding, but not
    # including border.
    $content = @$PopupSource_content()
    shieldWidth = $content.width() + parseFloat($content.css("padding-left")) + parseFloat($content.css("padding-right"))
    @$shield().width shieldWidth


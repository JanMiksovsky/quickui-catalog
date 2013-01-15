###
A panel arranging items horizontally; items that don't fit overflow into a menu.

The basic strategy is to keep all items on the same line, but make the ones
that don't fit invisible. When the menu button is clicked, the invisible items
are temporarily moved to the menu, then moved back when the menu is closed. 
###

class window.PanelWithOverflow extends Control

  inherited:
    content: [
      control: "PopupButton"
      ref: "menuButton"
      indicator: "»"
      quiet: "true"
    ,
      html: "<div />"
      ref: "PanelWithOverflow_content"
    ]
    generic: "true"

  # The contents of the control.
  content: Control.chain( "$PanelWithOverflow_content", "content", ->
    @checkForSizeChange()
  )

  # The indicator used to show when contents have overflowed
  # the control's bounds.
  indicator: Control.chain( "$menuButton", "indicator", ->
    @checkForSizeChange()
  )
  initialize: ->
    @on "layout sizeChanged", => @layout()
    @$menuButton().on
      "canceled closed": => @_menuClosed()
      opened: =>
        @_menuOpened()
        # (Re)position the popup now that it's been populated.
        @$menuButton().positionPopup()

  # Force the control to layout its contents.
  layout: Control.iterator( ->
    
    # Don't bother laying out until we're visible, or if the popup
    # is currently open. The latter case, while it'd be nice to support,
    # quickly gets quite hairy.
    return  if not @is( ":visible" ) or @$menuButton().opened()
    availableWidth = @width()
    showMenu = false
    $children = @$PanelWithOverflow_content().children()
    
    # Work from right to left 
    i = $children.length - 1

    while i > 0
      $child = $children.eq( i )
      
      # Look at right edge, not counting right margin
      marginLeft = parseInt( $child.css( "margin-left" ) ) or 0
      right = marginLeft + $child.position().left + $child.outerWidth()
      overflowed = ( right > availableWidth )
      $child.toggleClass "overflowed", overflowed
      if overflowed
        unless showMenu
          
          # Turn on menu, and allocate room for it.
          showMenu = true
          availableWidth -= @$menuButton().outerWidth( true )
      else
        
        # Everything to the left fits.
        $children.slice( 0, i ).removeClass "overflowed"
        break
      i--
    @$menuButton().toggle showMenu
  )
  _menuClosed: Control.iterator( ->
    
    # Return the overflow menu's children to the main content area.
    $overflowed = @$menuButton().popup()
    @$PanelWithOverflow_content().append $overflowed
    @layout()
  )
  _menuOpened: Control.iterator( ->
    
    # Temporarily move the overflowed items into the menu.
    content = @$PanelWithOverflow_content().content()
    $overflowed = $( content ).filter( ".overflowed" )
    @$menuButton().popup $overflowed
  )


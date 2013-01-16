###
A set of tabbed pages.

Each child of the content will be treated as a page. If the child has a function
called description(), that will be used as the name on the tab.

The Tabs control will resize itself to be as tall as its tallest child.
###

class window.Tabs extends Control

  inherited:
    content: [
      control: "VerticalPanels"
      ref: "tabPanels"
      top: [
        control: "List"
        ref: "tabButtons"
        itemClass: "BasicButton"
      ]
      content: [
        control: "Modes"
        ref: "Tabs_content"
        maximize: "true"
      ]
    ]
    generic: "true"

  # The array of elements to be shown as tabs.
  content: Control.chain( "$Tabs_content", "content", ->
    @_createButtons()
  )

  # The class used to render the container for the tabbed pages.
  contentClass: ( contentClass ) ->
    if contentClass is undefined
      @$Tabs_content().controlClass()
    else
      
      # The default Modes class sets the content's size, so clear any
      # explicitly-set height and width.
      @$Tabs_content().css
        height: ""
        width: ""

      $new = @$Tabs_content().transmute contentClass, true
      @referencedElement "Tabs_content", $new
      this

  # True if the Tabs should vertically fill its container.
  fill: Control.chain "$tabPanels", "fill"

  initialize: ->
    @$tabButtons().click ( event ) =>
      tabButtonCssClass = "." + @tabButtonClass()::className
      tabButton = $( event.target ).closest( tabButtonCssClass ).control()
      if tabButton
        index = @tabButtons().index tabButton
        if index >= 0
          tab = @tabs()[index]
          @trigger "tabButtonClick", [index, tab]
          @selectedTabIndex index  if @selectTabOnClick()
    @$Tabs_content().on activeElementChanged: ( event, index, child ) =>
      # Map the Modes's activeElementChanged event to a more semantically
      # specific activeTabChanged event. Only map active events coming from our
      # own Modes; ignore events coming from any Modes within a tab.
      tab = $( event.target ).filter @tabs()
      if tab.length > 0
        event.stopPropagation()
        @trigger "activeTabChanged", [index, child]

    # Select first tab by default.
    @selectedTabIndex 0  if @tabs().length > 0 and not @selectedTabIndex()

  # True if a tab should be selected on click; false if the showing of the
  # clicked tab will be handled separately. 
  selectTabOnClick: Control.property.bool( null, true )

  # The child currently shown as the selected tab.
  selectedTab: Control.chain "$Tabs_content", "activeElement"

  # The index of the selected tab.
  selectedTabIndex: Control.chain( "$Tabs_content", "activeIndex", ( index ) ->
    # Deselect all tab buttons.
    @tabButtons().removeClass( "selected" ).eq( index ).addClass "selected" # Select the indicated button.
  )

  # The current set of tab button controls.
  tabButtons: Control.chain "$tabButtons", "children"

  # The class which should be used to create tab buttons for the set.
  tabButtonClass: Control.chain( "$tabButtons", "itemClass", ->
    @_createButtons()
  )

  # The content of the current set of tabs.
  tabs: Control.chain "$Tabs_content", "elements"

  # Called whenever the set of buttons needs to be regenerated.
  _createButtons: ->
    return  if @tabButtonClass() is undefined
    
    # Show the description for each tab as a button.
    descriptions = @tabs().map( ( index, tab ) ->
      $tab = $( tab ).control()
      description = if ( $tab and $.isFunction( $tab.description ) ) then $tab.description() else ""
      description
    ).get()
    @$tabButtons().items descriptions
    selectedTabIndex = @selectedTabIndex()
    
    # Ensure the indicated button is shown as selected.
    @selectedTabIndex selectedTabIndex  if selectedTabIndex?


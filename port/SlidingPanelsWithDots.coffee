#
#Show its children as sliding pages which can be navigated by clicking buttons below.
#(The conventional button representation is a dot.)
#
SlidingPanelsWithDots = Control.sub(
  className: "SlidingPanelsWithDots"
  inherited:
    content: [" ",
      control: "SlidingPanels"
      ref: "pages"
    , " ",
      html: "<div />"
      ref: "buttonPanel"
      content: [" ",
        control: "Repeater"
        ref: "pageButtons"
      , " "]
    , " "]
    generic: "true"
)
SlidingPanelsWithDots::extend
  
  #
  #     * The index of the page currently being shown.
  #     
  activeIndex: Control.property((activeIndex) ->
    @$pages().activeIndex activeIndex
    @pageButtons().removeClass("selected").eq(activeIndex).addClass "selected"
    this
  )
  
  #
  #     * The set of elements to show as pages.
  #     
  content: Control.chain("$pages", "content", ->
    @$pageButtons().count @elements().length
  )
  elements: Control.chain("$pages", "elements")
  initialize: ->
    @pageButtonClass BasicButton  unless @pageButtonClass()
    self = this
    @$pageButtons().click (event) ->
      
      # Which button was clicked?
      pageButton = $(event.target).closest(self.pageButtons()).control()
      if pageButton
        index = self.pageButtons().index(pageButton)
        self.activeIndex index  if index >= 0

    @activeIndex 0  unless @activeIndex()

  pageButtons: Control.chain("$pageButtons", "children")
  
  #
  #     * The class used to render the buttons to navigate between pages.
  #     
  pageButtonClass: Control.chain("$pageButtons", "repeatClass")


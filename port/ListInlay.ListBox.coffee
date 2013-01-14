#
#A list whose selected item can show additional information.
#
#By default, this control expects items to be a dictionary of the form:
#
#{
#    description: (content, usually a single line, that's always visible)
#    content: (expanded content that appears when an item is selected)
#}
#
#
window.ListInlay = ListBox.sub(
  className: "ListInlay"
  inherited:
    itemClass: "Collapsible"
    highlightSelection: "false"
)
ListInlay::extend
  initialize: ->
    @mapFunction
      description: "heading"
      content: "content"


  selectControl: (control, select) ->
    @_super control, select
    if select
      control.toggleCollapse()
    else
      control.collapsed true

  _setupControl: (control) ->
    
    # Let ListBox manage toggling instead of Collapsible
    control.toggleOnClick false


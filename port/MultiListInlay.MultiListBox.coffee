###
A list whose selected items can show additional information.

By default, this control expects items to be a dictionary of the form:

{
   description: (content, usually a single line, that's always visible)
   content: (expanded content that appears when an item is selected)
}

This is the multiple-selection variation of ListInlay.
###

window.MultiListInlay = MultiListBox.sub(
  className: "MultiListInlay"
  inherited:
    itemClass: "CollapsibleWithHeadingButton"
    highlightSelection: "false"
)
MultiListInlay::extend
  initialize: ->
    @mapFunction (item) ->
      if item is undefined
        description: @heading()
        content: @content()
      else
        @heading(item.description).content item.content
        
        # Let ListBox manage toggling instead of Collapsible
        @toggleOnClick false  if this instanceof Collapsible

  selectControl: (control, select) ->
    @_super control, select
    control.collapsed not select


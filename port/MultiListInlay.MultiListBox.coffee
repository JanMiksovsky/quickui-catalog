###
A list whose selected items can show additional information.

By default, this control expects items to be a dictionary of the form:

{
  description: ( content, usually a single line, that's always visible )
  content: ( expanded content that appears when an item is selected )
}

This is the multiple-selection variation of ListInlay.
###

class window.MultiListInlay extends MultiListBox

  inherited:
    highlightSelection: "false"
    itemClass: "CollapsibleWithHeadingButton"

  initialize: ->
    @mapFunction ( item ) ->
      if item is undefined
        description: @heading()
        content: @content()
      else
        @heading( item.description ).content item.content
        if this instanceof Collapsible
          # Let ListBox manage toggling instead of Collapsible
          @toggleOnClick false

  selectControl: ( control, select ) ->
    super control, select
    control.collapsed not select

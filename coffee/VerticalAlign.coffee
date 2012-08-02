###
Vertically align children using CSS flexbox layout if available, and manual
layout if not.
###

# TODO: More refactoring to share work with SimpleFlexBox.

class window.VerticalAlign extends Control

  initialize: ->
    @inDocument ->
      @_checkFlexBox()

  _checkFlexBox: ->
    if not @inDocument()
      # Flexbox detection requires control to be in DOM.
      return false

    flexBox = SimpleFlexBox.usingFlexBox @

    # We have to set the noFlexBox class before the layout event handler
    # gets bound; binding forces an initial layout handler call, which will
    # need the noFlexBox class to be applied in order to calculate the
    # layout properly.
    @_usingFlexBox flexBox

    handlingLayout = @_handlingLayout()
    needLayout = !flexBox
    if needLayout and not handlingLayout
      @on "layout sizeChanged", =>
        @_layout()
      @_handlingLayout true
    else if not needLayout and handlingLayout
      @off "layout sizeChanged"
      @_handlingLayout false
    flexBox
    
  # True if we're currently handling the layout event to do manual layout.
  _handlingLayout: Control.property.bool( null, false )

  _layout: ->
    @.css "padding-top", "" # Clear padding so it doesn't interface with calcs.
    childrenHeight = 0
    childrenHeight += $( child ).outerHeight() for child in @children()
    availableSpace = Math.max ( @height() - childrenHeight ), 0
    paddingTop = availableSpace / 2
    if paddingTop > 0
      @.css "padding-top", paddingTop

  _usingFlexBox: ( usingFlexBox ) ->
    if usingFlexBox is undefined
      not @hasClass "noFlexBox"
    else
      @toggleClass "noFlexBox", not usingFlexBox
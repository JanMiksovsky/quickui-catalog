###
A panel that can expand and collapse.
###

class window.Collapsible extends Control

  inherited:
    content: [
      html: "<div/>", ref: "Collapsible_heading"
    ,
      html: "<div/>", ref: "Collapsible_content"
    ]
    generic: "true"

  # The control's contents which can be expanded and collapsed.
  content: Control.chain "$Collapsible_content", "content"

  # The speed of the expand/collapse animation, in milliseconds.
  duration: Control.property null, "fast"

  # Get or set the control's collapsed state.
  # When called as a setter, a true value collapsed the control;
  # a false value expands the control.
  collapsed: Control.iterator ( value ) ->
    if value is undefined
      # Getter
      @_collapsed()
    else
      # Setter
      if @inDocument()
        # Animate if in document.
        result = if value then "hide" else "show"
        @$Collapsible_content().animate
          height: result
          opacity: result
        , @duration(), null, =>
          # Wait until animation completes to apply collapsed style. 
          @toggleClass "collapsed", value
      else
        # Not in document, animation won't work.
        @toggleClass( "collapsed", value )
        @$Collapsible_content().toggle not value

      if @_collapsed() isnt value
        @trigger "collapsedChanged"
        @_collapsed value

  # The control's heading. By default, a click anywhere within the heading
  # toggles the control's collapsed state. This can be empty if the application
  # wants to programmatically control the collapsed state in some other means.
  heading: Control.chain "$Collapsible_heading", "content"
  initialize: ->
    @$Collapsible_heading().click =>
      if @toggleOnClick()
        @toggleCollapse()

  # Toggle the collapsed state of the control.
  toggleCollapse: ->
    @collapsed not @collapsed()

  # True if the control should toggle its state when the user clicks in
  # the heading. Default is true.
  #	 
  toggleOnClick: Control.property.bool( null, true )

  _collapsed: Control.property.bool( null, false )

###
A collapsible panel whose heading region, by default, includes a button on
the far right that indicates the panel's collapsed/expanded state.
###

window.CollapsibleWithHeadingButton = Collapsible.sub(
  className: "CollapsibleWithHeadingButton"
  inherited:
    heading: [" ",
      control: "BasicButton"
      ref: "headingButton"
      content: [" ",
        html: "<div>+</div>"
        ref: "collapsedButtonContent"
      , " ",
        html: "<div>−</div>"
        ref: "expandedButtonContent"
      
      # Minus sign, not hyphen 
      , " ", " "]
    , " ",
      control: "Fader"
      ref: "CollapsibleWithHeadingButton_heading"
    , " "]
)
CollapsibleWithHeadingButton::extend

  # The class of the heading button.
  buttonClass: Control.chain("$headingButton", "transmute")

  # The content of the heading button when the panel is collapsed.
  collapsedButtonContent: Control.chain("$collapsedButtonContent", "content")

  # The content of the heading button when the panel is expanded.
  expandedButtonContent: Control.chain("$expandedButtonContent", "content")

  # The heading shown at the top of the panel.
  heading: Control.chain("$CollapsibleWithHeadingButton_heading", "content")
  initialize: ->
    $button = @$headingButton()
    @$Collapsible_heading().hover (hoverIn = ->
      $button.addClass "hover"
    ), hoverOut = ->
      $button.removeClass "hover"


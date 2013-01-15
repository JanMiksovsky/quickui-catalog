###
A collapsible panel whose heading region, by default, includes a button on
the far right that indicates the panel's collapsed/expanded state.
###

class window.CollapsibleWithHeadingButton extends Collapsible

  inherited:
    heading: [
      control: "BasicButton"
      ref: "headingButton"
      content: [
        html: "<div>+</div>"
        ref: "collapsedButtonContent"
      , 
        # Minus sign, not hyphen 
        html: "<div>−</div>"
        ref: "expandedButtonContent"
      ]
    ,
      control: "Fader"
      ref: "CollapsibleWithHeadingButton_heading"
    ]

  # The class of the heading button.
  buttonClass: Control.chain "$headingButton", "transmute"

  # The content of the heading button when the panel is collapsed.
  collapsedButtonContent: Control.chain "$collapsedButtonContent", "content"

  # The content of the heading button when the panel is expanded.
  expandedButtonContent: Control.chain "$expandedButtonContent", "content"

  # The heading shown at the top of the panel.
  heading: Control.chain "$CollapsibleWithHeadingButton_heading", "content"
  initialize: ->
    $button = @$headingButton()
    @$Collapsible_heading().hover =>
      $button.addClass "hover"
    , =>
      $button.removeClass "hover"

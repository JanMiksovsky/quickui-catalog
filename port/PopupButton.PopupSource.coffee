# A button that produces a popup when clicked. 
PopupButton = PopupSource.sub(
  className: "PopupButton"
  inherited:
    contentClass: "BasicButton"
    content: [" ",
      html: "<div />"
      ref: "PopupButton_content"
    , " ",
      html: "<div>▼</div>"
      ref: "indicator"
    , " "]
    generic: "true"
)
PopupButton::extend
  
  #
  #     * The content of the button.
  #     
  content: Control.chain("$PopupButton_content", "content", (content) ->
    hasContent = content and content.length > 0
    @$PopupButton_content().css "display", (if hasContent then "inline-block" else "none")
  )
  
  #
  #     * Content which indicates the button can be clicked to produce a popup.
  #     * The default indicator is a downward-pointing arrow. 
  #     
  indicator: Control.chain("$indicator", "content")
  quiet: Control.chain("$PopupSource_content", "quiet")


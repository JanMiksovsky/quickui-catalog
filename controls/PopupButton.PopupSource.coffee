###
A button that produces a popup when clicked. 
###

class window.PopupButton extends PopupSource

  inherited:
    contentClass: "BasicButton"
    content: [
      html: "<div/>", ref: "PopupButton_content"
    ,
      html: "<div>▼</div>", ref: "indicator"
    ]
    generic: "true"

  # The content of the button.
  content: Control.chain( "$PopupButton_content", "content", ( content ) ->
    display = if content?.length > 0 then "inline-block" else "none"
    @$PopupButton_content().css "display", display
  )

  # Content which indicates the button can be clicked to produce a popup.
  # The default indicator is a downward-pointing arrow. 
  indicator: Control.chain "$indicator", "content"
  quiet: Control.chain "$PopupSource_content", "quiet"

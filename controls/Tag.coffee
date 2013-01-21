###
Formats its content as an XML tag.
###

class window.Tag extends Control
  inherited:
    content: [
      "&lt;"
    ,
      html: "<span/>", ref: "Tag_content"
    ,
      ">"
    ]
  tag: "span"

  content: Control.chain "$Tag_content", "content"

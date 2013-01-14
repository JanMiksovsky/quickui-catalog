###
A page organized into four quadrants:
top left: typically a logo
top right: typically cross-area navigation
bottom left: typically within-area navigation
bottom right: typically main page content

The whole page scrolls as a unit.
###

class window.PageWithQuadrants extends Page
  className: "PageWithQuadrants"
  inherited:
    content: [" ",
      html: "<div class=\"table\" />"
      ref: "pageTable"
      content: [" ",
        html: "<div class=\"top row\" />"
        content: [" ",
          html: "<div class=\"top left cell\" />"
          ref: "PageWithQuadrants_topLeft"
        , " ",
          html: "<div class=\"top right cell\" />"
          ref: "PageWithQuadrants_topRight"
        , " "]
      , " ",
        html: "<div class=\"bottom row\" />"
        content: [" ",
          html: "<div class=\"bottom left cell\" />"
          ref: "PageWithQuadrants_bottomLeft"
        , " ",
          html: "<div class=\"bottom right cell\" />"
          ref: "PageWithQuadrants_bottomRight"
        , " "]
      , " "]
    , " "]


  topLeft: Control.chain("$PageWithQuadrants_topLeft", "content")
  topRight: Control.chain("$PageWithQuadrants_topRight", "content")
  bottomLeft: Control.chain("$PageWithQuadrants_bottomLeft", "content")
  bottomRight: Control.chain("$PageWithQuadrants_bottomRight", "content")

  # The main page content. This will go in the bottom right quadrant.
  content: Control.chain("bottomRight")


###
Shows a placeholder for a standard IAB ad unit.
The size can be specified with either pixel dimensions or a unit name.
See IAB "Ad Unit Guidelines" at http://www.iab.net for dimensions and names.
###

class window.AdPlaceholder extends Control

  inherited:
    content: [
      html: "<div />"
      ref: "container"
      content: [
        html: "<div>Advertisement</div>"
        ref: "label"
      , 
        html: "<div />"
        ref: "AdPlaceholder_content"
      ]
    ]
    generic: "true"

  # Ad unit content. By default, this shows the unit/dimensions.
  content: Control.chain "$AdPlaceholder_content", "content"

  # Ad unit dimensions. Should include two values separated by an "x",
  # e.g., "300 x 250". Can also be one of the following ad unit names:
  # 
  #      Medium Rectangle
  #      Rectangle
  #      Leaderboard
  #      Wide Skyscraper
  #      Half Page Ad
  #      Button 2
  #      Micro Bar
  dimensions: Control.property ( dimensions ) ->
    s = AdPlaceholder.standardUnits[ dimensions ] or dimensions
    parts = s.toLowerCase().split "x"
    width = parseInt parts[0]
    height = parseInt parts[1]
    @css
      height: height
      "min-height": height
      "min-width": width
      width: width
    @content width + " x " + height
    @checkForSizeChange()
  
  initialize: ->
    # Use default size.
    @dimensions "300 x 250"  unless @dimensions()

  # Names of all core standard ad units as of 2/28/2011.
  # See http://www.iab.net/iab_products_and_industry_services/1421/1443/1452
  @standardUnits:
    "Medium Rectangle": "300 x 250"
    Rectangle: "180 x 150"
    Leaderboard: "728 x 90"
    "Wide Skyscraper": "160 x 600"
    "Half Page Ad": "300 x 600"
    "Button 2": "120 x 60"
    "Micro Bar": "88 x 31"

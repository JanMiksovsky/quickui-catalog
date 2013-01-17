###
Pack children into columns.

The number of columns is variable, and is determined by diving the control's
available width by the column width ( which is taken from the width of the
first child ).
###

class window.PackedColumns extends Control

  # True if the columns should be centered. Default is false.
  center: Control.property.bool( ->
    if @inDocument()
      @layout()
  )
  content: ( value ) ->
    result = super value
    @checkForSizeChange()
    result

  initialize: ->
    @on "layout sizeChanged", => @layout()

  layout: ->

    children = @children()
    unless children.length > 0
      return
    
    # Infer column width and inter-child margins from first child.
    firstChild = children.eq 0
    columnWidth = firstChild.outerWidth()
    if columnWidth == 0
      return # No width; perhaps child will load later.
    marginRight = parseInt firstChild.css "margin-right"
    marginBottom = parseInt firstChild.css "margin-bottom"
    availableWidth = @width()
    columns = Math.max Math.floor( ( availableWidth + marginRight ) / ( columnWidth + marginRight ) ), 1
    consumedWidth = columns * columnWidth + ( columns - 1 ) * marginRight
    leftover = Math.max availableWidth - consumedWidth, 0
    offsetX = if @center() then leftover / 2 else 0
    columnHeight = []
    for child in children.segments()
      
      # Find shortest column
      shortestColumn = 0
      for column in [ 1 .. columns - 1 ]
        height = columnHeight[ column ] or 0
        if height < columnHeight[ shortestColumn ]
          shortestColumn = column
      
      # Add the current child to the shortest column
      x = shortestColumn * ( columnWidth + marginRight ) + offsetX
      y = columnHeight[ shortestColumn ] ? 0
      child.css
        left: x
        top: y
      columnHeight[ shortestColumn ] = y + child.outerHeight() + marginBottom

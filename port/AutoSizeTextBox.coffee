###
A text box that makes itself big enough to show its content.

This works by copying the text to a hidden div which will automatically grow in
size; the expanding copy will expand the container, which in turn stretch the
text box.
###

class window.AutoSizeTextBox extends Control

  inherited:
    content: [
      # Visible text box 
      html: "<textarea/>", ref: "textBox"
    ,
      # Hidden copy of text. Use a pre tag to preserve line breaks, entities, etc. 
      html: "<pre/>", ref: "textCopy"
    ]

  # Resize the text box to exactly contain its content.
  autoSize: Control.iterator ( addExtraLine ) ->

    # We resize by copying the text box contents to the hidden copy. That copy
    # will size appropriately, which will make the overall control the right
    # height, which will then size the text box.
    content = @$textBox().content()
    if addExtraLine
      content += "\n"
    
    # See if last line of content ends in a newline (extra or otherwise).
    if content.slice( -1 ) is "\n"
      # Add an extra space so that the last line will get fully rendered.
      content += " "

    @$textCopy().text content

  # The content of the text box.
  content: Control.chain( "$textBox", "content", ->
    @autoSize()
  )
  
  initialize: ->
    @$textBox().on
      "change keyup": ( event ) => @autoSize()
      keypress: ( event ) =>
        # Speculatively add a line to our copy of the text. We're not sure what
        # the exact effect of typing this character will be, and at this point
        # it's not reflected yet in the text box's content. We speculate that it
        # will add a line to the text and size accordingly. (One other
        # possibility is that the user's replacing a selected chunk of text with
        # a newline.) In any event, once we get the keyup or change event, we'll
        # make any final adjustments.
        if event.which == 13 # Enter 
          @autoSize true

    @inDocument ->
      @_refresh()

  # The minimum number of lines that should be shown. By default, this is 1.
  # Setting this to a higher number will ensure an empty textarea is still
  # multiple lines tall, which lets the user intuit that the control accepts
  # multiple lines of text.
  minimumLines: Control.property.integer( ( minimumLines ) ->
    if @inDocument()
      @_refresh()
  , 1 )

  # The placeholder (hint text) shown in the text area if it's empty.
  placeholder: Control.chain "$textBox", "prop/placeholder"

  # True if the text box should expose the browser's built-in spell-checking.
  spellcheck: Control.chain "$textBox", "prop/spellcheck"
  
  # For the following, we need to wait until the control's in the DOM.    
  _refresh: Control.iterator ->
    $textBox = @$textBox()
    $textCopy = @$textCopy()
    
    # Copy the control's font to the textarea and text copy.
    # This ensures both end up with the same text metrics.
    @children().css
      "font-family": @css "font-family"
      "font-size": @css "font-size"
      "font-style": @css "font-style"
      "font-weight": @css "font-weight"
    
    # Try to get the text box's line height. Unfortunately some browsers return
    # the useful value "normal", in which case we have to make an estimate based
    # on font size.
    lineHeight = parseInt $textBox.css "line-height"
    if isNaN lineHeight
      # line-height values like "normal" don't give us a measurement
      # we can use. We fall back to estimating a line height
      # based on font size. We then apply this to both the text box
      # and the copy so they both have the same font-size.
      lineHeight = Math.floor parseInt( $textBox.css( "font-size" ) ) * 1.25
      $textBox.css "line-height", lineHeight + "px"
    $textCopy.css "line-height", lineHeight + "px"
    
    # Mirror the textarea's padding and borders on the text copy.
    borderBottomWidth = $textBox.css "border-bottom-width"
    borderLeftWidth = $textBox.css "border-left-width"
    borderRigthWidth = $textBox.css "border-right-width"
    borderTopWidth = $textBox.css "border-top-width"
    paddingBottom = $textBox.css "padding-bottom"
    paddingLeft = $textBox.css "padding-left"
    paddingRight = $textBox.css "padding-right"
    paddingTop = $textBox.css "padding-top"
    if Control.browser.mozilla and not $textBox.is ":visible"      
      # Firefox incorrectly reports the default padding for hidden textareas as
      # 0px. If the textarea is visible, or the padding has been explicitly set,
      # the reported padding is correct. But if we're dealing with a textarea
      # that's currently hidden in Firefox, and the reported padding all around
      # is 0px, we assume we've hit the Firefox padding bug and assume the
      # actual default padding of 2px instead.
      if paddingBottom is "0px" and paddingLeft is "0px" and paddingRight is "0px" and paddingTop is "0px"
        paddingBottom = "2px"
        paddingLeft = "2px"
        paddingRight = "2px"
        paddingTop = "2px"

    $textCopy.css
      "border-bottom-width": borderBottomWidth
      "border-left-width": borderLeftWidth
      "border-right-width": borderRigthWidth
      "border-top-width": borderTopWidth
      "padding-bottom": paddingBottom
      "padding-left": paddingLeft
      "padding-right": paddingRight
      "padding-top": paddingTop

    minimumLines = @minimumLines()
    if minimumLines
      # Convert the number of lines into a minimum height.
      height = minimumLines * lineHeight
      unless Control.browser.mozilla
        # Mozilla incorrectly includes padding+border in height when -moz-box-
        # sizing is border-box. The other browsers do not, so for those browsers
        # we need to add it in.
        height += parseInt( borderTopWidth ) + parseInt( paddingTop ) + parseInt( paddingBottom ) + parseInt( borderBottomWidth )
      @$textCopy().css "min-height", height + "px"

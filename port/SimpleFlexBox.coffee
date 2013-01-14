#
#A polyconstrainHeight (shim) supporting the CSS flexible box layout model on newer browsers
#and emulating some very basic aspects of that layout model on older browsers.
#
#As of 3/12/12, Mozilla's flexbox support is too flaky to use. Among other
#things, if the CSS position is set to absolute, Mozilla will report "display"
#as "block" instead of "-moz-box" as expected, which makes it hard to tell
#whether flexbox is even supported. Forcing the use of flexbox reveals more
#bugs; it's just not worth using at this point.
#
SimpleFlexBox = Control.sub(
  className: "SimpleFlexBox"
  inherited:
    content: [" ",
      html: "<div class=\"panel\" />"
      ref: "SimpleFlexBox_panel1"
    , " ",
      html: "<div />"
      ref: "SimpleFlexBox_content"
    , " ",
      html: "<div class=\"panel\" />"
      ref: "SimpleFlexBox_panel2"
    , " "]
)
SimpleFlexBox::extend
  
  #
  #     * The content of the main center panel.
  #     
  content: Control.chain("$SimpleFlexBox_content", "content")
  
  #
  #     * Set this to true if you have styled the control to constrain its
  #     * height, e.g., with absolute positioning or a hard pixel height. 
  #     * (Unfortunately, there doesn't seem to be a way to programmatically
  #     * determine whether the control has had its height styled.) The default
  #     * is false.
  #     
  constrainHeight: Control.chain("applyClass/constrainHeight", ->
    @trigger "layout"  unless @_checkFlexBox()
  )
  initialize: ->
    @inDocument ->
      @_checkFlexBox()


  
  #
  #     * The orientation of the panels: "horizontal" or "vertical".
  #     
  orient: Control.property((orient) ->
    vertical = @_vertical()
    @toggleClass "horizontal", not vertical
    @toggleClass "vertical", vertical
    @_checkFlexBox()
  , "horizontal")
  
  #
  #     * See if we can use the CSS flexible layout module (preferred), whether
  #     * we can use other flexbox-less styling for layout, or whether we need to
  #     * do manual layout. For the latter, start a layout event handler.
  #     * Return true if we're using flexbox, false if not.  
  #     
  _checkFlexBox: ->
    
    #
    #             * Detection of flexbox support requires styles, which means the
    #             * control has to be in the DOM.
    #             
    return false  unless @inDocument()
    flexBox = SimpleFlexBox.usingFlexBox(this)
    constrainHeight = @constrainHeight()
    
    #
    #         * WebKit has a bug preventing use of overflow: auto in combination with
    #         * -webkit-box-orient: horizontal, which will often come up when
    #         * constraining height.
    #         * See http://code.google.com/p/chromium/issues/detail?id=118004.
    #         * Until that gets fixed, we disable flexbox support on WebKit for
    #         * horizontal orientation and constrained height.
    #         
    flexBox = false  if Control.browser.webkit and not @_vertical() and constrainHeight
    
    #
    #         * We have to set the noFlexBox class before the layout event handler
    #         * gets bound; binding forces an initial layout handler call, which will
    #         * need the noFlexBox class to be applied in order to calculate the
    #         * layout properly.
    #         
    @_usingFlexBox flexBox
    @_childrenCheckSize()
    
    # Handle the layout events as needed.
    handlingLayout = @_handlingLayout()
    needLayout = not flexBox and constrainHeight
    if needLayout and not handlingLayout
      self = this
      @on "layout sizeChanged", ->
        self._layout()

      @_handlingLayout true
    else if not needLayout and handlingLayout
      @off "layout sizeChanged"
      @_handlingLayout false
    flexBox

  
  #
  #     * Simulate flex behavior for the main content panel when the height
  #     * is constrained.
  #     
  _layout: ->
    vertical = @_vertical()
    measureFn = (if vertical then $::outerHeight else $::outerWidth)
    sizePanel1 = measureFn.call(@$SimpleFlexBox_panel1(), true)
    sizePanel2 = measureFn.call(@$SimpleFlexBox_panel2(), true)
    css = if vertical
      bottom: sizePanel2
      top: sizePanel1
    else
      left: sizePanel1
      right: sizePanel2
    @$SimpleFlexBox_content().css css
    @_childrenCheckSize()

  
  #
  #     * If the layout of the control changes in any way, the subcontrols
  #     * contained in the panels should check to see if they've changed size.
  #     
  _childrenCheckSize: ->
    $controls = @children().children().control()
    $controls.checkForSizeChange()  if $controls?

  
  #
  #     * True if we're currently handling the layout event to do manual layout.
  #     
  _handlingLayout: Control.property.bool(null, false)
  
  #
  #     * The content of the first docked panel.
  #     
  _panel1: Control.chain("$SimpleFlexBox_panel1", "content", ->
    @$SimpleFlexBox_panel1().checkForSizeChange()  unless @_usingFlexBox()
  )
  
  #
  #     * The content of the second docked.
  #     
  _panel2: Control.chain("$SimpleFlexBox_panel2", "content", ->
    @$SimpleFlexBox_panel2().checkForSizeChange()  unless @_usingFlexBox()
  )
  
  #
  #     * True if the control is currently using CSS flexible box layout, and
  #     * false if using manual layout.
  #     
  _usingFlexBox: (usingFlexBox) ->
    if usingFlexBox is `undefined`
      not @hasClass("noFlexBox")
    else
      @toggleClass "noFlexBox", not usingFlexBox

  
  # Return true if we're using vertical orientation, false if not.
  _vertical: ->
    @orient() is "vertical"


# Class methods 

#
#     * Returns true if the given element is using the CSS flexible layout module.
#     
SimpleFlexBox.extend usingFlexBox: ($element) ->
  
  # "-moz-box", 
  flexBoxVariants = ["box", "-webkit-box"]
  $.inArray($element.css("display"), flexBoxVariants) >= 0


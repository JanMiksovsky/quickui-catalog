###
A panel that can be situated in a vertically scrolling container, and which
will move up and down in the viewport, but will bump up against the top of
the viewport and remain visible instead of scrolling out of view.

The control hosts its content within a panel that can pop out of the layout
flow. To faciliate styling, the control exposes background and padding
properties that map to the corresponding properties on this inner panel.
For most complex content styling, set all content elements within a single
div or other element and style that.

Note: A PersistentPanel should generally be placed within the highest-level
scrolling element on the page; it will not work property when placed
in a scrolling element nested within some outer scrolling element.
###

window.PersistentPanel = Control.sub(
  className: "PersistentPanel"
  inherited:
    content: [" ",
      html: "<div />"
      ref: "PersistentPanel_content"
    , " "]
    generic: "true"
)
PersistentPanel::extend

  # The content's background. See top notes.
  background: Control.chain("$PersistentPanel_content", "css/background")

  # The control's content.
  content: Control.chain("$PersistentPanel_content", "content", ->
    @checkForSizeChange()
  )

  # True if the control is currently docked to the top of the viewport.
  docked: Control.chain("applyClass/docked")
  initialize: ->
    self = this
    @on("layout", ->
      self._recalc()  if self.inDocument()
    ).inDocument ->
      
      # No scrolling parent has been set; look for one.
      @scrollingParent @_findScrollingParent()  unless @scrollingParent()
      @_recalc()

    $(window).resize ->
      self._recalc()


  # The content's padding. See top notes.
  padding: Control.chain("$PersistentPanel_content", "css/padding")

  # The parent of this control used to determine whether the control is
  # in or out of view. The default value for this property is the closest
  # parent element with overflow-y set to "auto" or "scroll".
  scrollingParent: Control.property((scrollingParent) ->
    self = this
    $(scrollingParent).scroll ->
      self._recalc()

  )
  _adjustSizes: ->
    
    # Make the panel the same width as the container.
    @$PersistentPanel_content().width @width()
    
    # Make the container the same height as the panel, so that when
    # the panel pops out in fixed mode, the container can continue
    # to occupy the same amount of vertical space.
    @height @$PersistentPanel_content().outerHeight(true)

  # Determine which parent of the control scrolls vertically.
  _findScrollingParent: ->
    
    # By default, assume the window is what is scrolling.
    scrollingParent = window
    parents = @parents()
    i = 0

    while i < parents.length

      # It doesn't appear possible to bind to the scroll event
      # for the document body. Instead, if the body is the
      # scrolling parent, we use the window instead, which has
      # the same effect.
      break  if parents[i] is document.body
      overflowY = parents.eq(i).css("overflow-y")
      if overflowY is "auto" or overflowY is "scroll"
        
        # Found a parent that explicitly asks for scrolling; use that.
        scrollingParent = parents[i]
        break
      i++
    scrollingParent

  # Do the real work of the control: determine whether the panel contents
  # should flow with the document, or pop out into a docked position at the
  # top or bottom of the viewport.
  _recalc: ->
    scrollingParent = @scrollingParent()
    if scrollingParent
      isScrollingParentWindow = (scrollingParent is window)
      $scrollingParent = $(scrollingParent)
      scrollTop = $scrollingParent.scrollTop()
      containerTop = @position().top
      aboveViewPort = (containerTop < scrollTop)
      scrollBottom = scrollTop + $scrollingParent.height()
      containerBottom = containerTop + @height()
      belowViewPort = (containerBottom > scrollBottom)
      dock = (aboveViewPort or belowViewPort)
      if dock

        # Docking the content puts it outside the normal document.
        # The control (the outer container) will collapse in size,
        # which we don't want to happen -- anything below the control
        # will suddenly jump in position. To ensure smooth movement,
        # we force the control and content to match sizes.
        # 
        # We first set the content's width to match the container's
        # width. This may cause the content to change in height.
        # We then set the container's height to match the content's.
        @$PersistentPanel_content().width @width()
        @height @$PersistentPanel_content().outerHeight(true)
        css = undefined
        viewPortTop = (if isScrollingParentWindow then 0 else $scrollingParent.offset().top)
        if aboveViewPort
          css = top: viewPortTop + "px"
        else
          viewPortBottom = (if isScrollingParentWindow then 0 else viewPortTop + $scrollingParent.height())
          css = bottom: viewPortBottom
        @$PersistentPanel_content().css css
      else
        
        # Reset any dimensions we set while docked.
        @$PersistentPanel_content().css
          bottom: ""
          top: ""
          width: ""

        @css "height", ""
      @docked dock


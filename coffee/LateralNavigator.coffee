###
Lets user navigate content by moving left (backward) and right (forward).
###

class window.LateralNavigator extends Control

  inherited:
    class: "center"
    content:
      control: HorizontalPanels
      ref: "panels"
      content:
        html: "div"
        ref: "LateralNavigator_content"
      left:
        control: BasicButton
        ref: "LateralNavigator_previousButton"
        class: "navigatorButton quiet"
        content: "&#9664;"
      right:
        control: BasicButton
        ref: "LateralNavigator_nextButton"
        class: "navigatorButton quiet"
        content: "&#9654;"
      tabindex: -1 # To get keyboard events
    generic: true

  # If set to "center" (the default), the main content panel and side panels
  # will be vertically centered. If set to "top", the panels will be top-
  # aligned.
  align: ( align ) ->
    @toggleClass "center", ( align == "center" )
    @

  # True if it's possible to navigate forward.
  # The default implementation always returns true. Subclasses can override this
  # to provide custom logic.
  canGoNext: -> true

  # True if it's possible to navigate backward.
  # The default implementation always returns true. Subclasses can override this
  # to provide custom logic.
  canGoPrevious: -> true

  # The content for the current position in the sequence.
  content: Control.chain( "$LateralNavigator_content", "content", ->
    @_updateButtons()
  )

  # The control class used to render the content.
  contentClass: Control.property.class ( contentClass ) ->
    $new = @$LateralNavigator_content().transmute contentClass, true
    @referencedElement "LateralNavigator_content", $new

  initialize: ->
    @$LateralNavigator_previousButton().click => @_previousClick()
    @$LateralNavigator_nextButton().click => @_nextClick()
    @on
      keydown: ( event ) =>
        switch event.which
          when 37 # Left
            if !@$LateralNavigator_previousButton().disabled()
              @_previousClick()
          when 39 # Right
            if !@$LateralNavigator_nextButton().disabled()
              @_nextClick()
      sizeChanged: =>
        # HACK: Shouldn't need to directly reference HorizontalPanel elements.
        this.$panels().$SimpleFlexBox_panel1().checkForSizeChange();
        this.$panels().$SimpleFlexBox_panel2().checkForSizeChange();
    @_updateButtons()

  # Move forward.
  # The default implementation does nothing.
  next: ->

  # The content of the "Next" button. Default is a right-pointing arrow.
  nextButtonContent: Control.chain "$LateralNavigator_nextButton", "content"

  # True if the Next button should be disabled. Default is false.
  nextButtonDisabled: Control.chain "$LateralNavigator_nextButton", "disabled"

  # Move backward.
  # The default implementation does nothing.
  previous: ->

  # The content of the "Previous" button. Default is a left-pointing arrow.
  previousButtonContent: Control.chain "$LateralNavigator_previousButton", "content"

  # True if the Previous button should be disabled. Default is false.
  previousButtonDisabled: Control.chain "$LateralNavigator_previousButton", "disabled"

  _nextClick: ->
    @next()
    @_updateButtons()
    @trigger "next"

  _previousClick: ->
    @previous()
    @_updateButtons()
    @trigger "previous"

  _updateButtons: ->
    @nextButtonDisabled !@canGoNext()
    @previousButtonDisabled !@canGoPrevious()

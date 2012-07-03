class window.SequenceNavigator extends LateralNavigator

  canGoNext: ->
    @$LateralNavigator_content().activeIndex() < @controls().length - 1

  canGoPrevious: ->
    @$LateralNavigator_content().activeIndex() > 0

  # The set of elements being navigated
  controls: Control.chain "$LateralNavigator_content", "controls"

  initialize: ->
    if @contentClass() is undefined
      @contentClass
        control: Modes
        maximize: true

  next: -> @$LateralNavigator_content().next()

  previous: -> @$LateralNavigator_content().previous()

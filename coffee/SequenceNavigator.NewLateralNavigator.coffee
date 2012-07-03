class window.SequenceNavigator extends NewLateralNavigator

  canGoNext: ->
    @$NewLateralNavigator_content().activeIndex() < @controls().length - 1

  canGoPrevious: ->
    @$NewLateralNavigator_content().activeIndex() > 0

  # The set of elements being navigated
  controls: Control.chain "$NewLateralNavigator_content", "controls"

  initialize: ->
    if @contentClass() is undefined
      @contentClass
        control: Modes
        maximize: true

  next: -> @$NewLateralNavigator_content().next()

  previous: -> @$NewLateralNavigator_content().previous()

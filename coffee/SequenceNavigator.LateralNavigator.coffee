###
Navigates left and right through its children.
###

class window.SequenceNavigator extends LateralNavigator

  inherited:
    contentClass: Modes

  canGoNext: ->
    @$LateralNavigator_content().activeIndex() < @elements().length - 1

  canGoPrevious: ->
    @$LateralNavigator_content().activeIndex() > 0

  # The set of elements being navigated.
  elements: Control.chain "$LateralNavigator_content", "elements"

  initialize: ->
    if @contentClass() is undefined
      @contentClass
        control: Modes
        maximize: true

  next: -> @$LateralNavigator_content().next()

  previous: -> @$LateralNavigator_content().previous()

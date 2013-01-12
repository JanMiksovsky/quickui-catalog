###
An overlay for a modal dialog which absorbs all clicks.
###

class window.ModalOverlay extends Overlay

  initialize: ->
    @on
      click: (event) =>
        # When a ModalOverlay is invoked by a Dialog, the Popup itself will
        # ignore mouse clicks anyway. We still absorb mouse clicks here in case
        # the ModalOverlay were to be used in some context other than a Popup.
        event.stopPropagation()

      "DOMMouseScroll mousewheel": (event) =>
        # Prevent wheel scrolls over overlay from scrolling the underlying page,
        # which is sort of disconcerting when a modal dialog is up.
        event.preventDefault()

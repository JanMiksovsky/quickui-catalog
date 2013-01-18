###
A link in a mobile application, typically in a list.
After a tap, the link will hold a "tapFeedback" for a short duration.
###

class window.MobileLink extends Link

  initialize: ->
    this.click =>
      @addClass "tapFeedback"
      setTimeout ( => @removeClass "tapFeedback" ), 250

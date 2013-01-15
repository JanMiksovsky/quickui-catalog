###
A message which briefly appears on a page before automatically disappearing. 
###

class window.TransientMessage extends Control

  inherited:
    generic: "true"

  # Close display of the message normally.
  close: ->
    @fadeOut null, => @_close()
    @

  # The time before the message begins to fade out.
  # 
  # If undefined (the default value), the duration will be calculated from
  # the length of the message. If negative, the message will not
  # automatically be closed, but can be closed by invoking close().
  duration: Control.property()
  
  initialize: ->
    @click => @_close()

  # Show the message.
  open: ->
    duration = @duration()
    unless duration
      content = @content()
      length = ( if ( typeof content is "string" ) then content.length else $( content ).text().length )
      duration = 750 + ( length * 20 )
    if duration >= 0
      timeout = setTimeout(  =>
        @close()
      , duration )
      @_timeout timeout
    @positionMessage().fadeIn() # TODO: Investigate why this doesn't actually fade in.
    this

  # Position the message. By default, this is center-aligned at the top
  # of the page.
  positionMessage: ->
    @css left: ( $( window ).width() - @outerWidth() ) / 2

  #
  # Show the given content for the indicated (optional) duration.
  #     
  @showMessage: ( content, duration ) ->
    transientMessage = TransientMessage.create()
    transientMessage.content content  if content
    transientMessage.duration duration  if duration
    $( document.body ).append transientMessage
    transientMessage.open()
    transientMessage

  _close: ->
    timeout = @_timeout()
    if timeout
      clearTimeout timeout
      @_timeout null
    @remove()

  _timeout: Control.property()

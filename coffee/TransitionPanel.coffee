###
When updating its content, shows a transition between the old content and the
new content.
###

class window.TransitionPanel extends Control

  inherited:
    content: [
      { html: "div", ref: "TransitionPanel_content" }
      { html: "div", ref: "TransitionPanel_old" }
    ]

  # The content shown in the panel.
  content: ( content ) ->
    if content is undefined
      @$TransitionPanel_content().content()
    else
      # TODO: Should make this test more sophisticated.
      if content[0] is @$TransitionPanel_content().content()[0]
        # Setting content to the same object(s), so skip transition.
        @$TransitionPanel_content().content content
      else
        @_transitionToContent content
      @

  # Transition to the indicated content
  _transitionToContent: ( content ) ->

    $new = @$TransitionPanel_content()
    $old = @$TransitionPanel_old()
    $existingContents = $new.contents()

    # Move the existing content to the "old" container.
    $old
      .append( $existingContents )
      .show()
    # Fade in the new content.
    $new
      .hide()
      .content( content )
      .fadeIn( "fast" )
    $old.fadeOut "fast", ->
      # Remove the old content when we've finished fading it out.
      $existingContents.detach()

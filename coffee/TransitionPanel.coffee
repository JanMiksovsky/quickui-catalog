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
        # Apply the desired transition.
        @_applyTransition content
      @

  # Fade from old content to new content.
  crossfade: ( $old, $new, callback ) ->
    $new.fadeIn( "fast" )
    $old.fadeOut "fast", callback

  # The effect to apply. The default is "crossfade"
  transition: Control.property( null, "crossfade" )

  # Apply the desired transition.
  _applyTransition: ( content ) ->

    $new = @$TransitionPanel_content()
    $old = @$TransitionPanel_old()
    $existingContents = $new.contents()

    # Move the existing content to the "old" container.
    $old
      .append( $existingContents )
      .show()

    # Insert the new content, but keep it hidden for now.
    $new
      .hide()
      .content( content )

    # Invoke the transition
    transitionFn = @[ @transition() ]
    callback = ->
      # Remove the old content when the transition completes.
      $existingContents.detach()
    transitionFn.call @, $old, $new, callback

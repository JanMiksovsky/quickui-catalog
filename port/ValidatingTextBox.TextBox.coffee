###
Validates textual input using an asymmetric validation scheme.
This applies a validation function while the user is typing, when the
control loses focus, or when a validate() method is called.

The validation is considered asymmetric because the control behaves differently
in an error state than when not in an error state:
1. If the control is not yet in an error state, the control's validity is not
reflected until the focus leaves the control. That is, the input is assumed
to be good until the user has moved on.
2. If the control is already in an error state, the control's validity is
reflected immediately upon detecting valid input. That is, the error is
forgiven without requiring that the user moves the focus away.

For more discussion: http://miksovsky.blogs.com/flowstate/2010/09/index.html.
###

class window.ValidatingTextBox extends TextBox

  inherited:
    generic: "true"

  # The control's content. Setting this implicitly performs validation.
  content: ( content ) ->
    result = super content
    if content isnt undefined and @validateOnSet()
      @validate true
    result

  initialize: ->
    @on
      blur: =>
        if @validateOnBlur()
          @validate true
      keyup: => @validate()

  invalid: Control.chain "applyClass/invalid"

  # True if the text box must be non-empty to be valid.
  required: Control.property.bool()

  # Returns true if the control's contents are valid.
  # The default implementation simply looks as the required() property and,
  # if true, ensures the content is non-empty.
  # Subclasses can override this to validate their contents. E.g.:
  # 
  #      valid: function() {
  #          var valid = this._super();
  #          valid = valid && ... Perform additional checks here ...
  #          return valid;
  #      }
  #
  valid: ->
    if @required()
      ( @content()?.length > 0 )
    else
      true

  # Check to see if the control's contents are valid.
  # 
  # If the strict parameter is true, apply the invalid state if the contents
  # are invalid. If the strict parameter is false, then the control can move
  # out of the invalid state (if the contents are now valid), but won't move
  # into the invalid state (even if the contents are actually invalid).
  validate: Control.iterator ( strict ) ->
    valid = @valid()
    if strict or @invalid()
      @invalid not valid

  # True if validation should be automatically be performed when the control
  # loses focus. Default is true.
  validateOnBlur: Control.property.bool( null, true )

  # True if validation should be automatically be performed when the control's
  # content is set programmatically. Default is true.
  validateOnSet: Control.property.bool( null, true )

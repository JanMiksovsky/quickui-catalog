###
A control with separate edit and read modes. 
###

class window.Editable extends Modes

  inherited:
    content: [
      html: "<div tabindex=\"-1\" />"
      ref: "Editable_read"
    ,
      html: "<div/>"
      ref: "Editable_edit"
    ]
    generic: "true"

  # Cancel any pending changes and revert to read mode.
  cancel: Control.iterator ->
    @editing false

  # The current content in either mode.
  content: ( value ) ->
    if @editing()
      @_editContent value
    else
      @_readContent value

  # The class of the content in edit mode. This class is not instantiated until
  # editing() is set to true for the first time.
  editClass: Control.property.class ( editClass ) ->
    if @editing()
      # Transmute the edit control to the new class.
      @_ensureEditControl()

  # The control used for editing.
  editControl: Control.chain "$Editable_edit"

  # True if the control is in edit mode, false if in read mode. By default, this
  # is false.
  editing: Control.chain( "applyClass/editing", ( editing ) ->
    if editing is undefined
      # Getter
      @_editing()
    else      
      # Setter
      for control in @segments()
        if editing
          # Switch to edit mode.
          # Copy content from read to edit mode. This will create the edit
          # control if necessary.
          control._editContent control._readContent()
          control.activeElement control.$Editable_edit()
        else
          # Switch to read mode.
          control.activeElement control.$Editable_read()
          control.readControl().focus()
  )
  
  # The class of the content in read mode. 
  readClass: Control.property.class ( readClass ) ->
    $new = @$Editable_read().transmute readClass, true
    @referencedElement "Editable_read", $new

  # The control used for reading.
  readControl: Control.chain "$Editable_read"

  # Save changes and return to read mode.
  save: Control.iterator ->
    @_readContent @_editContent()
    @editing false
  
  # The content of the edit portion 
  _editContent: ( content ) ->
    @_ensureEditControl()
    @$Editable_edit().content content

  _createEditControl: ->
    editClass = @editClass()
    $new = @$Editable_edit().transmute editClass, true
    @referencedElement "Editable_edit", $new

  # Make sure we have an edit control of the desired class. If not, create one.
  _ensureEditControl: ->
    currentClass = @$Editable_edit().controlClass()
    desiredClass = @editClass()
    if desiredClass isnt currentClass
      @_createEditControl()
  
  # The content of the read portion 
  _readContent: ( content ) ->
    if content is undefined
      result = @$Editable_read().content()
      if result instanceof jQuery and result.length == 0
        # Convert empty jQuery array to null.
        null
      else
        result
    else
      @$Editable_read().content content
      @

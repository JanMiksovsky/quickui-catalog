# A text region that can be clicked to edit its contents. 
EditableText = Editable.sub(
  className: "EditableText"
  inherited:
    editClass: "TextBox"
)
EditableText::extend
  
  #
  #	 * True if the pressing Escape in edit mode cancels edit mode.
  #	 * The default is true.
  #	 
  cancelOnEscape: Control.property(null, true)
  editing: (editing) ->
    result = @_super(editing)
    
    # Switching to edit mode; put focus in the text box.
    @editControl().find("input").andSelf().focus()  if editing
    result

  
  #
  #     * True if the control should switch to editing mode when it's clicked.
  #     * Default is true.
  #     
  editOnClick: Control.property(null, true)
  initialize: ->
    self = this
    @on click: ->
      self.editing true  if self.editOnClick() and not self.editing()


  
  #
  #     * True if pressing the Enter key in edit mode saves changes and switches
  #     * back to read mode. The default is true.
  #     
  saveOnEnter: Control.property(null, true)
  _createEditControl: ->
    result = @_super()
    
    # Wire up events bound to input elements.
    self = this
    @editControl().find("input").andSelf().on
      blur: ->
        
        # Implicitly save when control loses focus.
        self.save()  if self.editing()

      keydown: (event) ->
        if self.editing()
          switch event.which
            when 13 # Enter
              if self.saveOnEnter()
                self.save()
                event.preventDefault()
            when 27 # Escape
              self.cancel()  if self.cancelOnEscape()

    result


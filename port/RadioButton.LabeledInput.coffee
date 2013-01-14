###
A labeled radio button.
###

window.RadioButton = LabeledInput.sub(
  className: "RadioButton"
  inherited:
    _type: "radio"
)
RadioButton::extend

  # True if the control should automatically select a name() property value
  # if no name is specified. This automatic name will match the name of other
  # autonamed sibling radio buttons, allowing them to work as a radio button
  # group without the need for an explicit name.
  autoName: Control.property.bool(null, true, ->
    @_checkName()
  )
  initialize: ->
    @inDocument ->
      @_checkName()


  # The text name of the radio button group.
  # 
  # You can set the name() of all radio buttons in the same group to the same
  # value to ensure the radio buttons are mutually exclusive. Alternatively,
  # you can rely on the autoName() property to automatically select a name
  # which will group the control with auto-named sibiling radio buttons.
  name: Control.chain("_inputControl", "prop/name", ->
    @_checkName()
  )
  _checkName: ->
    if @inDocument() and @autoName() and not @name()

      # Pick a name.
      # First look for an autonamed sibling.
      named = undefined
      @siblings().eachControl (index, control) ->
        if control instanceof RadioButton and control.autoName() and control.name()
          named = control
          false

      # Use sibling's name. 
      name = (if named then named.name() else RadioButton.generateUniqueName()) # Generate a name.
      @name name

# Class members 
RadioButton.extend
  generateUniqueName: ->
    "_group" + @_count++

  _count: 0


###
Lets user pick a date with a date-optimzed text box or a navigable month calendar.
###

class window.DateComboBox extends ComboBox

  inherited:
    textBoxClass: "DateTextBox"
    popup: [
      control: "CalendarMonthNavigator"
      ref: "navigator"
    ]

  # The control's current culture.
  culture: ( culture ) ->
    result = super culture
    if culture isnt undefined
      @$navigator().culture culture
      @textBox().culture culture  if $.isFunction( @textBox().culture )
    result

  # The date indicated in the control.
  date: Control.property( ( date ) ->
    time = date and date.getTime()
    textBoxDate = @$ComboBox_content().date()
    @$ComboBox_content().date date  if not textBoxDate or textBoxDate.getTime() isnt time
    
    # Navigator can only handle non-null dates.
    if date
      navigatorDate = @$navigator().date()
      @$navigator().date date  if not navigatorDate or navigatorDate.getTime() isnt time
  )
  initialize: ->
    
    # Sync up dates
    @date @$navigator().date()
    
    # Changing text updates navigator, and vice versa.
    @on
      dateChanged: ( event, date ) => @date date
      dateSelected: ( event, date ) =>
        @date date
        @close()

  # The class used for the dropdown portion of the combo box.
  # By default this is a CalendarMonthNavigator, but it can be set to any
  # class that exposes a date() property.
  navigatorClass: Control.chain( "$navigator", "transmute" )

  # True if the user must enter a value in this field.
  required: Control.chain( "$ComboBox_content", "required" )
  
  # Hint for documentation tools.
  _requiredClasses: ["DateTextBox"]


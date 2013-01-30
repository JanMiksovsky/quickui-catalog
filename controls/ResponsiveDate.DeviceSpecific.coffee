###
A device-responsive date picker.
On full browsers, this renders as a date combo box. On mobile browsers, this
renders as a text box that leverages the device's native date picker.
###

class window.ResponsiveDate extends DeviceSpecific

  inherited:
    mobileClass: "MobileDateTextBox"
    defaultClass: "DateComboBox"

  # The date shown in the text box.
  date: Control.chain "$placeholder", "date"

  # Hint for documentation tools
  _requiredClasses: [ "DateComboBox", "MobileDateTextBox" ]

###
A mobile-optimzed date text box.
This leverages the device's native date picker UI.
###

class window.MobileDateTextBox extends TextBox

  inherited:
    prop:
      type: "date"

  # The date shown in the text box.
  date: Control.iterator ( date ) ->
    if date is undefined
      content = @content()
      if content
        @_convertRfc3339ToJavaScriptDate content
      else
        null
    else
      @content @_convertJavaScriptDateToRfc3339 date

  # Convert a JavaScript date object to the format required by the HTML date
  # input element.
  _convertJavaScriptDateToRfc3339: ( date ) ->
    isoDate = date.toISOString()
    parts = isoDate.split "T"
    parts[0]

  # Convert from the RFC 3339 date format (like "2013-31-1") used by an
  # HTML date input element to a JavaScript Date object.
  _convertRfc3339ToJavaScriptDate: ( rfc3339date ) ->
    parts = rfc3339date.split "-"
    date = new Date()
    date.setFullYear parseInt parts[0]
    date.setMonth parseInt parts[1] - 1
    date.setDate parseInt parts[2]
    date.setHours 0
    date.setMinutes 0
    date.setSeconds 0
    date.setMilliseconds 0
    date

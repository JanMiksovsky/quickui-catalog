###
The name of the current month, globalized. 
###

class window.MonthName extends Control

  tag: "span"

  # The control's current culture.
  culture: ( culture ) ->
    result = super culture
    if culture isnt undefined
      @month @month()
    result

  initialize: ->
    unless @month()
      today = new Date()
      @month today.getMonth()

  # The index of the month to show: 0 = January, 1 = February, etc.
  month: Control.property ( month ) ->
    culture = @culture()
    monthNameEnum = if culture then culture.calendar.months.names else MonthName.names
    @content monthNameEnum[ month ]

  # Default names, used if Globalize is not avaialble.
  @names: [
    "January"
    "February"
    "March"
    "April"
    "May"
    "June"
    "July"
    "August"
    "September"
    "October"
    "November"
    "December"
  ]

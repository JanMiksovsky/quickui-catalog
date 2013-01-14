# The name of the current month, globalized. 
window.MonthName = Control.sub(
  className: "MonthName"
  tag: "span"
)
MonthName::extend
  
  #
  #     * The control's current culture.
  #     
  culture: (culture) ->
    result = @_super(culture)
    @month @month()  if culture isnt `undefined`
    result

  initialize: ->
    unless @month()
      today = new Date()
      @month today.getMonth()

  
  #
  #     * The index of the month to show: 0 = January, 1 = February, etc.
  #     
  month: Control.property((month) ->
    culture = @culture()
    monthNameEnum = (if culture then culture.calendar.months.names else MonthName.names)
    @content monthNameEnum[month]
  )


# Class methods

# Default names, used if Globalize is not avaialble.
MonthName.extend names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

###
Heading for a 7 day week calendar, globalized. 
###

class window.DaysOfWeek extends Control

  inherited:
    content: " <div class=\"dayOfWeek\" /> <div class=\"dayOfWeek\" /> <div class=\"dayOfWeek\" /> <div class=\"dayOfWeek\" /> <div class=\"dayOfWeek\" /> <div class=\"dayOfWeek\" /> <div class=\"dayOfWeek\" /> "
    generic: "true"

  # The control's current culture.
  culture: (culture) ->
    result = @_super(culture)
    @format @format()  if culture isnt undefined
    result

  # The format used to show the names of the day. These are defined by
  # the Globalize library:
  # 
  #  "names": the full name, e.g. "Sunday".
  #  "namesAbbreviated": an abbreviated name, e.g., "Sun".
  #  "namesShort": an even shorter name, e.g., "Su".
  format: Control.property((format) ->
    culture = @culture()
    dayNameEnum = (if culture then culture.calendar.days else DaysOfWeek.days)
    dayNames = dayNameEnum[format]
    firstDay = (if culture then culture.calendar.firstDay else 0)
    $children = @children()
    i = 0

    while i < dayNames.length
      day = (i + firstDay) % 7
      dayName = dayNames[day]
      $children.eq(i).content dayName
      i++
  )

  initialize: ->
    @format "namesAbbr"  unless @format()
  
  # Default full day names. Used if Globalize is not loaded.
  @names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  
  # Default abbreviated day names. Used if Globalize is not loaded.
  @namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
  # Default shortest day names. Used if Globalize is not loaded.
  @namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

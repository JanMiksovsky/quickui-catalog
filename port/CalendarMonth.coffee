###
A month in a calendar 
###

class window.CalendarMonth extends Control

  inherited:
    content: [
      control: "CalendarWeek"
    ,
      control: "CalendarWeek"
    ,
      control: "CalendarWeek"
    ,
      control: "CalendarWeek"
    ,
      control: "CalendarWeek"
    ,
      control: "CalendarWeek"
    ]
    generic: "true"

  days: Control.chain "find/.CalendarDay", "control"
  weeks: Control.chain "children", "control"

  # The control's current culture.
  culture: ( culture ) ->
    result = super culture
    if culture isnt undefined
      @weeks().culture culture
      @_refresh()
    result

  # The class used to represent days in the month.
  dayClass: Control.chain( "weeks", "dayClass", ->
    @_refresh()
  )

  # The date that will be included in this month (can be any day of the month).
  date: Control.property.date ->
    @_refresh().trigger "dateChanged", [ @date() ]
  
  # Return the day control for the given date.
  dayControlForDate: ( date ) ->
    @weekControlForDate( date ).dayControlForDate date

  initialize: ->
    unless @date()?
      # By default, show current month.
      @date CalendarDay.today()

  # Returns the week control for the given date.
  weekControlForDate: ( date ) ->
    # TODO: Return null if date is not within this month.
    weeksWithDate = ( for month in @segments()
      weeks = month.weeks()
      firstDayOfMonth = new Date date.getTime()
      firstDayOfMonth.setDate 1
      offset = weeks.daysSinceFirstDayOfWeek firstDayOfMonth
      weekIndex = Math.floor ( date.getDate() + offset - 1 ) / 7
      weeks[ weekIndex ]
    )
    $().add( weeksWithDate ).control()

  _refresh: ->
    
    # Use midnight on the given date as a reference point.
    firstDayOfMonth = CalendarDay.midnightOnDate @date()
    firstDayOfMonth.setDate 1
    
    # Get last day of month by going to first day of next month and backing up a day.
    lastDayOfMonth = new Date firstDayOfMonth.getTime()
    lastDayOfMonth.setMonth lastDayOfMonth.getMonth() + 1
    lastDayOfMonth.setDate lastDayOfMonth.getDate() - 1
    
    # Fill in the weeks.
    month = firstDayOfMonth.getMonth()
    for week, i in @weeks().segments()
      week.date CalendarDay.addDays firstDayOfMonth, 7 * i      
      # Hide weeks completely in another month (i.e., the next month).
      # Apply "hidden" class to preserve week's original "display" property.
      days = week.days()
      firstDayOfWeek = days.eq( 0 ).date()
      lastDayOfWeek = days.eq( 6 ).date()
      isWeekInMonth = ( firstDayOfWeek.getMonth() is month or lastDayOfWeek.getMonth() is month )
      week.toggleClass "hidden", not isWeekInMonth
    
    # Paint days inside and outside range.
    for day in @days().segments()
      date = day.date()
      insideMonth = ( date? and date >= firstDayOfMonth and date <= lastDayOfMonth )
      day.toggleClass "insideMonth", insideMonth
      day.toggleClass "outsideMonth", not insideMonth

    this

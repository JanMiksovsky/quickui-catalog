###
Shows a single calendar week 
###

class window.CalendarWeek extends Control

  inherited:
    content: [
      control: "CalendarDay"
      class: "firstDayOfWeek"
    ,
      control: "CalendarDay"
    ,
      control: "CalendarDay"
    ,
      control: "CalendarDay"
    ,
      control: "CalendarDay"
    ,
      control: "CalendarDay"
    ,
      control: "CalendarDay"
      class: "lastDayOfWeek"
    ]

  # The control's current culture.
  culture: ( culture ) ->
    result = super culture
    @_refresh()  if culture isnt undefined
    result

  # The date that will be included in this week (can be any day of the week).
  date: Control.property.date( ->
    @_refresh()
  )

  # Returns the control currently used to represent the given date.
  dayControlForDate: ( date ) ->
    
    # TODO: Return null if date is not within this week.
    days = @map( ( index, week ) ->
      $week = $( week ).control()
      dayIndex = $week.daysSinceFirstDayOfWeek( date )
      $week.days()[dayIndex]
    )
    days = $().add( days ).control()
    days

  # The class used to represent days in the week.
  dayClass: Control.iterator( ( dayClass ) ->
    if dayClass is undefined
      @days().constructor
    else
      @days().transmute dayClass
      days = @days()
      days.eq( 0 ).addClass "firstDayOfWeek"
      days.eq( 6 ).addClass "lastDayOfWeek"
      @_refresh()
  )
  
  # The collection of day cells 
  days: Control.chain "children", "control"
  initialize: ->
    
    # Default date range is the current week.
    @date CalendarDay.today()  unless @date()

  daysSinceFirstDayOfWeek: ( date ) ->
    firstDayOfWeek = @firstDayOfWeek()
    ( date.getDay() - firstDayOfWeek + 7 ) % 7

  
  # Return the index of the "first" day of the week in the current culture.
  # In the U.S., this is 0 ( Sunday ), but in many places it's 1 (Monday).
  firstDayOfWeek: ->
    culture = @culture()
    ( if culture then culture.calendar.firstDay else 0 )

  # Set the dates on all controls in the week.
  _refresh: ->
    
    # Use midnight on the given date as a reference point.
    date = CalendarDay.midnightOnDate( @date() )
    
    # Get the first day of the week containing this date (e.g., Sunday).
    dateStart = CalendarDay.addDays( date, -@daysSinceFirstDayOfWeek( date ) )
    
    # Fill in the date range.
    @days().eachControl ( index, $day ) ->
      $day.date CalendarDay.addDays( dateStart, index )


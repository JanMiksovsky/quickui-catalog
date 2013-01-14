###
A single day in a calendar 
###

class window.CalendarDay extends Control
  className: "CalendarDay"
  inherited:
    generic: "true"


  alternateMonth: Control.chain("applyClass/alternateMonth")
  firstDayOfMonth: Control.chain("applyClass/firstDayOfMonth")
  firstWeek: Control.chain("applyClass/firstWeek")
  future: Control.chain("applyClass/future")
  lastDayOfMonth: Control.chain("applyClass/lastDayOfMonth")
  past: Control.chain("applyClass/past")
  saturday: Control.chain("applyClass/saturday")
  sunday: Control.chain("applyClass/sunday")
  today: Control.chain("applyClass/today")
  weekday: Control.chain("applyClass/weekday")

  # The date to show.
  date: Control.property.date((date) ->
    today = CalendarDay.today()
    dayOfWeek = date.getDay()
    dayOfMonth = date.getDate()
    nextDate = CalendarDay.addDays(date, 1)
    daysFromToday = Math.round((date.getTime() - today.getTime()) / CalendarDay.MILLISECONDS_IN_DAY)
    @past(date < today).future(date > today).firstDayOfMonth(dayOfMonth is 1).lastDayOfMonth(date.getMonth() isnt nextDate.getMonth()).firstWeek(dayOfMonth <= 7).sunday(dayOfWeek is 0).saturday(dayOfWeek is 6).weekday(dayOfWeek > 0 and dayOfWeek < 6).today(daysFromToday is 0).alternateMonth(Math.abs(date.getMonth() - today.getMonth()) % 2 is 1).content date.getDate()
  )
  initialize: ->
    self = this
    @click (event) ->
      self.trigger "dateSelected", [self.date()]

    @date @_defaultDate()  unless @date()

  _defaultDate: ->
    CalendarDay.today()

# Class methods. These are general date utilities.
CalendarDay.extend
  MILLISECONDS_IN_DAY: 24 * 60 * 60 * 1000
  
  # Return the result of adding the specified number of days to the given date.
  addDays: (date, days) ->
    
    # Use noon hour for date math, since adding/subtracting multiples of 24 hours
    # starting from noon is guaranteed to end up on the correct date (although
    # the hours might have changed).
    noon = new Date(date.getTime())
    noon.setHours 11
    result = new Date(noon.getTime() + (days * @MILLISECONDS_IN_DAY))
    
    # Restore original hours
    result.setHours date.getHours()
    result

  midnightOnDate: (date) ->
    d = new Date(date.getTime())
    d.setHours 0
    d.setMinutes 0
    d.setSeconds 0
    d.setMilliseconds 0
    d

  today: ->
    @midnightOnDate new Date()


###
Shows a month, allowing using to navigate months and select a date.
###

class window.CalendarMonthNavigator extends Control

  inherited:
    content: [
      {
        control: "LateralNavigator"
        ref: "navigator"
        align: "center"
        content:
          control: "MonthAndYear", ref: "monthHeading"
      }
      {
        control: "CalendarMonthWithHeadings"
        ref: "calendar"
        showMonthAndYear: false
      }
      {
        html: "div"
        ref: "todayContainer"
        content:
          control: "BasicButton"
          ref: "buttonToday"
          class: "quiet"
          content: "Today"
      }
    ]
    generic: true

  # The control's current culture.
  culture: ( culture ) ->
    result = super culture
    if culture isnt undefined
      @$monthHeading().culture culture
      @$calendar().culture culture
    result

  # The date that will be included in the month (can be any day of the month).
  date: Control.property ( date ) ->
    if @$calendar().date().getTime() isnt date.getTime()
      @$calendar().date date
    @$monthHeading().date date
    @_applySelection()

  # The class used to represent days in the month.
  dayClass: Control.property.class ( dayClass ) ->
    @$calendar().dayClass dayClass

  # The format used to show day headings. See DaysOfWeek.
  dayNameFormat: Control.chain "$calendar", "dayNameFormat"

  initialize: ->
    @on
      dateChanged: ( event, date ) => @date date
      dateSelected: ( event, date ) => @$calendar().date date
    @$navigator().on
      next: => @next()
      previous: => @previous()
    @$buttonToday().click => @trigger "dateSelected", [ CalendarDay.today() ]
    @dayClass CalendarDayButton unless @dayClass()
    @date @$calendar().date() unless @date()

  # Show the next month.
  next: -> @_adjustMonth 1

  # The content of the "Next" button.
  # By default, this is a right-pointing arrow.
  nextButtonContent: Control.chain "$navigator", "nextButtonContent"

  # True if the Next button should be disabled. Default is false.
  nextButtonDisabled: Control.chain "$navigator", "nextButtonDisabled"

  # Show the previous month.
  previous: -> @_adjustMonth -1

  # The content of the "Previous" button.
  # By default, this is a left-pointing arrow.
  previousButtonContent: Control.chain "$navigator", "previousButtonContent"

  # True if the Previous button should be disabled. Default is false.
  previousButtonDisabled: Control.chain "$navigator", "previousButtonDisabled"

  # True if the selected date should have the "selected" style applied to it.
  showSelectedDate: Control.property.bool(
    ( showSelectedDate ) -> @_applySelection(),
    true
  )

  # True if the "Today" button should be shown.
  showTodayButton: Control.chain "$todayContainer", "visibility" 

  _adjustMonth: ( direction ) ->
    adjustment = ( if ( direction > 0 ) then 1 else -1 )
    newDate = new Date @date().getTime()
    dayOfMonth = newDate.getDate()
    newDate.setMonth newDate.getMonth() + adjustment
    newDate.setDate 0 if newDate.getDate() isnt dayOfMonth
    @date newDate

  _applySelection: ->
    @$calendar().$days().removeClass "selected"
    if @showSelectedDate()
      dayControl = @$calendar().dayControlForDate @date()
      dayControl.addClass "selected"

  # Hint for documentation tools
  _requiresClasses: [ "CalendarDayButton" ]

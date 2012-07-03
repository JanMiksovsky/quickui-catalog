###
Shows the most interesting photo for each day of a month

Note: This makes a *separate call* to Flickr's REST API for each day of the
month, which is terrible. Unfortunately, Flickr's API doesn't allow allow a way
to get the most interesting photo for each day of the month; separate calls have
to be made per day.
###

class window.FlickrInterestingNavigator extends CalendarMonthNavigator
  className: "FlickrInterestingNavigator"
  inherited:
    dayClass: "FlickrInterestingDay"
    dayNameFormat: "namesAbbr"
    generic: "false"
    previousButtonContent: [
      { html: "span", class: "chevron", content: "«" }
      " "
      { control: "MonthAndYear", ref: "previousMonthName", class: "monthButtonName" }
    ]
    nextButtonContent: [
      { control: "MonthAndYear", ref: "nextMonthName", class: "monthButtonName" }
      " "
      { html: "span", class: "chevron", content: "»" }
    ]
    showTodayButton: "false"

  culture: ( culture ) ->
    result = super culture
    if culture isnt undefined
      @$previousMonthName().culture culture
      @$nextMonthName().culture culture
    result

  date: ( date ) ->
    result = super date
    if date isnt undefined
      previousMonth = new Date date.getTime()
      previousMonth.setMonth previousMonth.getMonth() - 1
      @$previousMonthName()
        .date( previousMonth )
        .checkForSizeChange()
      nextMonth = new Date date.getTime()
      nextMonth.setMonth nextMonth.getMonth() + 1
      @$nextMonthName()
        .date( nextMonth )
        .checkForSizeChange()
      today = new Date()
      nextMonth.setDate 1
      @nextButtonDisabled nextMonth > today
      @$calendar().$days().loadPhoto()
    result
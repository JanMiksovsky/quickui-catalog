class window.MonthAndYear extends Control

  inherited:
    content: [
      { control: MonthName, ref: "monthName" }
      " "
      { html: "span", ref: "year" }
    ]
    generic: true

  # The control's current culture.
  culture: (culture) ->
    result = super culture
    if culture isnt undefined
      @$monthName().culture culture
    result
  
  # The date whose date and year will be shown.
  date: Control.property ( date ) ->
    @$monthName().month date.getMonth()
    @$year().content date.getFullYear()

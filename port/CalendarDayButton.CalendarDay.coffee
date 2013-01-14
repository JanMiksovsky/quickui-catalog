###
Shows a day of the month as a button. 
###

window.CalendarDayButton = CalendarDay.sub(
  className: "CalendarDayButton"
  inherited:
    content: [" ",
      control: "BasicButton"
      ref: "button"
      class: "quiet"
    , " "]
)
CalendarDayButton::extend content: Control.chain("$button", "content")

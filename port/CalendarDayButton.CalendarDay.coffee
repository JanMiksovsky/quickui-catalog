###
Shows a day of the month as a button. 
###

class window.CalendarDayButton extends CalendarDay
  className: "CalendarDayButton"
  inherited:
    content: [" ",
      control: "BasicButton"
      ref: "button"
      class: "quiet"
    , " "]

 content: Control.chain("$button", "content")

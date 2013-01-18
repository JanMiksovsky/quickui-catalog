function demoModes() {

var ResizableCalendar = Control.sub({
    className: "ResizableCalendar",
    inherited: {
        content: [
            {
                control: RadioButton,
                ref: "radioFull",
                content: "Full",
                checked: "true"
            },
            {
                control: RadioButton,
                ref: "radioCompact",
                content: "Compact"
            },
            {
                control: Modes,
                ref: "calendarModes",
                content: [
                    { control: CalendarMonthNavigator },
                    { control: DateComboBox }
                ],
                css: { "margin-top": "1em" }
            },
        ]
    },
    initialize: function() {
        var self = this;
        this.$radioFull().click( function( event ) {
            self.$calendarModes().activeIndex( 0 );
        });
        this.$radioCompact().click( function( event ) {
            self.$calendarModes().activeIndex( 1 );
        });
    }
});

$demo.append( ResizableCalendar.create() );

}

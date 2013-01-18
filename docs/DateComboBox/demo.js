function demoDateComboBox() {

// Use a custom icon from Iconic set — see notes.
var customIcon = "/catalog/resources/calendar_alt_fill_16x16.png";
var $icon = $( "<img>" ).prop( "src", customIcon );

$demo.append(
    DateComboBox.create()
        .dropdownButtonContent( $icon )
);

}

function demoTextCondenser() {

var $countries = Fader.create({
    content: [
        TextCondenser.create( "Austria" ),
        TextCondenser.create( "Bosnia and Herzegovina" ),
        TextCondenser.create( "Dominican Republic" ),
        TextCondenser.create( "Germany" ),
        TextCondenser.create( "Saint Vincent and the Grenadines" ),
        TextCondenser.create( "Trinidad and Tobago" ),
        TextCondenser.create( "United Republic of Tanzania" ),
        TextCondenser.create( "Viet Nam" )
    ],
    css: {
        "background-color": "#faf3ed",
        "font-family": "Open Sans",
        "font-size": "16px",
        "width": "160px"
    }
});

$countries.find( ".TextCondenser" ).control()
    .condensedFontFamily( "Open Sans Condensed" );

$demo.append( $countries );

}

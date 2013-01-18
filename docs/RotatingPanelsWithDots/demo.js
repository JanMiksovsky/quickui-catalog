function demoRotatingPanelsWithDots() {

// A sample of a given font.
var FontSample = Control.sub({
    className: "FontSample",
    inherited: {
        css: {
            "font-size": "64px",
            padding: "30px",
            "text-align": "center",
            "vertical-align": "middle"
        }
    },
    // Setting content also sets font.
    content: Control.property( function( content ) {
        var result = this.constructor.superclass.prototype.content.call( this, content );
        if ( content !== undefined ) {
            this.css( "font-family", content );
        }
        return result;
    })
});

// Rotate through some font samples.
$demo.append(
    RotatingPanelsWithDots.create({
        pageButtonClass: BlueDotButton,
        rotationInterval: 1500, // 1.5 seconds
        content: [
            FontSample.create( "Helvetica" ),
            FontSample.create( "Times" ),
            FontSample.create( "Tahoma" ),
            FontSample.create( "Trebuchet" ),
            FontSample.create( "Verdana" ),
        ]
    })
);

}

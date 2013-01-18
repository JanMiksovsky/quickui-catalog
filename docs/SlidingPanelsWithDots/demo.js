function demoSlidingPanelsWithDots() {

var $panels = SlidingPanelsWithDots.create({
    pageButtonClass: BlueDotButton,
    content: [
        "<div class='animal'>Bird</div>",
        "<div class='animal'>Cat</div>",
        "<div class='animal'>Dog</div>",
        "<div class='animal'>Fish</div>"
    ]
});

// For demo purposes, we'll style this through code.
$panels.find( ".animal" ).css({
    "font-size": "48px",
    "font-weight": "bold",
    "padding": "20px",
    "text-align": "center"
});

$demo.append( $panels );

}

function demoListInlay() {

// Create array of items with description and content.
var items = $.map(
    [
        "One", "Two", "Three", "Four", "Five",
        "Six", "Seven", "Eight", "Nine", "Ten"
    ],
    function( description ) {
        return {
            description: description,
            content: $("<p/>").append(
                FlickrInterestingPhoto.create({
                    photoSize: "t",
                    css: {
                        "float": "left",
                        "margin-right": "1em"
                    }
                }),
                LoremIpsum.create()
            )
        };
    }
);

// Show the items in a ListInlay.
$demo
    .css({
        height: "400px",
        "overflow-y": "auto"
     })
    .append(
        ListInlay.create()
            .items( items )
    );

}

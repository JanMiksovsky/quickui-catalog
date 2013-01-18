function demoMultiListInlay() {

// Create array of items with description and content.
var items = $.map(
    [
        "One", "Two", "Three", "Four", "Five",
        "Six", "Seven", "Eight", "Nine", "Ten"
    ],
    function( description ) {
        return {
            description: description,
            content: LoremIpsum.create()
        };
    }
);

// Show the items in a MultiListInlay.
$demo
    .css({
        height: "400px",
        "overflow-y": "scroll"
     })
    .append(
        MultiListInlay.create()
            .items( items )
    );

}

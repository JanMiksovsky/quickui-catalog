function demoMultiListInlay() {

// Create array of items with description and content.
var items = $.map(
    [
        "One", "Two", "Three", "Four", "Five"
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
    .append(
        MultiListInlay.create()
            .items( items )
    );

}

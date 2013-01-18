function demoList() {

// Create a list.
var $list = List.create({
    itemClass: SampleSpriteButton,
    click: function( event ) {
        // Clicking a button displays its content in an alert.
        var button = $( event.target ).closest( ".SampleSpriteButton" ).control();
        if ( button ) {
            alert( button.content() );
        }
    }
});

// Add the list to the DOM.
$demo.append(
    $list
);

// Sample data.
var data = [
    "One",
    "Two",
    "Three",
    "Four"
];

// Render each member of the array as a list item. In this case, the strings
// will get passed to the content() property of the SampleSpriteButton class.
$list.items( data );

}

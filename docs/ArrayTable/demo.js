function demoArrayTable() {

var cities = [
    [ "Tokyo", "Japan" ],
    [ "Jakarta", "Indonesia" ],
    [ "Seoul", "South Korea" ],
    [ "Delhi", "India" ],
    [ "Shanhai", "China" ]
];

$demo.append(
    ArrayTable.create().content( cities )
);

// Space out table cells.
// For demo purposes, we'll do this in code.
$demo.find( ".ArrayTable > * > *" )
    .css( "padding", "0 1em .5em 0" );

}

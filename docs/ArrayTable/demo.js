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

}

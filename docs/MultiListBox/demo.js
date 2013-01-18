function demoMultiListBox() {

var $animals = MultiListBox.create({
    items: [
        "Canary",
        "Cat",
        "Cockatiel",
        "Dog",
        "Ferret",
        "Finch",
        "Fish",
        "Guinea Pig",
        "Hamster",
        "Lizard",
        "Parakeet",
        "Parrot",
        "Rabbit",
        "Teal",
        "Turtle"
    ],
    width: "200px"
});
var $count = $( "<span>" );

$animals.on( "selectionChanged", function() {
    var count = $animals.selectedControls().length;
    $count.text( count );
});

$demo.append(
    $animals,
    "Selected items: ",
    $count
);

}

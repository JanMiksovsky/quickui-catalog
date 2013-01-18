function demoListBox() {

var $colors = ListBox.create({
    items: [
        "Blue",
        "DarkGreen",
        "DarkBlue",
        "DarkRed",
        "Gold",
        "Goldenrod",
        "Green",
        "LightGray",
        "LightSeaGreen",
        "LightSkyBlue",
        "Red",
        "Teal",
        "SteelBlue",
        "Yellow",
        "YellowGreen"
    ],
    height: "200px",
    width: "200px"
});
var $selectedColor = $( "<span>" );

$colors.on( "selectionChanged", function() {
    var color = $colors.selectedItem();
    $selectedColor.text( color );
});

$demo.append(
    $colors,
    "Selected color: ",
    $selectedColor
);

}

function demoSprite() {

var $sprite = Sprite.create({
    image: "url(/catalog/resources/sampleButtonStates.png)",
    currentCell: 4,
    cellHeight: 32
});

var $image = $( "<img src='/catalog/resources/sampleButtonStates.png' />" )
    .click( function( event ) {
        var mouseY = event.pageY - $( this ).offset().top;
        var cellIndex = Math.floor( mouseY / $sprite.cellHeight() );
        $sprite.currentCell(cellIndex);
    });

$demo.append(
    "<div>Click one:</div>",
    $image,
    "<div>Selected:</div>",
    $sprite
);

}

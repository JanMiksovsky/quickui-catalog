function demoSpriteButton() {

var SampleSpriteButton = SpriteButton.sub({
    className: "SampleSpriteButton",
    inherited: {
        image: "url(/catalog/resources/sampleButtonStates.png)",
        cellHeight: "32"
    }
});

$demo.append(
    SampleSpriteButton.create( "Save" ),
    SampleSpriteButton.create( "Don't Save" ),
    SampleSpriteButton.create({
        content: "Cancel",
        disabled: true
    })
);

}

function demoBasicButton() {

$demo.append(
    BasicButton.create( "OK" ),
    BasicButton.create({
        content: "Cancel",
        disabled: true
    })
);

}

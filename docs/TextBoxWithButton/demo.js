function demoTextBoxWithButton() {

var box = TextBoxWithButton.create();
box.on( "goButtonClick", function() {
    TransientMessage.showMessage( "You entered: " + box.content() );
});

$demo.append( box );

}

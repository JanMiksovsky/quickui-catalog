function demoDialog() {

$demo.append(
    Link.create( "Click for a sample dialog" )
        .click( function() {
        Dialog.showDialog( SampleDialog );
    })
);

}

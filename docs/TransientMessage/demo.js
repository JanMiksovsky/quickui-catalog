function demoTransientMessage() {

var $link = Link.create( "Click for a message" );

$link.click( function() {
    TransientMessage.showMessage(
        "This message will go away on its own…"
    );
});

$demo.append( $link );

}

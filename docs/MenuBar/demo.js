function demoMenuBar() {

$demo.append(
    MenuBar.create().content([
        Menu.create( "File" ).popup([
            MenuItem.create( "New" ),
            MenuSeparator.create(),
            MenuItem.create( "Open…" ),
            MenuItem.create( "Save" ),
            MenuSeparator.create(),
            MenuItem.create( "Close" ),
        ]),
        Menu.create( "Edit" ).popup([
            MenuItem.create( "Undo" ).disabled( true ),
            MenuSeparator.create(),
            MenuItem.create( "Cut" ),
            MenuItem.create( "Copy" ),
            MenuItem.create( "Paste" ),
        ]),
        Menu.create( "View" ).popup([
            MenuItem.create( "Portrait" ),
            MenuItem.create( "Landscape" ),
            MenuSeparator.create(),
            MenuItem.create( "Full Screen" )
        ])
    ])
);

// Create a place to log menu clicks.
var $log = $( "<div/>" )
    .css({
        "font-size": "smaller",
        padding: "0.5em"
    })
    .appendTo( $demo );

// Log menu clicks
$demo.on( "click", ".MenuItem", function( event ) {
    var $menuItem = $( event.target ).control();
    var $menu = $menuItem.closest( ".Menu" ).control();
    var description = $menu.content() + " / " + $menuItem.content();
    $log.append( "<div>" + description + "</div>" );
});

}

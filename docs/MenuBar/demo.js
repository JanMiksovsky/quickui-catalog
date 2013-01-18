function demoMenuBar() {

// Create a place to log menu clicks.
var $log = Log.create()
    .css({
        background: "white",
        border: "none",
        "font-family": "Helvetica, Arial, sans-serif",
        "font-size": "smaller",
        "min-height": "200px"
    } );

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
    ]),
    $log
);

// Log menu clicks
$demo.on( "click", ".MenuItem", function( event ) {
    var $menuItem = $( event.target ).control();
    var $menu = $menuItem.closest( ".Menu" ).control();
    var description = $menu.content() + " / " + $menuItem.content();
    $log.writeln( description );
});

}

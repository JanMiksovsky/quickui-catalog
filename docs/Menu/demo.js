function demoMenu() {

$demo.append(
    Menu.create( "New" )
        .popup([
            MenuItem.create( "Appointment" ),
            MenuItem.create( "Contact" ),
            MenuItem.create( "Meeting" ),
            MenuItem.create( "Message" ),
            MenuItem.create( "Task" )
        ])
);

}

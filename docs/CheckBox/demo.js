function demoCheckBox() {

$demo.append(
    "I want to rent: ",
    CheckBox.create()
        .content( "Boots" )
        .checked( true ),
    CheckBox.create()
        .content( "Skis" )
        .checked( true ),
    CheckBox.create()
        .content( "Poles" )
        .checked( true )
);

}

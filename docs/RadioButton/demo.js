function demoRadioButton() {

$demo.append(
    "Skill level: ",
    RadioButton.create()
        .content( "Beginner" )
        .checked( true ),
    " ",
    RadioButton.create()    
        .content( "Intermediate" ),
    " ",
    RadioButton.create()    
        .content( "Advanced" )
);

}

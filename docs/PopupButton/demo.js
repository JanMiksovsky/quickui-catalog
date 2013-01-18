function demoPopupButton() {

$demo.append(
    PopupButton.create( "Orientation" )
        .popup([
            BasicButton.create( "Portrait" )
                .css({
                    height: "100px",
                    margin: "5px",
                    width: "75px"
                }),
            BasicButton.create( "Landscape" )
                .css({
                    height: "75px",
                    margin: "5px",
                    width: "100px"
                })
        ])
);

}

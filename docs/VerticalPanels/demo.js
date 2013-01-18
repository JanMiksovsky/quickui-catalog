function demoVerticalPanels() {

$demo.append(
    VerticalPanels.create({
        constrainHeight: "true",
        height: "200px",
        top: "Top panel",
        content: "Main content",
        bottom: "Bottom panel"
    })
);

// Make the borders visible for demo purposes.
$demo.find( ".VerticalPanels > *" ).css({
    border: "1px solid lightgray"
});

}

function demoHorizontalPanels() {

$demo.append(
    HorizontalPanels.create({
        constrainHeight: "true",
        height: "200px",
        left: "Left panel",
        content: "Main content",
        right: "Right panel"
    })
);

// Make the borders visible for demo purposes.
$demo.find( ".HorizontalPanels > *" ).css({
    border: "1px solid lightgray"
});

}

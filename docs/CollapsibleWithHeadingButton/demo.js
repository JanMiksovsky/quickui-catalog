function demoCollapsibleWithHeadingButton() {

$demo.append(
    CollapsibleWithHeadingButton.create({
        heading: "Heading",
        content: [
            LoremIpsum.create()
        ]
    })
);

}

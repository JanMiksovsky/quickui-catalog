function demoCollapsible() {

$demo.append(
    Collapsible.create({
        heading: "Heading (click to toggle)",
        content: [
            LoremIpsum.create()
        ]
    })
);

}

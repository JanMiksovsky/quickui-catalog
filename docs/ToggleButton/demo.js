function demoToggleButton() {

$demo.append(
    ToggleButton.create({
        content: "B",
        css: { "font-weight": "bold" }
    }),
    ToggleButton.create({
        content: "I",
        css: { "font-style": "italic" }
    }),
    ToggleButton.create({
        content: "U",
        css: { "text-decoration": "underline" }
    })
);

}

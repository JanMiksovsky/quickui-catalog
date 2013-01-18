function demoHighlightEffects() {

var GrowSquare = HighlightEffects.sub({
    className: "GrowSquare",
    inherited: {
        // We'd normally define this in a CSS file, but for
        // demo purposes we'll do it in script.
        css: {
            cursor: "default",
            display: "inline-block",
            "-moz-user-select": "-moz-none",
            "-webkit-user-select": "none",
            "user-select": "none",
            "vertical-align": "top"
        },
        contentCss: {
            "background-color": "#e8e8e8",
            border: "3px solid #e0e0e0",
            color: "#444",
            "font-size": "32px",
            "font-weight": "bold",
            height: "40px",
            "padding": "5px",
            width: "40px"
        },
        effects: {
            "background-color": "#ffffff",
            "border-color": "#ffd700",
            "color": "#000000",
            "height": "50px",
            "left": "-5px",
            "top": "-5px",
            "width": "50px"
        }
    }
});

$demo.append(
    Repeater.create({
        repeatClass: GrowSquare,
        count: 5,
        increment: true,
        css: {
            padding: "5px"
        }
    })
);

}

function demoToggleButton() {

var $buttonBold = ToggleButton.create({
    content: "B",
    css: { "font-weight": "bold" },
    selected: true
});
var $buttonItalic = ToggleButton.create({
    content: "I",
    css: {
        "font-style": "italic",
        width: "1.8em"
    }
});
var $buttonUnderline = ToggleButton.create({
    content: "U",
    css: { "text-decoration": "underline" }
});
var $sample = $( "<div>Sample</div>" )
    .css({
        "font-size": "30px",
        "padding-top": "5px"
    });
    
$demo.append(
    $buttonBold,
    $buttonItalic,
    $buttonUnderline,
    $sample
);

$demo.on( "click", ".ToggleButton", function() {
    updateSample();
});

function updateSample() {
    $sample.css({
        "font-weight": $buttonBold.selected() ? "bold" : "normal",
        "font-style": $buttonItalic.selected() ? "italic" : "normal",
        "text-decoration": $buttonUnderline.selected() ? "underline" : "none"
    });
}

updateSample();

}

function demoVerticalAlign() {

$demo.append(
    VerticalAlign.create()
        .content(
            BasicButton.create("A vertically-aligned button")
        )
        .css({
            border: "1px solid lightgray",
            height: "200px"
        })
);

}

function demoRepeater() {

$demo.append(
    Repeater.create({
        repeatClass: BasicButton,
        count: 4,
        content: "Button",
        increment: true
    })
);

}

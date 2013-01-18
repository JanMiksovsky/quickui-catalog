function demoFader() {

var text = "The glass is neither half-full nor half-empty: it's twice as big as it needs to be."

$demo.append(
    Fader.create({
        content: text,
        width: "175px"
    }),
    Fader.create({
        content: text,
        width: "350px"
    }),
    Fader.create({
        content: text
        // No explicit width
    })
);

}

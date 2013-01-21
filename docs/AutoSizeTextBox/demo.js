function demoAutoSizeTextBox() {

$demo.append(
    "Type as much text as you want:",
    AutoSizeTextBox.create({
        minimumLines: 2
    })
);

}

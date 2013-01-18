function demoValidatingTextBox() {

$demo.append(
    "<div>Normal field:</div>",
    ValidatingTextBox.create(),
    "<div>Required field:</div>",
    ValidatingTextBox.create({
        required: true
    }),
    "<div>Date field:</div>",
    DateTextBox.create()
);

}

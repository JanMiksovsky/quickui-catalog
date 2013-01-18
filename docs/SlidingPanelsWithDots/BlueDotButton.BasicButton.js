var BlueDotButton = Control.sub({
    className: "BlueDotButton",
    inherited: {
        content: [
            // We host the button inside a container (instead of inheriting from
            // BasicButton) so that we can add some clickable padding around the
            // visible button. Otherwise the dot would be too small to easily
            // click.
            { control: BasicButton, ref: "button", generic: "false" }
        ]
    }
});

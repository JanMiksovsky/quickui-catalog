function demoLog() {

// Wire up a text input control and a text log.
var Terminal = Control.sub({
    className: "Terminal",
    inherited: {
        content: [
            {
                control: Log,
                ref: "log",
                content: "Here's what you've typed:\n",
                css: {
                    "max-height": "300px",
                    "margin-bottom": "0.5em",
                    "overflow-y": "auto"
                }
            },
            {
                control: TextBoxWithButton,
                ref: "textBox",
                placeholder: "Type here"
            }
        ]
    },
    initialize: function() {
        var self = this;
        this.on( "goButtonClick", function() {
            content = self.$textBox().content();
            self.$log().writeln( content );
            self.$textBox().content( "" ).focus();
        });
    }
});

$demo.append( Terminal.create() );

}

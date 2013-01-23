function demoDialog() {

var SampleDialog = Dialog.sub({
    className: "SampleDialog",
    inherited: {
        content: [
            "<h1>Sample Dialog</h1>",
            { control: LoremIpsum },
            {
                control: SampleSpriteButton,
                ref: "buttonClose",
                content: "Close",
                css: { "margin-top": "1em" }
            }
        ],
        width: "600px"
    },
    initialize: function() {
        var self = this;
        this.$buttonClose().click(function() {
            self.close();
        });
    }
})
        
$demo.append(
    Link.create( "Click for a sample dialog" )
        .click( function() {
            Dialog.showDialog( SampleDialog );
        })
);

}

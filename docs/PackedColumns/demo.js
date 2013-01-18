function demoPackedColumns() {

// A block of random height
var Block = Control.sub({
    className: "Block",
    inherited: {
        css: {
            border: "1px solid gray",
            width: "100px"
        }
    },
    initialize: function() {
        var height = 50 + Math.floor(151 * Math.random());
        this.height( height + "px" );
    }
});

$demo.append(
    PackedColumns.create().content([
        Block.create( "1" ),
        Block.create( "2" ),
        Block.create( "3" ),
        Block.create( "4" ),
        Block.create( "5" ),
        Block.create( "6" ),
        Block.create( "7" ),
        Block.create( "8" )
    ])
);

}

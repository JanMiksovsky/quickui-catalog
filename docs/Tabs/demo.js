function demoTabs() {

// Simple Tab subclass that adds padding.
var CustomTab = Tab.sub({
    className: "CustomTab",
    inherited: {
        css: { padding: "1em" }
    }
});

$demo.append(
    Tabs.create([
        CustomTab.create()
            .description( "Photo" )
            .content(
                FlickrInterestingPhoto.create()
                    .css( "max-width", "100%" )
            ),
        CustomTab.create()
            .description( "Metadata" )
            .content( LoremIpsum.create() )
    ])
);

}

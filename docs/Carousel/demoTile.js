function demoTileCarousel() {

$demo.append(
    Carousel.create([
        FlickrInterestingPhoto.create({ photoSize: "t" }),
        FlickrInterestingPhoto.create({ photoSize: "t" }),
        FlickrInterestingPhoto.create({ photoSize: "t" }),
        FlickrInterestingPhoto.create({ photoSize: "t" }),
        FlickrInterestingPhoto.create({ photoSize: "t" })
    ]).css( "display", "inline-block" )
);

}

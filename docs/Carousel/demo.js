function demoCarousel() {

$demo.append(
    Carousel.create([
        FlickrInterestingPhoto.create({ photoSize: "m" }),
        FlickrInterestingPhoto.create({ photoSize: "m" }),
        FlickrInterestingPhoto.create({ photoSize: "m" }),
        FlickrInterestingPhoto.create({ photoSize: "m" }),
        FlickrInterestingPhoto.create({ photoSize: "m" })
    ]).css( "display", "inline-block" )
);

}

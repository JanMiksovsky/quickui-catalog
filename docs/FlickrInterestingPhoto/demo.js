function demoFlickrInterestingPhoto() {

$demo.append(
    SlidingPanelsWithDots.create({
        pageButtonClass: BlueDotButton,
        content: [
            FlickrInterestingPhoto.create(),
            FlickrInterestingPhoto.create(),
            FlickrInterestingPhoto.create(),
            FlickrInterestingPhoto.create(),
            FlickrInterestingPhoto.create()
        ]
    })
);

// Would normally style this through CSS.
$( ".FlickrInterestingPhoto" ).css({
    "vertical-align": "middle"
});

}

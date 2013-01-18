function demoDeviceSpecific() {

$demo.append(
    DeviceSpecific.create({
        "default": "You are not mobile",
        defaultClass: SampleSpriteButton,
        mobile: "You are mobile",
        mobileClass: BasicButton
    })
);

}

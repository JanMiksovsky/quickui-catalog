function demoBrowserSpecific() {

$demo.append(
    BrowserSpecific.create({
        "webkit": "You are using WebKit.",
        "msie": "You are using Internet Explorer.",
        "mozilla": "You are using Firefox.",
        "default": "You are using some unknown browser."
    })
);

}

function demoSearchBox() {

$demo.append(
    SearchBox.create({
        query: "http://www.google.com/search?q=%s",
        placeholder: "Search Google"
    })
);

}

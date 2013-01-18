function demoDictionaryTable() {

var city = {
    name: "Paris",
    country: "France",
    population: "2,234,105",
    timeZone: "CET"
};

$demo.append(
    DictionaryTable.create().content( city )
);

}

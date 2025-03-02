//Haetaan säätiedot Helsingistä ja Tampereelta OpenWeather API:sta//
fetch('https://api.openweathermap.org/data/2.5/group?id=658225,634963&units=metric&lang=fi&appid=665ecd56dfc08dbb50feb8b8f5034e28')

    //Muunnetaan vastaus JSON-muotoon//
    .then(function (response) {
        return response.json();
    })

    //Muunnetaan vastaus JSONiksi//
    .then(function (data) {
        naytaSaa(data); // Kutsutaan funktiota//
    })

    //Jos tuli jokin virhe//
    .catch(function (error) {
        document.getElementById("saavastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>" + error;
    });

//Sää funktio//
function naytaSaa(data) {
    var teksti = "";

    for (var i = 0; i < data.list.length; i++) {
        var kaupunki = data.list[i].name;
        var saakuvaus = data.list[i].weather[0].description;
        var lampotila = data.list[i].main.temp.toFixed(1) + "°C";
        var tuuli = data.list[i].wind.speed.toFixed(1) + " m/s";

        //.toFixed(1), jotta vastaus saadaan 1 desimaalin tarkuudella//

        teksti = teksti + "<div class='saa-box'>";
        teksti = teksti + "<h3>" + kaupunki.toUpperCase() + "</h3>";
        teksti = teksti + "<p>Sää: " + saakuvaus + " " + "</p>";
        teksti = teksti + "<p>Lämpötila: " + lampotila + "</p>";
        teksti = teksti + "<p>Tuulen nopeus: " + tuuli + "</p>";
        teksti = teksti + "</div>";
    }
    document.getElementById("saavastaus").innerHTML = teksti;
}
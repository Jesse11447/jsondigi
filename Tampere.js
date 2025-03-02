//Haetaan tiedot//
fetch('https://api.visittampere.com/api/v1/visittampere/event/published/all/?for mat=json&lang=fi')

    // Muunnetaan vastaus JSON muotoon//
    .then(function (response) {
        return response.json();
    })

    // Käsitellään muunnettu (eli JSON muotoinen) vastaus//
    .then(function (responseJson) {


        // Kutsutaan funktiota ja välitetään sille json-vastaus tapahtumat(responseJson)})
        tapahtumat(responseJson);
    })


    // Jos tuli jokin virhe

    .catch(function (error) {
        document.getElementById("trevastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan </p>" + error;

    })

function tapahtumat(data) {

    var teksti = "";

    teksti = "<h1>Tampereella tapahtuu</h1>";

    for (var i = 0; i < data.length; i++) {
        teksti = teksti + "<h3>" + data[i].title + "</h3>";
        teksti = teksti + "<p>" + data[i].description + "</p>";
        teksti = teksti + "<p> <a href=" + data[i].url + ">" + data[i].url + "</a></p>";
    }

    document.getElementById("trevastaus").innerHTML = teksti;
}
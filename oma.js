function kerro(data) {
    let teksti = "";
    //kuvaus//
    teksti = "<h1>" + data.otsikko + "</h1>";
    teksti = teksti + "<p><b>Kuvaus:</b> " + data.kuvaus + "</p>";
    //kuva//
    teksti = teksti + '<img src="' + data.kuva + '" alt="JSON-kuva" width="300"><br>';
    //opintojakso//
    teksti = teksti + "<h2>Opintojakso</h2>";
    teksti = teksti + "<p><b>Nimi:</b> " + data.opintojakso.nimi + "</p>";
    teksti = teksti + "<p><b>Tunnus:</b> " + data.opintojakso.tunnus + "</p>";
    teksti = teksti + "<p><b>Opintopisteet:</b> " + data.opintojakso.opintopisteet + "</p>";
    //sisältö//
    teksti = teksti + "<h3>Sisältö</h3><ul>";
    for (var i in data.opintojakso.sisalto) {
        teksti = teksti + "<li>" + data.opintojakso.sisalto[i] + "</li>";
    }
    teksti = teksti + "</ul>";
    //tekniikat//
    teksti = teksti + "<h3>Tekniikat</h3><ul>";
    for (var j in data.opintojakso.tekniikat) {
        teksti = teksti + '<li><a href="' + data.opintojakso.tekniikat[j].linkki + '" target="_blank">'
            + data.opintojakso.tekniikat[j].aihe + "</a></li>";
    }
    teksti = teksti + "</ul>";


    document.getElementById("vastaus").innerHTML = teksti;
}

//Tähän kirjoita oman JSON tietueesi URL
fetch('https://Jesse11447.github.io/jsondigi/etusivu.JSON')

    // Muunnetaan vastaus JSON muotoon
    .then(function (response) {
        return response.json();
    })

    //Käsitellään muunnettu (eli JSON muotoinen) vastaus
    .then(function (responseJson) {
        // Kutsutaan funktiota ja välitetään sille json-vastaus
        kerro(responseJson);
    })

    // Jos tuli jokin virhe
    .catch(function (error) {
        document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
    })
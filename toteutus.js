function kerro(data) {
    var teksti = "";

    //Toteutus//
    teksti = "<h1>" + data.toteutus.nimi + "</h1>";

    //Osallistujat//
    teksti = teksti + "<p><b>Osallistujien lukumäärä:</b> " + data.toteutus.osallistujat.lukumaara + "</p>";
    teksti = teksti + "<h3>Osallistujat</h3><ul>";
    for (var i in data.toteutus.osallistujat.nimet) {
        teksti = teksti + "<li>" + data.toteutus.osallistujat.nimet[i] + "</li>";
    }
    teksti = teksti + "</ul>";

    //Ajankohta//
    teksti = teksti + "<p><b>Alkamisaika:</b> " + data.toteutus.ajankohta.alku + "</p>";
    teksti = teksti + "<p><b>Loppumisaika:</b> " + data.toteutus.ajankohta.loppu + "</p>";
    teksti = teksti + "<p><b>Kesto viikkoina:</b> " + data.toteutus.ajankohta.kesto_viikkoina + "</p>";

    //Kuva//
    if (data.toteutus.kuva && data.toteutus.kuva.startsWith("http")) {
        teksti = teksti + '<img src="' + data.toteutus.kuva + '" alt="JSON-kuva" width="300" onerror="this.onerror=null; this.src=\'fallback.jpg\';"><br>';
    } else {
        teksti = teksti + "<p><b>Kuvaa ei voitu ladata.</b></p>";
    }
    document.getElementById("vastaus").innerHTML = teksti;
}

//  JSON-tiedosto --> //
fetch('https://Jesse11447.github.io/jsondigi/toteutus.JSON')

    //--> JSON-muotoon/
    .then(function (response) {
        return response.json();
    })

    //Käsitellään vastaus//
    .then(function (responseJson) {
        //Kutsutaan funktiota ja välitetään sille JSON-vastaus//
        kerro(responseJson);
    })

    //Jos tuli jokin virhe//
    .catch(function (error) {
        document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
    });
// Haetaan HKI lähtevät junat
fetch("https://rata.digitraffic.fi/api/v1/live-trains/station/HKI?departing_trains=100&include_nonstopping=false")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        naytaJunat(data);
    })
    .catch(function (error) {
        document.getElementById("junat").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>" + error;
    });

// Käsitellään tiedot funktion avulla
function naytaJunat(data) {
    var teksti = "<h2>Helsingistä lähtevät junat Tampereelle</h2>";

    for (var i = 0; i < data.length; i++) {
        var junanro = data[i].trainNumber; 
        var junatyyppi = data[i].trainCategory; 
        var lahtoasema = data[i].timeTableRows[0].stationShortCode;
        var junamalli = data[i].trainType;
        var vika = data[i].timeTableRows.length - 1;
        var maaranpaa = data[i].timeTableRows[vika].stationShortCode; 
        var lahtoaikaPvm = ""; 
        var lahtoaika = ""; 
        var perillaTre = ""; 

        // Haetaan lähdön aikarivi Helsingistä (HKI)
        for (var j = 0; j < data[i].timeTableRows.length; j++) {
            if (data[i].timeTableRows[j].stationShortCode == "HKI" && data[i].timeTableRows[j].type == "DEPARTURE") {
                var pvm = data[i].timeTableRows[j].scheduledTime;
                lahtoaika = " klo:" + pvm.substr(11, 5); 
                lahtoaikaPvm = pvm.substr(0, 10); 
            }
        }

        // Haetaan saapumisaika Tampereelle (TPE)
        for (var k = 0; k < data[i].timeTableRows.length; k++) {
            if (data[i].timeTableRows[k].stationShortCode == "TPE" && data[i].timeTableRows[k].type == "ARRIVAL") {
                var pvmArrival = data[i].timeTableRows[k].scheduledTime;
                perillaTre = " klo:" + pvmArrival.substr(11, 5); // Saapumisaika Tampereelle
            }
        }

        // Jos junalla on lähtöaika ja saapumisaika Tampereelle, näytetään tiedot
        if (lahtoaika !== "" && perillaTre !== "") {
            teksti = teksti + "<div class='juna-box'>";
            teksti = teksti + "<h3>Juna " + junamalli + " " + junanro + " (" + junatyyppi + ")</h3>";
            teksti = teksti + "<h4>" + lahtoaikaPvm + "</h4>";
            teksti = teksti + "<p><strong>Lähtöasema:</strong> " + lahtoasema + "</p>";
            teksti = teksti + "<p><strong>Määränpää:</strong> " + maaranpaa + "</p>";
            teksti = teksti + "<p><strong>Lähtee Helsingistä:</strong> " + lahtoaika + "</p>";
            teksti = teksti + "<p><strong>Saapuu Tampereelle:</strong> " + perillaTre + "</p>";
            teksti = teksti + "<br></div>";
        }
    }

    document.getElementById("vastaus").innerHTML = teksti;
}

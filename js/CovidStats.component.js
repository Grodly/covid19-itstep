class CovidStatistics {
    constructor() {
        this.getStatsItems();
        this.GetCoronaInfo("Georgia")
    }

    getStatsItems() {
        var apiUrl = `https://coronavirus-tracker-api.herokuapp.com/v2/locations`;

        var tag = document.querySelector(".topCountries");
        var xmlRequest = new XMLHttpRequest();
        xmlRequest.open("GET", apiUrl, true);
        xmlRequest.onloadend = function() {
            var datas = JSON.parse(xmlRequest.responseText);

            var topFive = new Array();
            var maxValue = 0

            for (var i = 0; i < 5; i++) {
                datas.locations.forEach(element => {
                    if (i > 0) {
                        if (topFive[i - 1] > element.latest.confirmed) {
                            if (maxValue < element.latest.confirmed) {
                                maxValue = element.latest.confirmed;
                            }
                        }
                    } else if (maxValue < element.latest.confirmed) {
                        maxValue = element.latest.confirmed;
                    }
                });
                topFive[i] = maxValue;
                maxValue = 0;
            }

            for (var i = 0; i < 5; i++) {
                datas.locations.forEach(element => {
                    if (topFive[i] == element.latest.confirmed) {
                        tag.innerHTML += `<tr>
                                            <td>${element.country}</td>
                                            <td>${element.latest.confirmed}</td>
                                            <td>${element.latest.deaths}</td>
                                            <td>${element.latest.recovered}</td>
                                        </tr>`
                    }
                });
            }
        }
        xmlRequest.send();
    }

    GetCoronaInfo(coutryName) {
        var apiUrl = `https://coronavirus-tracker-api.herokuapp.com/v2/locations`;

        var tag = document.querySelector(".yourCountry");
        var xmlRequest = new XMLHttpRequest();
        xmlRequest.open("GET", apiUrl, true);
        xmlRequest.onloadend = function() {
            var datas = JSON.parse(xmlRequest.responseText);
            var corona = (datas.locations.filter(o => o.country.toLowerCase() == coutryName.toLowerCase()))[0];
            tag.innerHTML += `<tr>
                                <td>${corona.country}</td>
                                <td>${corona.latest.confirmed}</td>
                                <td>${corona.latest.deaths}</td>
                                <td>${corona.latest.recovered}</td>
                            </tr>`
        }
        xmlRequest.send();
    }
}
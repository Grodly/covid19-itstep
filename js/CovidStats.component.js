class CovidStatistics {
    constructor() {
        this.getStatsItems();
        this.GetCoronaInfo("Georgia")
    }

    getStatsItems() {
        var apiUrl = `https://nepalcorona.info/api/v1/data/world`;

        var tag = document.querySelector(".topCountries");
        var xmlRequest = new XMLHttpRequest();
        xmlRequest.open("GET", apiUrl, true);
        xmlRequest.onloadend = function() {
            var datas = JSON.parse(xmlRequest.responseText);

            var topFive = new Array();
            var maxValue = 0

            for (var i = 0; i < 6; i++) {
                datas.forEach(element => {
                    if (i > 0) {
                        if (topFive[i - 1] > element.totalCases) {
                            if (maxValue < element.totalCases) {
                                maxValue = element.totalCases;
                            }
                        }
                    } else if (maxValue < element.totalCases) {
                        maxValue = element.totalCases;
                    }
                });
                topFive[i] = maxValue;
                maxValue = 0;
            }

            for (var i = 1; i < 6; i++) {
                datas.forEach(element => {
                    if (topFive[i] == element.totalCases) {
                        tag.innerHTML += `<tr>
                                            <td>${element.country}</td>
                                            <td>${element.totalCases}</td>
                                            <td>${element.totalDeaths}</td>
                                            <td>${element.totalRecovered}</td>
                                        </tr>`
                    }
                });
            }
        }
        xmlRequest.send();
    }

    GetCoronaInfo(coutryName) {
        var apiUrl = `https://nepalcorona.info/api/v1/data/world`;

        var tag = document.querySelector(".yourCountry");
        var xmlRequest = new XMLHttpRequest();
        xmlRequest.open("GET", apiUrl, true);
        xmlRequest.onloadend = function() {
            var datas = JSON.parse(xmlRequest.responseText);
            var corona = (datas.filter(o => o.country.toLowerCase() == coutryName.toLowerCase()))[0];
            tag.innerHTML += `<tr>
                                <td>${corona.country}</td>
                                <td>${corona.totalCases}</td>
                                <td>${corona.totalDeaths}</td>
                                <td>${corona.totalRecovered}</td>
                            </tr>`
        }
        xmlRequest.send();
    }
}
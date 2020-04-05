class CovidStatistics {
    constructor() {
        //this.getLocation();
        this.Statistic();
        this.GetCoronaInfo("Georgia")
        this.getStatsItems();
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

            var end = 0;
            while (end != 4) {
                datas.locations.forEach(element => {
                    for (var i = 0; i < topFive.length; i++) {
                        if (topFive[i] != null && topFive[i] != element.latest.confirmed) {
                            if (maxValue < element.latest.confirmed) {
                                maxValue = element.latest.confirmed;
                            }
                        }
                    }
                });
                topFive.push(maxValue);
                end++;
            }

            datas.locations.forEach(element => {
                for (var i = 0; i < topFive.length; i++) {
                    if (topFive[i] == element.latest.confirmed) {
                        tag.innerHTML += `<tr>
                                            <td>${element.country}</td>
                                            <td>${element.latest.confirmed}</td>
                                            <td>${element.latest.deaths}</td>
                                            <td>${element.latest.recovered}</td>
                                        </tr>`
                    }
                }
            });
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
            tag.innerHTML = `<tr>
                                <td>${corona.country}</td>
                                <td>${corona.latest.confirmed}</td>
                                <td>${corona.latest.deaths}</td>
                                <td>${corona.latest.recovered}</td>
                            </tr>`
        }
        xmlRequest.send();
    }

    //diagrama
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    showPosition(position) {
        var coordinates = {
            Latitude: position.coords.latitude,
            Longtitude: position.coords.longitude
        };
        SubscribeGeoLocation(coordinates);
    }

    SubscribeGeoLocation(obj) {
        console.log(obj);
        GetCountryInfo(obj);
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: obj.Latitude, lng: obj.Longtitude },
            zoom: 15
        });
    }

    GetCountryInfo(obj) {
        var api = `http://api.geonames.org/countryCodeJSON?lat=${obj.Latitude}&lng=${obj.Longtitude}&username=beta`
        var xmlRequest = new XMLHttpRequest();
        xmlRequest.open("GET", api, true);
        xmlRequest.onloadend = function() {
            var obj = JSON.parse(xmlRequest.responseText);
            GetCoronaInfo(obj.countryName);
            console.log(obj);
        }

        xmlRequest.send();
    }

    map;
    initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
    }

    Statistic() {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://covid-193.p.rapidapi.com/statistics");
        xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "77b0e22cf0mshd110ba1b8435464p144b8fjsn1b4bda726691");
        xhr.onloadend = function() {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            var info = data.response.filter(o => o.cases.total > 2000).map(o => {
                return {
                    label: o.country,
                    value: `${o.cases.total}`
                }
            });
            console.log(info);
            self.createCoronaChart(info);
        }
        xhr.send();
    }

    createCoronaChart(datas) {
        // Create a JSON object to store the chart configurations
        var chartConfigs = {
            //Specify the chart type
            type: "column2d",
            //Set the container object
            renderAt: "chart-container",
            //Specify the width of the chart
            width: "100%",
            //Specify the height of the chart
            height: "800",
            //Set the type of data
            dataFormat: "json",
            dataSource: {
                chart: {
                    //Set the chart caption
                    caption: "Covid-19",
                    //Set the chart subcaption
                    subCaption: "In MMbbl = One Million barrels",
                    //Set the x-axis name
                    xAxisName: "Country",
                    //Set the y-axis name
                    yAxisName: "Reserves (MMbbl)",
                    numberSuffix: "K",
                    //Set the theme for your chart
                    theme: "fusion"
                },
                // Chart Data from Step 2
                data: datas
            }
        };

        FusionCharts.ready(function() {
            var fusioncharts = new FusionCharts(chartConfigs);
            fusioncharts.render();
        });
    }
}
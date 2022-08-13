// open weather api key
const apiKey = "746e01aa22c61fa5a613107f004407af";

var inputFieldEl = document.getElementById("cityInput");
var todaysWeatherEl = document.getElementById("todaysWeather");
var inputCitiesEl = document.getElementById("searchList");


var inputCities = [];




function generateForecast(query) {
    // clear the content in the forecats display for todays weather
    todaysWeatherEl.innerHTML = "";

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKey,
        success: function(res) {
            todaysWeatherEl.innerHTML = "<h3 class='cityName'>" + res.name + "</h3>"
            // todaysWeatherEl.innerHTML =  + res.name + '</h3>';

        }
        
    });
    inputFieldEl.value = '';
}
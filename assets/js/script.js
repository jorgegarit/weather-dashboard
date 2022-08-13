// open weather api key
const apiKey = "746e01aa22c61fa5a613107f004407af";

var inputFieldEl = document.getElementById("cityInput");
var todaysWeatherEl = document.getElementById("todaysWeather");
var inputCitiesEl = document.getElementById("searchList");

// Format today date usign moment js
var todaysDate = moment().format("MMM Do YYYY");

var inputCities = [];




function generateForecast(query) {
    // clear the content in the forecats display for todays weather
    todaysWeatherEl.innerHTML = "";

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKey,
        success: function(res) {
            // variables so that response from call is in readable values
            var readableTemp = Math.floor(res.main.temp* 9/5 - 459);
            var readableHumity = res.main.humidity;
            var readableWindSpeed = res.wind.speed;

            // call for UV index 
            

            // input into card for todays forecast
            todaysWeatherEl.innerHTML = "<h3 class='cityName'>" + res.name + ", " + todaysDate + "</h3>"
                + "<p class=cityContent> Temperature: " + readableTemp + "°F" + "<br> Humidity: " 
                + readableHumity + "%" + "<br> Wind Speed: " + readableWindSpeed + "mph" + 
                "</p>";

        }
        
    });
    inputFieldEl.value = '';
}
// open weather api key
const apiKey = "746e01aa22c61fa5a613107f004407af";

var inputFieldEl = document.getElementById("cityInput");
var todaysWeatherEl = document.getElementById("todaysWeather");
var inputCitiesEl = document.getElementById("searchList");
var fiveDayForecastEl = document.getElementById("fiveDayDisplay");

// Format today date usign moment js
var todaysDate = moment().format("MMM Do YYYY");

// array for searched cities
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

            // input into card for todays forecast
            todaysWeatherEl.innerHTML = "<h3 class='cityName'>" + res.name + ", " + todaysDate + "</h3>"
                + "<p class='cityContent'> Temperature: " + readableTemp + "°F" + "<br> Humidity: " 
                + readableHumity + "%" + "<br> Wind Speed: " + readableWindSpeed + "mph" + "</p>";

            // response for latitude and longitude to use for UV index call
            var longitude = res.coord.lon;
            var latitude = res.coord.lat;

            // call for UV index 
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + 
                    "&lat=" + latitude + "&lon=" + longitude,
                success: function(res) {
                    var readableUvIndex = res.value;

                    // else if statements to create classes so that UV index will change color based on severity
                    if (readableUvIndex > 0 && readableUvIndex <= 2){
                        var lowText = "<p class='cityContent'> UV Index: <span class='low'>" + readableUvIndex + "</span></p>";
                        todaysWeatherEl.innerHTML = todaysWeatherEl.innerHTML + lowText;
                    }
                    else if (readableUvIndex > 2 && readableUvIndex <= 7){
                        var moderateText = "<p class='cityContent'> UV Index: <span class='moderate'>" + readableUvIndex + "</span></p>";
                        todaysWeatherEl.innerHTML = todaysWeatherEl.innerHTML + moderateText;
                    }
                    else if (readableUvIndex >= 8) {
                        var highText = "<p class='cityContent'> UV Index: <span class='high'>" + readableUvIndex + "</span></p>";
                        todaysWeatherEl.innerHTML = todaysWeatherEl.innerHTML + highText
                    }
                
                     
                }
            })
        }  
    });

    // call for 5 day forecast
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&appid=" 
            + apiKey,
        success: function(res) {
            fiveDayForecastEl.innerHTML = "";
            var tomorrow = moment().add(1, 'days');
            // for (var i = 0; res.list.length; i= 4)
            fiveDayForecastEl.innerHTML = "<p>" + res.list.main.temp + "</p>";
        }
    })
    inputFieldEl.value = '';
}
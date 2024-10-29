// scripts/api/weather.js

function getWeatherData(city) {
    const currentWeatherUrl = `${CONFIG.OPENWEATHER_BASE_URL}/weather?q=${city}&units=${CONFIG.UNITS}&appid=${CONFIG.OPENWEATHER_API_KEY}`;
    const forecastUrl = `${CONFIG.OPENWEATHER_BASE_URL}/forecast?q=${city}&units=${CONFIG.UNITS}&appid=${CONFIG.OPENWEATHER_API_KEY}`;

    $.when(
        $.getJSON(currentWeatherUrl),
        $.getJSON(forecastUrl)
    ).done(function(currentData, forecastData) {
        updateCurrentWeather(currentData[0]);
        updateForecast(forecastData[0]);
        updateCharts(forecastData[0]);
    }).fail(function() {
        alert('Error fetching weather data. Please try again.');
    });
}

function updateCurrentWeather(data) {
    $('#cityName').text(data.name);
    $('#temperature').text(`${Math.round(data.main.temp)}°${CONFIG.UNITS === 'metric' ? 'C' : 'F'}`);
    $('#weatherDescription').text(data.weather[0].description);
    $('#humidity').text(`${data.main.humidity}%`);
    $('#windSpeed').text(`${data.wind.speed} ${CONFIG.UNITS === 'metric' ? 'm/s' : 'mph'}`);
    $('#weatherIcon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    // Update weather widget background
    updateWeatherBackground(data.weather[0].main);
}

function updateForecast(data) {
    // Implement this function to update the forecast table
    // You'll need to process the 5-day forecast data and update the table in tables.html
}

function updateCharts(data) {
    // Implement this function to update the charts
    // You'll need to process the forecast data and update the three charts in index.html
}

function updateWeatherBackground(weatherCondition) {
    const weatherWidget = $('#weatherWidget');
    switch(weatherCondition.toLowerCase()) {
        case 'clear':
            weatherWidget.css('background-image', 'url("assets/images/clear.jpg")');
            break;
        case 'clouds':
            weatherWidget.css('background-image', 'url("assets/images/cloudy.jpg")');
            break;
        case 'rain':
        case 'drizzle':
            weatherWidget.css('background-image', 'url("assets/images/rainy.jpg")');
            break;
        case 'thunderstorm':
            weatherWidget.css('background-image', 'url("assets/images/thunderstorm.jpg")');
            break;
        case 'snow':
            weatherWidget.css('background-image', 'url("assets/images/snowy.jpg")');
            break;
        default:
            weatherWidget.css('background-image', 'url("assets/images/default.jpg")');
    }
}
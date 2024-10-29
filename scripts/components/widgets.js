// scripts/components/widgets.js

function initWidgets() {
    // Initialize any widget-specific functionality here
    // For now, we'll just set up the temperature unit toggle
    $('#tempUnitToggle').on('click', toggleTemperatureUnit);
}

function updateWeatherWidget(weatherData) {
    const temp = Math.round(weatherData.main.temp);
    const feelsLike = Math.round(weatherData.main.feels_like);
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;

    $('#currentTemp').text(`${temp}°${CONFIG.UNITS === 'metric' ? 'C' : 'F'}`);
    $('#feelsLike').text(`Feels like: ${feelsLike}°${CONFIG.UNITS === 'metric' ? 'C' : 'F'}`);
    $('#humidity').text(`Humidity: ${humidity}%`);
    $('#windSpeed').text(`Wind: ${windSpeed} ${CONFIG.UNITS === 'metric' ? 'm/s' : 'mph'}`);
    $('#weatherDescription').text(description);
    $('#weatherIcon').attr('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);

    updateWeatherBackground(weatherData.weather[0].main);
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

function toggleTemperatureUnit() {
    CONFIG.UNITS = CONFIG.UNITS === 'metric' ? 'imperial' : 'metric';
    $('#tempUnitToggle').text(`Switch to ${CONFIG.UNITS === 'metric' ? '°F' : '°C'}`);
    
    // Refresh weather data with new unit
    const city = $('#cityName').text();
    getWeatherData(city);
}
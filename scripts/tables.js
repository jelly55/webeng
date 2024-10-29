$(document).ready(function () {
    // Constants
    const OPENWEATHER_API_KEY = 'b4e83ff21616ceb602abc06d89c5f8cc';
    const ITEMS_PER_PAGE = 10;

    // State
    let weatherData = [];
    let currentPage = 1;
    let filteredData = [];

    // DOM Elements
    const $cityInput = $('#cityInput');
    const $searchBtn = $('#searchBtn');
    const $forecastTable = $('#forecastTable'); // Adjusted selector to match your HTML
    const $prevPage = $('#prevPage'); 
    const $nextPage = $('#nextPage'); 
    const $currentPage = $('#currentPage');

    // Event Listeners
    $searchBtn.on('click', () => fetchWeatherData($cityInput.val().trim()));
    $cityInput.on('keypress', function (e) {
        if (e.which === 13) fetchWeatherData($cityInput.val().trim());
    });
    $('#sortAsc').on('click', () => sortData('asc'));
    $('#sortDesc').on('click', () => sortData('desc'));
    $('#filterRain').on('click', filterRain);
    $('#highestTemp').on('click', showHighestTemp);
    $prevPage.on('click', () => changePage(currentPage - 1));
    $nextPage.on('click', () => changePage(currentPage + 1));

    // Get user's current location on page load
    function getUserLocation() {
        if (navigator.geolocation) {
            showLoading();
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoordinates(latitude, longitude);
                },
                error => {
                    console.error('Geolocation error:', error);
                    hideLoading();
                    showError('Unable to get your location. Please search for a city manually.');
                }
            );
        } else {
            showError('Geolocation is not supported by your browser.');
        }
    }

    // Fetch weather by coordinates
    async function fetchWeatherByCoordinates(lat, lon) {
        try {
            const geocodeURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OPENWEATHER_API_KEY}`;
            const geocodeResponse = await $.get(geocodeURL);

            if (geocodeResponse && geocodeResponse[0]) {
                const cityName = geocodeResponse[0].name;
                $cityInput.val(cityName);
                await fetchWeatherData(cityName);
            } else {
                throw new Error('Unable to determine city name');
            }
        } catch (error) {
            hideLoading();
            showError('Error fetching weather data for your location.');
        }
    }

    // Fetch weather data
    async function fetchWeatherData(city) {
        if (!city) return;

        try {
            showLoading();
            const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`;
            const response = await $.get(forecastURL);

            weatherData = response.list.map(item => {
                const dateTime = new Date(item.dt * 1000);
                return {
                    date: dateTime.toLocaleDateString(),
                    temp: Math.round(item.main.temp),
                    weather: item.weather[0].main,
                    humidity: item.main.humidity,
                    windSpeed: item.wind.speed
                };
            });

            filteredData = [...weatherData];
            updateTable();
            hideLoading();
        } catch (error) {
            hideLoading();
            showError('City not found or API error occurred.');
        }
    }

    // Sorting and filtering functions
    function sortData(order) {
        filteredData.sort((a, b) => (order === 'asc' ? a.temp - b.temp : b.temp - a.temp));
        currentPage = 1;
        updateTable();
    }

    function filterRain() {
        filteredData = weatherData.filter(item => item.weather.toLowerCase().includes('rain'));
        currentPage = 1;
        updateTable();
    }

    function showHighestTemp() {
        const maxTemp = Math.max(...weatherData.map(item => item.temp));
        filteredData = weatherData.filter(item => item.temp === maxTemp);
        currentPage = 1;
        updateTable();
    }

    // Update the table with paginated data
    function updateTable() {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const pageData = filteredData.slice(startIndex, endIndex);

        $forecastTable.empty();
        pageData.forEach(item => {
            const row = `
                <tr class="hover:bg-gray-50">
                    <td class="p-2">${item.date}</td>
                    <td class="p-2">${item.temp}°C</td>
                    <td class="p-2">${item.weather}</td>
                    <td class="p-2">${item.humidity}%</td>
                    <td class="p-2">${item.windSpeed} m/s</td>
                </tr>
            `;
            $forecastTable.append(row);
        });

        updatePagination();
    }

    // Update pagination controls
    function updatePagination() {
        const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
        $currentPage.text(`Page ${currentPage}`);

        $prevPage.prop('disabled', currentPage === 1);
        $nextPage.prop('disabled', currentPage === totalPages);
    }

    // Change the current page
    function changePage(newPage) {
        const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
        if (newPage >= 1 && newPage <= totalPages) {
            currentPage = newPage;
            updateTable();
        }
    }

    // Utility functions
    function showLoading() {
        $searchBtn.prop('disabled', true).text('Loading...');
    }

    function hideLoading() {
        $searchBtn.prop('disabled', false).text('Search');
    }

    function showError(message) {
        const $error = $('<div>')
            .addClass('bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded')
            .text(message);

        $forecastTable.before($error);
        setTimeout(() => $error.fadeOut('slow', () => $error.remove()), 3000);
    }

    // Initialize by getting user's location
    getUserLocation();
});

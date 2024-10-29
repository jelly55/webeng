// scripts/main.js

$(document).ready(function() {
    // Initialize the app
    initApp();

    // Event listeners
    $('#searchBtn').on('click', handleSearch);
    $('#sendMsg').on('click', sendChatMessage);
    $('#chatInput').on('keypress', function(e) {
        if (e.which === 13) sendChatMessage();
    });

    // Initialize with default city
    getWeatherData(CONFIG.DEFAULT_CITY);
});

function initApp() {
    // Initialize charts
    initCharts();

    // Initialize sidebar
    initSidebar();
}

function handleSearch() {
    const city = $('#cityInput').val().trim();
    if (city) {
        getWeatherData(city);
    }
}

function sendChatMessage() {
    const message = $('#chatInput').val().trim();
    if (message) {
        displayChatMessage(message, 'user');
        $('#chatInput').val('');
        
        // Check if it's a weather-related query
        if (message.toLowerCase().includes('weather')) {
            // Handle weather query
            handleWeatherQuery(message);
        } else {
            // Send to Gemini API
            sendToChatbot(message);
        }
    }
}

function displayChatMessage(message, sender) {
    const chatClass = sender === 'user' ? 'user-message' : 'bot-message';
    $('#chatMessages').append(`<div class="chat-message ${chatClass}">${message}</div>`);
    $('#chatMessages').scrollTop($('#chatMessages')[0].scrollHeight);
}

function handleWeatherQuery(query) {
    // Extract city name from query (this is a simple example, you might want to use NLP for better extraction)
    const cityMatch = query.match(/weather (?:in|for|at) (.+)/i);
    if (cityMatch && cityMatch[1]) {
        getWeatherData(cityMatch[1]);
    } else {
        displayChatMessage("I'm sorry, I couldn't determine the city. Can you please specify the city name?", 'bot');
    }
}


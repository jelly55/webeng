// scripts/utils/helpers.js

// Convert timestamp to readable date format
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

// Convert temperature based on unit
function convertTemperature(temp, unit) {
    if (unit === 'imperial') {
        return (temp * 9/5) + 32; // Convert Celsius to Fahrenheit
    }
    return temp; // Already in Celsius
}

// Format temperature with unit
function formatTemperature(temp, unit) {
    const roundedTemp = Math.round(temp);
    return `${roundedTemp}°${unit === 'metric' ? 'C' : 'F'}`;
}

// Capitalize first letter of each word
function capitalize(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase());
}

// Get appropriate weather icon URL
function getWeatherIconUrl(iconCode) {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Local storage helpers
const storage = {
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    remove: (key) => localStorage.removeItem(key)
};

// Simple error handler
function handleError(error) {
    console.error('An error occurred:', error);
    $('#errorMessage').text('An error occurred. Please try again later.').show().fadeOut(5000);
}

// Export functions if using ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDate,
        convertTemperature,
        formatTemperature,
        capitalize,
        getWeatherIconUrl,
        debounce,
        storage,
        handleError
    };
}
// scripts/utils/validators.js

// Validate city name input
function validateCityName(cityName) {
    const cityRegex = /^[a-zA-Z\s-]+$/;
    return cityRegex.test(cityName);
}

// Validate that input is not empty
function validateNotEmpty(input) {
    return input.trim().length > 0;
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate numeric input
function validateNumeric(input) {
    return !isNaN(parseFloat(input)) && isFinite(input);
}

// Validate date format (YYYY-MM-DD)
function validateDateFormat(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

// Validate input length
function validateLength(input, minLength, maxLength) {
    const length = input.trim().length;
    return length >= minLength && length <= maxLength;
}

// Validate if value is within range
function validateRange(value, min, max) {
    return value >= min && value <= max;
}

// Validate if string contains only letters and numbers
function validateAlphanumeric(input) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(input);
}

// Perform all validations for city search
function validateCitySearch(cityName) {
    if (!validateNotEmpty(cityName)) {
        return { isValid: false, message: 'City name cannot be empty.' };
    }
    if (!validateCityName(cityName)) {
        return { isValid: false, message: 'City name can only contain letters, spaces, and hyphens.' };
    }
    if (!validateLength(cityName, 2, 50)) {
        return { isValid: false, message: 'City name must be between 2 and 50 characters long.' };
    }
    return { isValid: true, message: '' };
}

// Export functions if using ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateCityName,
        validateNotEmpty,
        validateEmail,
        validateNumeric,
        validateDateFormat,
        validateLength,
        validateRange,
        validateAlphanumeric,
        validateCitySearch
    };
}
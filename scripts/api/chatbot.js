// scripts/api/chatbot.js

function sendToChatbot(message) {
    const url = CONFIG.GEMINI_BASE_URL;
    const data = {
        contents: [{
            parts: [{
                text: message
            }]
        }]
    };

    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        headers: {
            'Authorization': `${CONFIG.GEMINI_API_KEY}`
        },
        success: function(response) {
            const botReply = response.candidates[0].content.parts[0].text;
            displayChatMessage(botReply, 'bot');
        },
        error: function() {
            displayChatMessage("I'm sorry, I couldn't process your request at the moment. Please try again later.", 'bot');
        }
    });
}
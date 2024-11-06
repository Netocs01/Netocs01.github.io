const apiKey = 'TA_CLE_API_OPENAI'; // Remplace par ta clé API
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Fonction pour envoyer une requête à l'API OpenAI
async function sendMessageToAPI(message) {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",  // Tu peux utiliser le modèle GPT de ton choix
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message }
      ],
      max_tokens: 150
    })
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

// Fonction pour afficher un message dans la boîte de chat
function displayMessage(message, sender = 'user') {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add('message');
  messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Pour faire défiler le chat vers le bas
}

// Fonction qui gère l'envoi du message
sendBtn.addEventListener('click', async () => {
  const message = userInput.value.trim();
  if (message) {
    displayMessage(message, 'user');
    userInput.value = '';

    // Envoi du message à l'API et affichage de la réponse
    const botResponse = await sendMessageToAPI(message);
    displayMessage(botResponse, 'bot');
  }
});

// Pour permettre l'envoi avec la touche "Entrée"
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendBtn.click();
  }
});

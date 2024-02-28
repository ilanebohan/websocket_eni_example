const ws = new WebSocket('ws://10.11.200.36:8080');

ws.onopen = function open() {
    console.log('Connexion établie.');

    ws.send('Hello from client!');
};

ws.onmessage = function incoming(event) {
    //
    const messageBox = document.getElementById("receive-message");

    // message créer 
    const messageDiv = document.createElement('div');
    messageDiv.className = "message";
    messageDiv.textContent = event.data;

    messageBox.appendChild(messageDiv);
};

ws.onclose = function close() {
    console.log('Connexion fermée.');
};

function sendMessage(event) {

    event.preventDefault();

    const input = document.getElementById("input-test");

    const message = input.value;

    ws.send(message);
}

// Écouter l'événement de soumission du formulaire
const form = document.getElementById('form-message');
form.addEventListener('submit', sendMessage);

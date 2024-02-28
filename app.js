const WebSocket = require('ws');

const wss = new WebSocket.Server({ host: '10.11.200.36', port: 8080 });

const clients = [];

wss.on('connection', function connection(ws) {
  console.log('Nouvelle connexion établie.');

  // Push dans les clients
  clients.push(ws);

  ws.on('message', function incoming(message) {
    console.log('Message reçu : %s', message); 
    // pas mutlicast
    //ws.send('Message reçu par le serveur : ' + message);

    // multicast
    clients.forEach(client => {
        if (client.readyState == WebSocket.OPEN){
            client.send('Message reçu par le serveur : ' + message);
        }
    });
  });


  ws.on('close', function close() {
    console.log('Connexion fermée.');

    clients.slice(clients.indexOf(ws), 1);
  });
});
/*
 * In Order to run this Demo you must first install the packages needed.
 * You will have to make sure you are in the currect folder where this file
 * is located aling with the package.json
 * in the node terminal window you will need to run the command
 * npm install
 * it will know to find package.json and auto install
 * the files needed to run this sample app.
 */
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 3000}),
    clients = [],
    messages = [];
  
  
wss.on('connection', function(ws) {
        
    var index = clients.push(ws) - 1;   
    
    //console.log(wss.clients);       
        
    var msgText = messages.join('<br />'); 
    ws.send(msgText);
    
    
     ws.on('message', function(message) {
        messages.push(message);
        console.log('received: %s from %s', message, index);
        
         wss.clients.forEach(function (conn) {
          conn.send(message);
        });
        
    });
});
var http = require('http');
var url = require('url');

http.createServer(function (request, response) {
    
    /* Will give you the path name with no parameters */
    var pathName = url.parse(request.url).pathname;

   /* Send the HTTP header 
    * HTTP Status: 200 : OK
    * Content Type: text/html 
    */
   response.writeHead(200, {'Content-Type': 'text/html'});
   
   response.write('<!DOCTYPE html><html><body><div>Request for ' + pathName + ' received</div></body></html>');
   response.end();
   
}).listen(3000);

/* Console will print the message */
console.log('Server running at http://localhost:3000/');



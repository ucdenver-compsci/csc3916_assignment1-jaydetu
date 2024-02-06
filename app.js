/* server w/o node
var server = require("http").createServer();

server.on("request", (request, response) => {
    var body = [];
    request.on("data", chunk => {
        body.push(chunk);
    });
    request
        .on("end", () => {
            let bodyString = body.concat().toString();
            console.log(bodyString);
            response.end(bodyString);
        })
        .on("error", () => {
            response.statusCode = 400;
            response.end();
        });
    response.on("error", err => {
        console.error(err);
    });
});
server.listen(process.env.PORT || 8008, () => {
    console.log("Server listening at 8008");
});
module.exports = server; // for testing
*/

// using node express
var express = require('express');
var app = express(); 
var bodyPaser = require('body-parser');

app.use(bodyPaser.text({type: '*/*' }));

app.post('/', function(req, res){
    var body = req.body; 

    if (req.get('Content-Type')){
        console.log(req.get('Content-Type'));
        res = res.type(req.get('Content-Type'));
    }
    res.send(body); 
});

app.listen(process.env.PORT || 8008, function(){
    console.log("Server listening at 8008");
});

module.exports = app; // for testing

//curl -d "echo" -H "Content-Type: text" -X POST http://localhost:8008

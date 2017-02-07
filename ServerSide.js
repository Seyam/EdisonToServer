var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.listen(5000);
console.log('Server started!');

app.post('/testbody', function(req, res) {
    console.log(req.body); // the posted data
    res.send({ status: 'SUCCESS' });
});
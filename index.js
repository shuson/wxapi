var express = require('express');
var app = express();
var sha1 = require('sha1');
var weixin = require('./Weixin');

var token = 'wxapiAtDigitalOcean';

app.set('port', (process.env.PORT || 80))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
	console.log(req.query.echostr)
    if (weixin.checkSignature(req)) {
        res.send(200, req.query.echostr);
    } else {
        res.send(200, 'fail');
    }
});

app.get('/helloworld',function(req,res){
	res.send("hello world!");
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

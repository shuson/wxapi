var express = require('express')
var app = express();
var sha1 = require('sha1')

var token = 'wxapiAtDigitalOcean';

app.set('port', (process.env.PORT || 80))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
	console.log(req.params.echostr)
    if (checkSignature(req)) {
        res.send(200, req.params.echostr);
    } else {
        res.send(200, 'fail');
    }
});

app.get('/helloworld',function(req,res){

	res.send("hello world!");
});

var checkSignature = function(req) {    		
	
	// get params
	var signature = req.query.signature;
	var timestamp = req.query.timestamp;
	var nonce = req.query.nonce;
	var echostr = req.query.echostr;
	
	// sort by dict order
	var array = [token, timestamp, nonce];
	array.sort();
	
	// cat them
	var str = sha1(array.join(""));
	console.log(str)
	if(str == signature) {
		return true;
	} else {
		return false;
	}
}

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

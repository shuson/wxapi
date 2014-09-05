var express = require('express')
var app = express();

var token = 'wxapiAtDigitalOcean';

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {

    if (checkSignature(req)) {
        res.send(200, req.query.echostr);
    } else {
        res.send(200, 'fail');
    }
});

app.get('/helloworld',function(req,res){

	res.send("hello world!");
});

var checkSignature = function(req) {    		
	
	// get params
	var signature = req.query.signature,
	var timestamp = req.query.timestamp,
	var nonce = req.query.nonce,
	var echostr = req.query.echostr;
	
	// sort by dict order
	var array = [token, timestamp, nonce];
	array.sort();
	
	// cat them
	var str = sha1(array.join(""));
	
	if(str == signature) {
		return true;
	} else {
		return false;
	}
}

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

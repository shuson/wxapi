var express = require('express')
var app = express();

token = 'wxapiAtHeroku';

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
	
	// 获取校验参数
	var signature = req.query.signature,
	var timestamp = req.query.timestamp,
	var nonce = req.query.nonce,
	var echostr = req.query.echostr;
	
	// 按照字典排序
	var array = [token, timestamp, nonce];
	array.sort();
	
	// 连接
	var str = sha1(array.join(""));
	
	// 对比签名
	if(str == signature) {
		return true;
	} else {
		return false;
	}
}

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

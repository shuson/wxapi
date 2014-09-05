var express = require('express');
var app = express();
var weixin = require('./Weixin');

weixin.token = 'wxapiAtDigitalOcean';

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

weixin.textMsg(function(msg) {
    console.log("textMsg received");
    console.log(JSON.stringify(msg));

    var resMsg = {};

    switch (msg.content) {
        case "test" :
            // 返回文本消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : "this is test from server!",
                funcFlag : 0
            };
            break;
    }

    weixin.sendMsg(resMsg);
});

app.get('/helloworld',function(req,res){
	res.send("hello world!");
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

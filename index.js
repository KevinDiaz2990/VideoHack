"use strict";


var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 8080));
var apiKey = '45233072';
var apiSecret = 'fdf23112e8361c76d92f98bae403982eafd767c8';

var OpenTok = require('opentok'),
	opentok = new OpenTok(apiKey, apiSecret);

opentok.createSession(function(err, session){
	if(err) throw err;
	app.set('sessionId', session.sessionId);
	init();

});

function getData(){
	var sessionId = app.get('sessionId');
	var token = opentok.generateToken(sessionId);
	var data = {
		apiKey: apiKey,
		sessionId: sessionId,
		token: token
	};
	
	return data;
}

app.get('/', function(request, response){
	
	
	response.render('example', {});
});

app.get('/data', function(request, response){
	var send = getData();
	response.send(send);
});

function init(){
	app.listen(app.get('port'));
	console.log("listening at " + app.get('port'));
}


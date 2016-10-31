var express = require('express');
var qs = require('qs');
var request = require('superagent');
var hpn = express();
hpn.set('host', 'https://happinessometer.herokuapp.com');
hpn.set('version', 'v1');
//hpn.set('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYXN0TmFtZSI6IkhWIiwiZmlyc3ROYW1lIjoiT3p6IiwiZW1haWwiOiJvaGVycmVyYUBuZWFyc29mdC5jb20ifQ.zGztgyqEHsfkv0r00jkJADEoxdErmuJN84y-ZbPgm_A'); //oherrera QA
//hpn.set('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYXN0TmFtZSI6Inp6IiwiZmlyc3ROYW1lIjoiT3p6IiwiZW1haWwiOiJ3ZG9uZXRAbmVhcnNvZnQuY29tIn0.zWUn761lCy6OfpUqzOTdecl8oM5mSBjHpClT0vyVrnQ'); //wdonet QA
hpn.set('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYXN0TmFtZSI6IkludHJvZHVjZWQiLCJmaXJzdE5hbWUiOiJNYW51YWxseSIsImVtYWlsIjoid2RvbmV0QG5lYXJzb2Z0LmNvbSJ9.-U3F8G7fkAEX0tJKbp5hHVuahjKshEJq9nPaNjRKYts'); // wdonet PROD
hpn.set('port', (process.env.PORT || 8080));

hpn.use(express.static(__dirname + '/public'));
hpn.set('views', __dirname + '/views');
hpn.set('view engine', 'ejs');

// functions
function url(uri) {
    return hpn.get('host') + '/' + hpn.get('version') + uri;
}

function postMood(mood) {
    console.log("\nRequesting Office Mood : " + mood);
    request.post(url('/users/me/moods'))
        .send({ mood : mood, comment : '', user: 'wdonet@nearsoft.com'}) //no msg due to not affect analysis of messages
        .set('Accept', 'application/json')
        .set('Authorization', 'Token ' + hpn.get('token'))
        .end(function(err, res){
            if (err) {
                console.log("\n-Error: " + JSON.stringify(err));
            }
            else {
                console.log("\n-Response: " + JSON.stringify(res));
            }
        });;
}

// routes
hpn.get('/', function (req, res) {
    res.render('index');
});

hpn.post('/im/good', function(req, res) {
    postMood('good');
});
hpn.post('/im/neutral', function(req, res) {
    postMood('neutral');
});
hpn.post('/im/bad', function(req, res) {
    postMood('bad');
});

// listening on
hpn.listen(hpn.get('port'), function() {
    console.log('Listening on port ' + hpn.get('port'));
});

var express = require('express');
var qs = require('qs');
var http = require('http');
var request = require('superagent');
var hpn = express();
hpn.set('host', 'https://hppnssomtr.herokuapp.com');
hpn.set('version', 'v1');
hpn.set('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYXN0TmFtZSI6IkhWIiwiZmlyc3ROYW1lIjoiT3p6IiwiZW1haWwiOiJvaGVycmVyYUBuZWFyc29mdC5jb20ifQ.zGztgyqEHsfkv0r00jkJADEoxdErmuJN84y-ZbPgm_A');
hpn.set('port', (process.env.PORT || 8080));

hpn.use(express.static(__dirname + '/public'));
hpn.set('views', __dirname + '/views');
hpn.set('view engine', 'ejs');

// functions
function url(uri) {
    return hpn.get('host') + '/' + hpn.get('version') + uri;
}

function postMood(mood, msg) {
    console.log("\nRequest [" + mood + "] - '" + msg + "'");
    request.post(url('/users/me/moods'))
        .send({ mood : mood, comment : msg, user: 'oherrera@nearsoft.com'})
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

hpn.post('/im/happy', function(req, res) {
    postMood('good', 'I am feeling happy ᕕ( ᐛ )ᕗ');
});

hpn.post('/im/sad', function(req, res) {
    postMood('bad', 'I am so sad :(');
});

hpn.post('/im/angry', function(req, res) {
    postMood('bad', 'I am too angry ლ(ಠ益ಠ)ლ ');
});

hpn.post('/im/inlove', function(req, res) {
    postMood('good', 'I am in ♥');
});

hpn.post('/im/cool', function(req, res) {
    postMood('good', 'This is so cool !⊂(◉‿◉)');
});

hpn.post('/im/sleepy', function(req, res) {
    postMood('neutral', 'I am feeling sleepy');
});

// listening on
hpn.listen(hpn.get('port'), function() {
    console.log('Listening on port ' + hpn.get('port'));
});

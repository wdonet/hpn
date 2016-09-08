var express = require('express');
var qs = require('qs');
var http = require('http');
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

function buildOptions(uri, data) {
    var host = hpn.get('host');
    var path = '/' + hpn.get('version') + uri;
    var token = 'Token ' + hpn.get('token');
    return {
        host: host,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data),
            'Authorization': token
        }
    };
}

function buildMood(mood, msg) {
    return qs.stringify({ mood : mood, comment : msg,
         user: 'oherrera@nearsoft.com'});
}

// routes
hpn.get('/', function (req, res) {
    res.render('index');
});

hpn.post('/im/happy', function(req, res) {
    console.log("RQ to " + url('/users/me/moods'));
    var mood = buildMood('good', 'I am feeling happy');
    console.log("With Mood: " + mood);
    var options = buildOptions('/users/me/moods', mood);
    console.log("And Options: " + JSON.stringify(options));
    var postReq = http.request(options, function(rs) {
        console.log('RS STATUS: ' + rs.statusCode);
        console.log('RS HEADERS: ' + JSON.stringify(rs.headers));
        rs.setEncoding('utf8');
        rs.on('data', function(chunk) {
            console.log('RS BODY: ' + chunk);
        });
    });
    postReq.on('error', function(e) {
        console.log('ERROR: ' + e.message);
    });
    postReq.write(mood);
    postReq.end();
});

// listening on
hpn.listen(hpn.get('port'), function() {
    console.log('Listening on port ' + hpn.get('port'));
});

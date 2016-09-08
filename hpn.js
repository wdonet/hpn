var express = require('express');
var hpn = express();
hpn.set('host', 'https://hppnssomtr.herokuapp.com/v1/users/me/moods');
hpn.set('version', 'v1');
hpn.set('port', (process.env.PORT || 8080));

hpn.use(express.static(__dirname + '/public'));
hpn.set('views', __dirname + '/views');
hpn.set('view engine', 'ejs');

// functions
function url(uri) {
    return hpn.get('host') + '/' + hpn.get('version') + uri;
}

// routes
hpn.get('/', function (req, res) {
    res.render('index');
});

hpn.post('/im/happy', function(req, res) {
    console.log("Im happy to call " + url('/users/me/moods'));
});

// listening on
hpn.listen(hpn.get('port'), function() {
    console.log('Listening on port ' + hpn.get('port'));
});

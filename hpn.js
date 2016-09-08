var express = require('express');
var hpn = express();
hpn.set('port', (process.env.PORT || 8080));
hpn.use(express.static(__dirname + '/public'));
hpn.set('views', __dirname + '/views');
hpn.set('view engine', 'ejs')
;
hpn.get('/', function (req, res) {
    //res.send("<h3>Hi</h3>");
    res.render('index');
});

hpn.listen(hpn.get('port'), function() {
    console.log('Listening on port ' + hpn.get('port'));
});

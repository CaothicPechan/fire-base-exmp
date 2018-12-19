'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _proxyKey = require('../proxy-key.json');

var _proxyKey2 = _interopRequireDefault(_proxyKey);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 8000;
var urlFirebase = 'https://private-callproxy-db.firebaseio.com';

app.set('port', process.env.PORT || port);

app.use(_bodyParser2.default.json());

app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.json({
    response: 'Hello index deploy for Firebase!'
  });
});

app.listen(app.get('port'), function () {
  console.log('Running on port: ', app.get('port'));
});

admin.initializeApp({
  credential: admin.credential.cert(_proxyKey2.default),
  databaseURL: urlFirebase
});

var db = admin.database();
var ref = db.ref('/users');

app.get('/users', function (req, res) {
  ref.on("value", function (snapshot) {
    console.log(snapshot.val());
    res.json(snapshot.val());
    res.status(200);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});
//# sourceMappingURL=app.js.map
import express from 'express'
import bodyParser from 'body-parser'
import * as admin from 'firebase-admin';
import serviceAccount from '../proxy-key.json'



const app = express();
var port = 8000;
var urlFirebase = 'https://private-callproxy-db.firebaseio.com';

app.set('port', (process.env.PORT || port))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
  res.json({
      response: 'Hello index deploy for Firebase!'
  });
});



app.listen(app.get('port'), function () {
    console.log('Running on port: ', app.get('port'))
})    


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: urlFirebase
});

var db = admin.database();
var ref = db.ref('/users');


app.get('/users', (req,res) => {
  ref.on("value", function(snapshot) {
    console.log(snapshot.val());
    res.json(snapshot.val());
    res.status(200);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


});




var express = require('express');
var path = require("path");
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require('mongodb')
var ObjectID = mongodb.ObjectID;
var SampleText = require('./api/sample');
var User = require('./api/user');

var CONTACTS_COLLECTION = "contacts";
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
// Body Parser Configuration
// Retrieving data from the body of the post
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// PORT
var port = process.env.PORT || 3000;

// DATABASE CONNECTION
/*
var dbUsername = "db_user";
var dbPassword = "NueveSol@9";
mongoose.connect('mongodb://' + dbUsername + ':' + dbPassword + '@ds153689.mlab.com:53689/heroku_5lw5fr63');
*/

var MongoClient = mongodb.MongoClient;
var dbUsername = "dbuser";
var dbPassword = "Nueve9";
var url = 'mongodb://dbuser:Nueve9@ds125126.mlab.com:25126/heroku_wp8qdw6r';

/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
*/
// API ROUTES
var router = express.Router();

// Routes
app.use('/api', router);


router.get('/', function(req, res) {
res.json({message: 'Welcome to our API'});
});

router.route('/users')
.post(function(req, res){
 var user = new User(); // new instance of vehicle
 user.username = req.body.username;
 user.email = req.body.email;
 user.password = req.body.password;
 user.phone = req.body.phone;
 user.save(function(err){
 if(err){
 res.send(err);
 }
 res.json({message: 'User was successfully inserted'});
 });
})
.get(function(req, res) {
   User.find(function(err, users) {
  if(err) {
  res.send(err);
  }
  res.json(users);
  });
 });

router.route('/sampleText')
.post(function(req, res){
 var sampleText = new SampleText(); // new instance of vehicle
 sampleText.sampleText = req.body.sampleText;
 sampleText.save(function(err){
 if(err){
 res.send(err);
 }
 res.json({message: 'Sample Text was successfully inserted'});
 });
})
.get(function(req, res) {
   SampleText.find(function(err, sampleText) {
  if(err) {
  res.send(err);
  }
  res.json(sampleText);
  });
 });


app.listen(process.env.PORT || 3000, function(){
  console.log('listening on', app.address().port);
});

// Server
app.listen(port);

// Print
console.log('Server running port: ' + port);



/*
// Connect to the database before starting the application server.
MongoClient.connect(url, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready!!");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});
*/
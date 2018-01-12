var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var SampleText = require('./api/sample');
var User = require('./api/user');
// Body Parser Configuration
// Retrieving data from the body of the post
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// PORT
var port = process.env.PORT || 3000;

// DATABASE CONNECTION
mongoose.connect('mongodb://dbuser:Nueve9@ds125126.mlab.com:25126/heroku_wp8qdw6r');
// DATABASE CONNECTION
/*
var dbUsername = "db_user";
var dbPassword = "NueveSol@9";
mongoose.connect('mongodb://' + dbUsername + ':' + dbPassword + '@ds153689.mlab.com:53689/heroku_5lw5fr63');
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
 
 
 
    user.find({phone : req.body.phone}, function (err, docs) 
    {
        if (docs.length){
            //err('Phone already exists',null);
			res.json({message: 'Phone already exists'});
        }
		else
		{
			 user.save(function(err){
			 if(err){
			 res.send(err);
			 }
			 res.json({message: 'Successfully Registered'});
			 });
            
        });
    }
 

 
 
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
 
 router.route('/getusers')
.get(function(req, res) {
   User.find(function(err, user) {
  if(err) {
  res.send(err);
  }
  res.json(user);
  });
 });




// Server
app.listen(port);

// Print
console.log('Server running port: ' + port);
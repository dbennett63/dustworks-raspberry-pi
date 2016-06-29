var http      = require('http');
var express   = require('express');

var app       = express();
var gpio = require("gpio");
var red, yellow, green;

app.use(express.static(__dirname));

//Init the pins
green = gpio.export(22, {
   ready: function() {
   }
});
yellow = gpio.export(18, {
   ready: function() {
   }
});
red = gpio.export(17, {
   ready: function() {
   }
});

// Toggle green input
app.get('/green', function (req, res) {
  if (green.value==0) {
    console.log('Green turned on');
    green.set();
  }
  else {
    console.log('Green turned off');
    green.reset();
  }
  res.status(200).send('Green changed: ' + green.value);
});

//Toggle yellow input
app.get('/yellow', function (req, res) {
  // send an object as a JSON string
  if (yellow.value==0) {
    console.log('Yellow turned on'); 
    yellow.set();
  }
  else {
    console.log('Yellow turned off'); 
    yellow.reset();
  }
  res.status(200).send('Yellow changed: ' + yellow.value);
});

// Toggle red input
app.get('/red', function (req, res) {
  // send an object as a JSON string
  if (red.value==0) {
    console.log('Red turned on');   
    red.set();
  }
  else {
    console.log('Red turned off'); 
    red.reset();
  }
  res.status(200).send('Red changed: ' + red.value);
});

// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
});

// ------------------------------------------------------------------------
// Start Express App Server
//
app.listen(3000);
console.log('App Server is listening on port 3000');

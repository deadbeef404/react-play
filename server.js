var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

var low = require('lowdb');
var db = low('db.json');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


function getLatestComments(callback) {
  callback(db('comments'));
}

app.get('/api/comments', function(req, res) {
  res.type('text/plain');
  getLatestComments(function(data){
    res.send(data);
  });
});

app.post('/api/comments', function(req, res) {
  res.type('text/plain');
  db.object.comments.push(req.body);
  db.save();
  res.send(db.object.comments);
});

app.listen(8001);

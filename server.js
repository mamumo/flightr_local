var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectID = mongodb.ObjectID;
var path = require('path');

app.use(bodyParser.json());
app.use(express.static('client/build'));


app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get('/user', function( req, res ) {
  res.sendFile( path.join( __dirname + '/client/src/models/user.js' ))
})


app.use(express.static('client/build'));


var server = app.listen(3000, function () {
 var host = server.address().address;
 var port = server.address().port;

 console.log('Example app listening at http://%s:%s', host, port);
});

app.get("/airports/:code", function(req,res){
 MongoClient.connect('mongodb://localhost:27017/airportsAPI', function(err, db){
   var collection = db.collection('airports');
   collection.find({
    'code': {'$eq': req.params.code}
   }).toArray(function(err, docs){
     console.log(docs);
     res.json(docs);
     db.close();
   })
 })
})

var url = 'mongodb://localhost:27017/users'

app.get('/users', function(req, res){
 MongoClient.connect(url, function( err, db ){
   var collection = db.collection('user');
   collection.find({}).toArray( function(err, docs){
    console.log( "Hiajshsjshajahsjahsjah")
     res.json(docs);
     db.close(); 
   })
 })
})

app.post('/users', function(req, res){
 
 // res.status(200).end();
 MongoClient.connect(userUrl, function( err, db ){
 var collection = db.collection('user');
 console.log( "HELAJSJDLKAKHSDKJAHSKJDHK" )
 console.log( req.body )
 collection.insert( req.body )
 res.status(200).end();
 db.close()
})
})

 app.put('/users/:id', function(req, res){
  MongoClient.connect( userUrl, function(err, db){
    var collection = db.collection('users');
    collection.update( {_id: new ObjectID(req.params.id)}, {$set:req.body} )
    res.status(200).end();
    db.close();
  })
 })


// here we are not creating or updating we are just retrieving info
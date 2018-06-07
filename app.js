const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/entryexit');
mongoose.connection.once('open', function(){
    console.log('connection established');
}).on('error', function(error){
    console.log(error);
});

app.listen(3000);
app.use(bodyParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
});

var dataSchema = mongoose.Schema({
    date: String,
    name: String,
    entry: String,
    exit: String
});

var DataModel = mongoose.model('dateModel', dataSchema);




app.post('/post/entry', function(req, res){
    console.log(req.body);
    var d = new Date();
    var g = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
    var en = d.getHours() +':'+ d.getMinutes();

    var query = {'date':g};
    DataModel.find( query, function(err, doc){
        if (Object.keys(doc).length > 1){
            return res.send("boooooo");
        }else{
            new DataModel({
                date: g,
                name: req.body.name,
                entry: en,
                exit: null
            }).save().then(function(){       
                 res.redirect('/');
            });
        }
    });




app.post('/post/exit', function(req, res){    
    var d = new Date();
    var g = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
    var en = d.getHours() +':'+ d.getMinutes();

var query = {'date':g};
DataModel.find( query, function(err, doc){
    if (Object.keys(doc).length > 1){
        return res.send("boooooo");
    }else{
        DataModel.findOneAndUpdate(query, { $set: { exit:  en}}, {upsert:true}, function(err, doc){
            if (err) return res.send(500, { error: err });
            return res.redirect('/');
        });
        }
    })
});





app.get('/show', function(req, res){
   DataModel.find({}, function(err, dbdata){
        res.send(dbdata);
   });
});
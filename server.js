const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/meanoffice');
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

  app.use(express.static('ng-office'))
  app.get('/',function(req, res){
    res.sendFile(__dirname + '/ng-office/index.html');
});


var dataSchema = mongoose.Schema({
    date: String,
    username: String,
    entry: String,
    exit: String
});


var DataModel = mongoose.model('dateModel', dataSchema);


var userSchema = mongoose.Schema({
	username: String,
	password: String,
	email: String
});

var UserModel = mongoose.model('userModel', userSchema);

app.post('/post/entry', function(req, res){
    console.log(req.body);
    var d = new Date();
    var g = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
    var en = d.getHours() +':'+ d.getMinutes();

    var query = {'date':g  ,'username' : req.body.username};
    DataModel.find( query, function(err, doc){
        if (Object.keys(doc).length > 0){
            return res.json({'msg':"already done for today"});
        }else{
            new DataModel({
                date: g,
                username: req.body.username,
                entry: en,
                exit: null
            }).save().then(function(){       
                 res.json({'msg': 'entry posted'});
            });
        }
    });
});


app.post('/post/exit', function(req, res){    
    var d = new Date();
    var g = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
    var en = d.getHours() +':'+ d.getMinutes();
    var query = {'date':g  ,'username' : req.body.usernames};
DataModel.find( query, function(err, doc){
    if (Object.keys(doc).length > 1){
        return res.send("already done for today");
    }else{
        if(doc[0].exit == null || doc[0].exit == undefined ){
            doc[0].save(function(err){
                doc[0].exit= en;
                doc[0].save(function () {
                    
                });
                res.send('exit posted');
            });

        console.log(doc[0].exit);
        }else{
            return res.send("data has been already written");
        }
        
        }
    })
});


app.get('/show', function(req, res){
    DataModel.find({}, function(err, dbdata){
         res.send(dbdata);
    });
 });


app.post('/createUser', function(req, res){


    var query = {'email':req.body.email};
    UserModel.find(query, function(err, data){
        if (Object.keys(data).length > 0){
            return res.json("email already registered");
        }else{
            new UserModel({
                username: req.body.username,
                password: req.body.password,
                email:	req.body.email,
            }).save().then(function(){       
                 res.json({'success' : true, 'user' :data});
            });
        }
    })
})

app.post('/login', function(req, res){
    var query = {'email':req.body.email};
    UserModel.find(query, function(err, data){
        if(data[0] != null){
            return res.json({'success' : true, 'user' : data});
        }else{
            return res.json({'success': false});
        }
        
    })
})
require('./config/config');
const path = require('path');
const express = require('express');
const {MusicSheet} = require('./models/musicsheet');
<<<<<<< HEAD
=======
const {botrouter} = require('./linebot/bot');
>>>>>>> da31b86... Add line bot
const _ = require('lodash');
var {mongoose} = require('./db/mongoose');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var app = express();

const publicpath = path.join(__dirname,'../public');
var router = express.Router();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
<<<<<<< HEAD
app.use(favicon(publicpath + "/img/favicon.ico"));
=======
app.use(favicon(publicpath + "/img/icons/favicon.ico"));
>>>>>>> eb964b0... add icon image
app.use(express.static(publicpath));

router.route('/add').post((req,res)=>{
  var musicsheet = new MusicSheet({
    id:req.body.id,
    name:req.body.name,
    author:req.body.author
  });

 musicsheet.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

router.route('/patch/:id').patch((req,res)=>{
  var _id = mongoose.Types.ObjectId(req.params.id);
  var body = _.pick(req.body,['id','name','author']);

  MusicSheet.findByIdAndUpdate(_id,{$set: body},{new:true}).then((data)=>{
    if(!data){
      return res.status(404).send();
    }
    res.send(data);
  }).catch((e)=>res.status(404).send());
});

router.route('/delete/:id').delete((req,res)=>{
  var _id = mongoose.Types.ObjectId(req.params.id);
  MusicSheet.findByIdAndRemove(_id).then((data)=>{
    if(!data){
        return res.status(404).send();
    }
    res.send(data);

  }).catch((e)=>res.status(404).send());
});


router.route('/find').get((req,res)=>{
  MusicSheet.find().sort({id : 'asc'}).then((data)=>{
    if(!data[0]){
      res.status(404).send();
    }
    res.send(data);
  }).catch((e)=>res.status(404).send());
});

router.route('/find/:name').get((req,res)=>{
  var name = new RegExp(decodeURI(req.params.name), 'i');
  MusicSheet.find({name}).then((data)=>{
    if(!data[0]){
      res.status(404).send();
    }
    res.send(data);
  }).catch((e)=>res.status(404).send());
});



app.use('/api',router);

app.listen(port,()=>{
  console.log('Started up at '+port);
});

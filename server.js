require('./config/config');
const express = require('express');
const {MusicSheet} = require('./models/musicsheet');
var {mongoose} = require('./db/mongoose');

var bodyParser = require('body-parser');
var app = express();

var router = express.Router();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

router.route('/add').post((req,res)=>{
  var musicsheet = new MusicSheet({
    id:req.body.id,
    name:req.body.name,
    auther:req.body.auther
  });

 musicsheet.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

router.route('/delete/:id').delete((req,res)=>{
  var id = req.params.id;
  MusicSheet.findOneAndRemove({id}).then((data)=>{
    if(!data){
        return res.status(404).send();
    }
    res.send({data});

  }).catch((e)=>res.status(404).send());
});

router.route('/find/:name').get((req,res)=>{
  var name = new RegExp(decodeURI(req.params.name), 'i');
  MusicSheet.find({name}).then((data)=>{
    if(!data){
      res.status(404).send();
    }
    res.send({data});
  }).catch((e)=>res.status(404).send());
});



app.use('/api',router);

app.listen(port,()=>{
  console.log('Started up at '+port);
});

require('./config/config');
const path = require('path');
const express = require('express');

const {botrouter} = require('./router/bot');
const {apirouter} = require('./router/api');


var favicon = require('serve-favicon');
var app = express();

const publicpath = path.join(__dirname,'../public');

var port = process.env.PORT || 3000;

app.use(favicon(publicpath + "/img/icons/favicon.ico"));
app.use(express.static(publicpath));



app.use('/api',apirouter);
app.use('/bot',botrouter);

app.listen(port,()=>{
  console.log('Started up at '+port);
});

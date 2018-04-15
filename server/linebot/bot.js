var linebot = require('linebot');
var express = require('express');
var request = require('request');

var botrouter = express.Router();
const app = express();

var bot = linebot({
  channelId: process.env.ChannelId,
  channelSecret: process.env.ChannelSecret,
  channelAccessToken: process.env.ChannelAccessToken
});

<<<<<<< HEAD:server/linebot/bot.js
bot.on('message', function(event) {
  console.log(event);
=======
bot.on('message', function (event) {
<<<<<<< HEAD:server/linebot/bot.js
  var text = event.message.text;
request('./../api/find/'+text, function (error, response, body) {
=======
  var text = encodeURI(event.message.text);
  console.log(event.message.text);
request('https://afternoon-stream-99518.herokuapp.com/api/find/'+text, function (error, response, body) {
>>>>>>> 552c303... linebot edit:server/router/bot.js
  if(!error){
    event.reply(body.id).then(function (data) {
      
    }).catch(function (error) {

    });
  }
});

<<<<<<< HEAD:server/linebot/bot.js
  });
>>>>>>> cca7acd... router edit:server/router/bot.js
=======
>>>>>>> b7b9034... bot add:server/router/bot.js
});


const linebotParser = bot.parser();
botrouter.post('/', linebotParser);

module.exports = {botrouter};

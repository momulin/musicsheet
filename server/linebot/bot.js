var linebot = require('linebot');
var express = require('express');

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
  event.reply(event.message.text).then(function (data) {
    console.log(data);
  }).catch(function (error) {

  });
>>>>>>> cca7acd... router edit:server/router/bot.js
});


const linebotParser = bot.parser();
botrouter.post('/', linebotParser);

module.exports = {botrouter};

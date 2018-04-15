var linebot = require('linebot');
var express = require('express');

var botrouter = express.Router();
const app = express();

var bot = linebot({
  channelId: process.env.channelId,
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken
});

bot.on('message', function(event) {
  console.log(event);
});


const linebotParser = bot.parser();
botrouter.post('/', linebotParser);

module.exports = {botrouter};

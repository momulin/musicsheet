var linebot = require('linebot');
var express = require('express');
var request = require('request');

var router = express.Router();
const app = express();

var bot = linebot({
  channelId: process.env.ChannelId,
  channelSecret: process.env.ChannelSecret,
  channelAccessToken: process.env.ChannelAccessToken
});

bot.on('message', function (event) {
  var text = encodeURI(event.message.text);
  var reqURL = process.env.Domain_URL + "api/find/" + text;

request(reqURL, function (error, response, body) {
  if(!error && response.statusCode==200){
    var object = JSON.parse(body);
    var resMessage = "";
    for(var index in object) {
        resMessage += `${object[index].id} : ${object[index].name} : ${object[index].author}\n`;
    }

    event.reply(resMessage).then(function (data) {
      console.log(resMessage);
    }).catch(function (error) {

    });
  }
});

});


const linebotParser = bot.parser();
router.post('/', linebotParser);

module.exports.botrouter = router;

var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true,
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');

    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {

    console.log(evt.d.mentions);
/*console.log(evt);*/
let regexp = /\!thanks/gmi;
let bot = [];
evt.d.mentions.forEach(function(item, i, mentions) {
    bot.push(item.username);
     return bot;  
  })

/*var message = evt.d.author.username+ " поблагодарил(a) кого-то вроде (Safiya's bot)" +bot;*/

if (regexp.test(message)) {
    bot.sendMessage({
        to: channelID,
        message: mentions.forEach(function(item, i, mentions) {
           evt.d.author.username+ " поблагодарил(a) кого-то вроде (Safiya's bot)" +bot;
           /*Скажите, что я пытаюсь вообще сделать??Я всего лишь хочу перебрать username в цикле и отображать в message*/
       })
    });
}
});


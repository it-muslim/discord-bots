/*var Discord = require('discord.io');
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
    switch(message) {
        case 'Ассаляму аляйкум':
            bot.sendMessage({
                to: channelID,
                message: 'Уа аляйкум салям',
            });

            break;
    }
});*/

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
/*console.log(message);
console.log(user);*/
let regexp = /\!thanks/gmi;
if (regexp.test(message)) {
    bot.sendMessage({
        to: channelID,
        message: mentions.forEach(function(item, i, mentions) {
           evt.d.author.username+ " поблагодарил(a) кого-то вроде (Safiya's bot)" +evt.d.mentions[i].username
           /*Скажите, что я пытаюсь вообще сделать??Я всего лишь хочу перебрать username в цикле и отображать в message(*/
       })



    });
}
});


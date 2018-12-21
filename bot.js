var Discord = require('discord.io');
var logger = require('winston');
var  auth = require('./auth.json');
//Configure logger settings
logger.remove(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
//Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready',  function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    console.log(message);

    var regexp = /\!thanks\b/gmi;

    if (regexp.test(message) && channelID == 525249065039036426 && user !== String) {
         bot.sendMessage({to: channelID, message:  user + " Nobody was mentioned in your message (Aliya's bot)"});
    }
    else if(regexp.test(message) && channelID == 525249065039036426 && user == String){
        bot.sendMessage({to: channelID, message:  user + " thanked in message (Aliya's bot)"});
    }
});

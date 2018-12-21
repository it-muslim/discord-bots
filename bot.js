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

    var regexp = /\!thanks/gmi;

    if(regexp.test(message) && channelID == 525249065039036426) {

        bot.sendMessage({to: channelID, message: "Woohoo,  " + user + " thanked someone! p.s. Aliya's bot"});
    }
});

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
    
    var regexp = /\!thanks\b/gmi;

    var num_Channel = "525249065039036426";

    if(channelID == num_Channel) {

        if (regexp.test(message)) {

            evt.d.mentions.forEach(function(item, i, mentions) {

                bot.sendMessage({to: channelID, message: user + " thanked in message " + evt.d.mentions[i].username + " (Aliya's bot)"})

            });
        }
    }
    // console.log(evt);

});


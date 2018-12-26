var Discord = require('discord.io');
var logger = require('winston');
var  auth = require('./auth.json');

//Configure logger settings
logger.remove(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

//Channel
var num_Channel = "525249065039036426";


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

    //в каком канале пишут?
    if(channelID !== num_Channel) {
        return;
    }

    //содержит нужное слово?
    if (!regexp.test(message)) {
        return;
    }

    //собираю ID упомянутых пользователей
    var mentionedUsersID = evt.d.mentions.map(function(item, i, mentions) {
        return evt.d.mentions[i].id;
    });  
    
    //собираю имена упомянутых пользователей
    var mentionedUsers = evt.d.mentions.map(function(item, i, mentions) {
        return evt.d.mentions[i].username;
    }); 

    var authorID = evt.d.author.id;

    if(!!mentionedUsersID.indexOf(authorID)){
        bot.sendMessage({to: channelID, message:  "не благодари самого себя :exclamation: (Aliya's bot)"})
    } else {
        bot.sendMessage({to: channelID, message: user + " thanked in message  :slight_smile: " + mentionedUsers + " (Aliya's bot)"})
    }
});


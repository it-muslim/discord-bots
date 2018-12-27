const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
const bot = new Discord.Client({
    token: auth.token,
    autorun: true,
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    const regexp = /\!thanks/gmi;
    const bot_user_id = '523928478341660702';
    const allowed_channel = '525249065039036426';
    const authorId = evt.d.author.id;
    const authorName = evt.d.author.username;

    if(channelID !== allowed_channel ||
        authorId === bot_user_id || !regexp.test(message)){
        return;
    }


    let mentionedUserId = evt.d.mentions.map(function(item){
        return item.id;
    });

    let mentionedUserNames = evt.d.mentions.map(function(item){
        return item.username;
    });

    if (!!mentionedUserId.indexOf(authorId)) {
        bot.sendMessage({
            to: channelID,
            message: authorName + " поблагодарил(a) пользователя(ей) "
            + mentionedUserNames.join(', ') + " (Safiya's bot)"

        }); 
    }else{
        bot.sendMessage({
            to: channelID,
            message: "Пардон, но всему свое время и место"
        });
    }

});

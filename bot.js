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
/**/
bot.on('message', function (user, userID, channelID, message, evt) {
    let regexp = /\!thanks/gmi;
    if(channelID !== '525249065039036426' ||
     evt.d.author.id === '523928478341660702' || !(regexp.test(message)) ){
        return;
}
let mentionedUserId = [];
let mentionedUserNames = [];

evt.d.mentions.map(function(item){
    mentionedUserId.push(item.id);
});

evt.d.mentions.map(function(item){
    mentionedUserNames.push(item.username);
});

if (mentionedUserId.indexOf(evt.d.author.id) === -1) {
    bot.sendMessage({
      to: channelID,
      message: evt.d.author.username + " поблагодарил(a) пользователя(ей) "
      + mentionedUserNames.join(', ') + " (Safiya's bot)"
      
  }); 
}else{
    bot.sendMessage({
      to: channelID,
      message: "Пардон, но всему свое время и место"
  });
}
console.log(message);
});

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

  let regexp = /\!thanks/gmi;
  let arrMentionedUsers = [];
  let err = '';
  evt.d.mentions.forEach(function(item) {
    if(evt.d.author.username === item.username){
        err += item.username;
    }else{
        arrMentionedUsers.push(item.username);
        return arrMentionedUsers;
    }
})

  if(channelID !== '525249065039036426'){
    return;
}

if (regexp.test(message) && evt.d.author.username !== err) {
    bot.sendMessage({
      to: channelID,
      message: evt.d.author.username + " поблагодарил(a) пользователя(ей) "
      + arrMentionedUsers.join(', ') + " (Safiya's bot)"
  });
}else if(regexp.test(message) && evt.d.author.username == err){
   bot.sendMessage({
      to: channelID,
      message: "oops"
  });
}
});

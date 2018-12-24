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
	let arrUsernames = [];
	evt.d.mentions.forEach(function(item, i) {
		arrUsernames.push(item.username);
		return arrUsernames;  
	})

	if (regexp.test(message)) {
		bot.sendMessage({
			to: channelID,
			message: evt.d.author.username+ " поблагодарил(a) кого-то вроде (Safiya's bot)" +arrUsernames
		});
	}

});


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

const REGEXP = /\!thanks\b/gmi;
const BOT_ID = '523928478341660702';
const ALLOWED_CHANNELS = '525249065039036426';

bot.on('message', function (user, userID, channelID, message, evt) {

	// Conditions for exiting the function
	if(channelID !== ALLOWED_CHANNELS ||
		userID === BOT_ID || !REGEXP.test(message)) {
		return;
	}

	// Collecting usernames
	let mentionedUserNames = evt.d.mentions.map(item => item.username);

	// Collecting user id
	let mentionedUserId = evt.d.mentions.map(item => item.id);

	// Exit function if no user is mentioned
	if(mentionedUserId.length === 0) {
		return;
	}

	if (!mentionedUserId.includes(userID)) {
		bot.sendMessage({
			to: channelID,
			message: user + " поблагодарил(a) пользователя(ей) "
			+ mentionedUserNames.join(', ') + " (Safiya's bot)"
	}); 
	} else {
		bot.sendMessage({
			to: channelID,
			message: "Нельзя благодарить самого себя"
		});
	}
});

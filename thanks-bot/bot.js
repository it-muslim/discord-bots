const Discord = require('discord.io')
const logger = require('winston')
const auth = require('./auth.json')

// Configure logger settings
logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, {
  colorize: true
})

logger.level = 'debug'

// Initialize Discord Bot
const bot = new Discord.Client({
  token: auth.token,
  autorun: true
})

bot.on('ready', function (evt) {
  logger.info('Connected')
  logger.info('Logged in as: ')
  logger.info(bot.username + ' - (' + bot.id + ')')
})

const BOT_ID = '523928478341660702'
const ALLOWED_CHANNEL_ID = '525249065039036426'

bot.on('message', function (user, userID, channelID, message, evt) {
  const THANKS_MESSAGE_REGEXP = /\!thanks\b/gmi

  // Conditions for exiting the function
  if (channelID !== ALLOWED_CHANNEL_ID ||
    userID === BOT_ID || !THANKS_MESSAGE_REGEXP.test(message)) {
    return
  }

  // Collecting usernames
  let mentionedUserNames = evt.d.mentions.map(item => item.username)

  // Collecting userIds
  let mentionedUserId = evt.d.mentions.map(item => item.id)

  // Exit function if no user is mentioned
  if (mentionedUserId.length === 0) {
    return
  }

  if (!mentionedUserId.includes(userID)) {
    bot.sendMessage({
      to: channelID,
      message: user + ' поблагодарил(a) пользователя(ей) ' +
      mentionedUserNames.join(', ') + ' (Safiya\'s bot)'
    })
  } else {
    bot.sendMessage({
      to: channelID,
      message: 'Нельзя благодарить самого себя'
    })
  }
})

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

const ALLOWED_CHANNEL_ID = '525249065039036426'

bot.on('message', function (user, userID, channelID, message, evt) {
  let thanksMessageRegexp = /!thanks\b/gmi

  // Conditions for exiting the function
  if (channelID !== ALLOWED_CHANNEL_ID ||
    userID === bot.id || !thanksMessageRegexp.test(message)) {
    return
  }

  // Filtering userIDs
  let mentionedUserIDs = evt.d.mentions.filter(item => item.id !== userID)

  // Exit function if no user is mentioned
  if (mentionedUserIDs.length === 0) {
    return
  }

  // Collecting mentionedUserNames
  let mentionedUserNames = mentionedUserIDs.map(item => item.username)

  bot.sendMessage({
    to: channelID,
    message: `${user} поблагодарил(a) пользователя(ей) ` +
    mentionedUserNames.join(', ')
  })
})

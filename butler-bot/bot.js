const Discord = require('discord.io')
const logger = require('winston')
const auth = require('./auth.json')

// Server ID
const SERVER_ID = '441120673109245982'

// Roles
const DESCRIBE_YOURSELF_ROLE = '450966946519711744'

// Configure logger settings
logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, {
  colorize: true
})

logger.level = 'debug'

// Initialize Discord Bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
})

bot.on('ready', function (evt) {
  logger.info('Connected')
  logger.info('Logged in as: ')
  logger.info(bot.username + ' - (' + bot.id + ')')
})

bot.on('any', function (evt) {
  if (evt.t !== 'GUILD_MEMBER_ADD') {
    return
  }
  let user = evt.d.user
  bot.addToRole({
    'serverID': SERVER_ID,
    'userID': user.id,
    'roleID': DESCRIBE_YOURSELF_ROLE
  })
  logger.debug('Added DESCRIBE_YOURSELF_ROLE to ' + user.username)
})

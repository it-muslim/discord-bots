
const Discord = require('discord.js')
const logger = require('winston')
const auth = require('../auth.json')

// Configure logger settings
logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, {
  colorize: true
})

logger.level = 'debug'

// Initialize Discord Bot
const client = new Discord.Client()

client.on('ready', () => {
  logger.info('Connected')
  logger.info('Logged in as: ')
  logger.info(`${client.user.username} - (${client.user.id})`)
})

const ALLOWED_CHANNEL_ID = '525249065039036426'

client.on('message', message => {
  const thanksMessageRegexp = /!thanks\b/gmi

  // Conditions for exiting the function
  if (message.channel.id !== ALLOWED_CHANNEL_ID ||
    message.author.id === client.user.id ||
    message.content !== thanksMessageRegexp.test(message)) {
    return
  }

  // mentioned Users
  let mentionedUsers = message.mentions.users

  // Filtering mentionedUserIDs
  let mentionedUserIDs = mentionedUsers.map(item => item.id)

  // Collecting mentionedUsernames
  let mentionedUsernames = mentionedUsers.map(item => item.username)

  // Exit function if no user is mentioned
  if (mentionedUserIDs.length === 0) {
    return
  }

  // если кто-то упомянут
  if (mentionedUsernames) {
    message.channel.send(`${message.author.username} поблагодарил(a) пользователя(ей):
      ${mentionedUsernames.join(', ')}`
    )
  }
})

client.login(auth.token)

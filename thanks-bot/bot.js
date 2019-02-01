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
const bot = new Discord.Client()

bot.on('ready', function (evt) {
  logger.info('Connected')
})

const ALLOWED_CHANNEL_ID = '525249065039036426'

bot.on('message', message => {
  let thanksMessageRegexp = /!thanks\b/gmi

  // Conditions for exiting the function
  if (message.channel.id !== ALLOWED_CHANNEL_ID ||
    message.content !== thanksMessageRegexp) {
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

  // если упомянул самого себя
  // if (key === message.author.id) {
  //   message.channel.send("Не благодари самого себя :face_palm:")
  // }

  // если кто-то упомянут
  if (mentionedUsernames) {
    message.channel.send(`${message.author.username} поблагодарил(a) пользователя(ей):
      ${mentionedUsernames.join(', ')}`
    )
  }
})

bot.login(auth.token)

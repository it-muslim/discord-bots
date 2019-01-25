const Discord = require('discord.js')
const logger = require('winston')
const auth = require('./auth.json')

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
  logger.info(client.username + ' - (' + client.id + ')')
})

const GREETINGS_CHANNEL_ID = '525249065039036426'

client.on('message', msg => {
  if (msg.channel.id !== GREETINGS_CHANNEL_ID || msg.author.bot) {
    return
  }

  let greetingsChannel = client.channels.get(GREETINGS_CHANNEL_ID)

  let timeNow = new Date()
  console.log(timeNow)
  let timeMemberJoin = msg.member.joinedAt
  console.log(timeMemberJoin)
  let timeDifference = (new Date(timeNow).getTime() - new Date(timeMemberJoin).getTime()) / 1000 / 60 / 60 / 24
  console.log(timeDifference)
  if (timeDifference > 7) {
    greetingsChannel.send(
      `Вы скоро будете удалены из сообщества`)
  } else {
    greetingsChannel.send(
      `Не забываем рассказать о себе`)
  }
})

client.login(auth.token)

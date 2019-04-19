const Discord = require('discord.js')
const logger = require('winston')
const auth = require('./auth.json')

// Roles
const DESCRIBE_YOURSELF_ROLE_ID = '450966946519711744'
const FULL_MEMBER_ROLE_ID = '450967258722992129'

// Channels
const INFO_CHANNEL_ID = '441122385031200794'

/* const GREETINGS_CHANNEL_ID = '444812676632412161' */
const GREETINGS_CHANNEL_ID = '525249065039036426'// Не забыть поменять айди

// Servers
const IT_MUSLIM_SERVER_ID = '441120673109245982'

// Milliseconds in day
const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24
const HOURS_IN_DAY = 24

// Milliseconds in hour
const MILLISECONDS_IN_HOUR = 3600000
// Configure logger settings
logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, {
  colorize: true
})
logger.level = 'debug'

// Initialize Discord Bot
const client = new Discord.Client()

client.once('ready', () => {
  logger.info('Connected')
  logger.info('Logged in as: ')
  logger.info(`${client.user.username} - (${client.user.id})`)
})

client.on('guildMemberAdd', (member) => {
  if (member.user.bot) {
    return
  }

  member.addRole(DESCRIBE_YOURSELF_ROLE_ID)
    .then(() => { logger.info('Successfully added the role') })

  let greetingsChannel = client.channels.get(GREETINGS_CHANNEL_ID)
  if (typeof greetingsChannel === 'undefined') {
    logger.error('Greetings channel is not defined')
    return
  }

  let infoChannel = client.channels.get(INFO_CHANNEL_ID)
  if (typeof infoChannel === 'undefined') {
    logger.error('Info channel is not defined')
    return
  }

  greetingsChannel.send(
    `Ассаляму алейкум ва рахматуллахи ва баракатуху, ${member.toString()}!\n\n` +
    `Добро пожаловать на IT-Muslim Дискорд сервер!\n` +
    `Чтобы узнать побольше о сообществе, посетите канал ${infoChannel.toString()}. ` +
    `Чтобы получить разрешение писать во всех каналах и активно yчаствовать ` +
    `в жизни сообщества, напишите прямо сюда (${greetingsChannel.toString()}) ` +
    `немного о себе.`
  )
})

client.on('message', (message) => {
  if (message.channel.id !== GREETINGS_CHANNEL_ID || message.author.bot) {
    return
  }

  message.member.removeRole(DESCRIBE_YOURSELF_ROLE_ID)
    .then(() => { logger.info('Successfully removed the role') })
  message.member.addRole(FULL_MEMBER_ROLE_ID)
    .then(() => { logger.info('Successfully added the role') })
})

// Kick users who haven't introduced themselves within two weeks
client.setInterval((servers) => {
  const itMuslimServer = servers.get(IT_MUSLIM_SERVER_ID)

  const restrictedMembers = itMuslimServer.members.filter((member) => {
    return !member.roles.has(FULL_MEMBER_ROLE_ID) || member.user.bot
  })

  // Today's date
  let now = new Date()

  restrictedMembers.forEach((member) => {
    // Сalculation of the time interval in which the user was inactive
    let daysInactive = (now.getTime() - member.joinedTimestamp) / MILLISECONDS_IN_DAY
    if (daysInactive > 14) {
      member.kick()
        .then(() => console.log(`Kicked ${member.displayName}`))
        .catch(console.error)
    }

    // Сalculation of the hours in which the user was inactive
    let hoursInactive = (now.getTime() - member.joinedTimestamp) / MILLISECONDS_IN_HOUR
    if (hoursInactive >= 7 * HOURS_IN_DAY && hoursInactive < (7 * HOURS_IN_DAY + 1)) {
      let greetingsChannel = client.channels.get(GREETINGS_CHANNEL_ID)
      greetingsChannel.send(
        `Ассаляму алейкум ва рахматуллахи ва баракатуху, ${member.toString()}!\n\n` +
        `Напишите прямо сюда (${greetingsChannel.toString()}) ` +
        `немного о себе, иначе скоро вы будете удалены из сообщества!`
      )
    }
  })
},
MILLISECONDS_IN_HOUR,
client.guilds)

// Handle errors
client.on('error', (errorEvent) => {
  logger.error(errorEvent.message)
})

client.login(auth.token)

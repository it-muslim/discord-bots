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

<<<<<<< HEAD
client.setInterval((servers) => {
  const itMuslimServer = servers.get(IT_MUSLIM_SERVER_ID)

  const incompleteMembers = itMuslimServer.members.filter((member) => {
    return !member.roles.has(FULL_MEMBER_ROLE_ID)
  })
  /* console.log(incompleteMembers) */

  const incompleteMembersName = incompleteMembers.map((item) => {
    return item.user.username
  })
  /* console.log(incompleteMembersName) */

  const membersJoinTime = incompleteMembers.map((member) => {
    return member.joinedTimestamp
  })
  /* console.log(membersJoinTime) */

  /* const greetingsChannel = client.channels.get(GREETINGS_CHANNEL_ID) */

  membersJoinTime.forEach((item) => {
    let timeNow = new Date()
    let timeDifference = (timeNow.getTime() - item) / 1000 / 60 / 60 / 24

    for (let i = 0; i < incompleteMembersName.length; i++) {
      if (timeDifference > 7) {
        let memberName = []
        memberName.push(incompleteMembersName[i])
        console.log(timeDifference)
        console.log(memberName)
        return
      }
    }
    /* if (timeDifference > 7) {
         greetingsChannel.send(
         `Вы скоро ${item} будете удалены из сообщества`
        )} */
  })
},
5000,
client.guilds)

// Handle errors
client.on('error', (errorEvent) => {
  logger.error(errorEvent.message)
})

client.login(auth.token)

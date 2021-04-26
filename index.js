const Discord = require('discord.js')
const fetch = require('node-fetch')
const md = require('md')
const search = require('./search')
const client = new Discord.Client()
let data = null

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  data = md(await (await fetch('https://raw.githubusercontent.com/PrismarineJS/mineflayer/master/docs/api.md')).text()).split('\n')
})
const map = {
  '!f': 'function',
  '!e': 'event',
  '!a': 'all'
}

client.on('message', async (msg) => {
  const startsWith = (str, prefix) => str.startsWith(prefix)
  const args = msg.content.split(' ')
  if (!Object.keys(map).some(str => startsWith(msg.content, str))) return

  const links = search(data, args[1], map[args[0]])
  const desc = links.map(x => `- ${x}`).join('\n')

  const embed = new Discord.MessageEmbed()
    .setTitle(`${map[args[0]]} search results for "${args[1]}"`)
    .setDescription(desc)
    .setColor('AQUA')
    .setTimestamp()
  if (desc.length > 2000) msg.channel.send('Search too broad, be more specific.')
  else if (links.length === 0) msg.channel.send('No results found')
  else msg.channel.send(embed)
})

client.login(require('fs').readFileSync('token.txt', 'utf-8'))

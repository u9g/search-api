const md = require('md')
const fetch = require('node-fetch')

/**
 *
 * @param {string} searchTerm
 * @param {undefined | 'function' | 'event'} type
 * @returns
 */
function search (md, input, type) {
  let searchTerm = input
  if (type === 'function') searchTerm = `${searchTerm}(`
  if (type === 'event') searchTerm = `"${searchTerm}"`

  const lines = md
    .map(o => o.replace(/&quot;/g, '"'))
    .filter(line => line.includes(searchTerm) && line.includes('href'))
  const slugs = lines.map(o => o.match(/.+href="((?:[a-zA-Z0-9]|-|#|_|\.)+)".+/)[1])
  return slugs.map(s => `https://github.com/PrismarineJS/mineflayer/blob/master/docs/api.md${s}`)
}

async function main () {
  const mdParsed = md(await (await fetch('https://raw.githubusercontent.com/PrismarineJS/mineflayer/master/docs/api.md')).text()).split('\n')
  console.log(search(mdParsed, process.argv[2], process.argv[3]))
}

main()

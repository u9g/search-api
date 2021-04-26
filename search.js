/**
 *
 * @param {string} searchTerm
 * @param {'all' | 'function' | 'event'} type
 * @returns
 */
function search (md, input, type) {
  if (type === 'all') type = undefined
  let searchTerm = input
  if (type === 'function') searchTerm = `${searchTerm}(`
  if (type === 'event') searchTerm = `"${searchTerm}"`

  const lines = md
    .map(o => o.replace(/&quot;/g, '"'))
    .map(o => o.replace(/&gt;/g, '<'))
    .map(o => o.replace(/&lt;/g, '>'))
    .map(o => o.replace(/&le;/g, '≤'))
    .map(o => o.replace(/&ge;/g, '≥'))
    .filter(line => line.startsWith('<li>'))
    .filter(line => line.includes(searchTerm) && line.includes('href'))
  console.log(lines.join('\n'))
  const slugs = lines.map(o => o.match(/^<li><a href="((?:[a-zA-Z0-9]|-|#|_|\.)+)">(.+)<\/a><(?:\/li|ul)>(?: +)?$/))
  const links = slugs
    .map((s, ix) => `[${s[2]}](https://github.com/PrismarineJS/mineflayer/blob/master/docs/api.md${s[1]})`)
  return links
}

module.exports = search

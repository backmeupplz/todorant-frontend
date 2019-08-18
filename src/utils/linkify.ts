import Linkify from 'linkify-it'
const linkify = Linkify()
linkify
  .tlds(require('tlds'))
  .tlds('onion', true)
  .set({ fuzzyIP: true })

export function l(text: string) {
  const matches = linkify.match(text) || []
  const elements = []
  // No urls
  if (!matches.length) {
    return [
      {
        type: 'text',
        value: text,
      },
    ]
  }
  // Middle ground
  let endIndex = 0
  for (const match of matches) {
    if (endIndex !== match.index) {
      elements.push({
        type: 'text',
        value: text.substr(endIndex, match.index - endIndex),
      })
    }
    elements.push({
      type: 'link',
      url: match.url,
      value: text.substr(match.index, match.lastIndex - match.index),
    })
    endIndex = match.lastIndex
  }
  // Last text
  const lastIndex = matches[matches.length - 1].lastIndex
  elements.push({
    type: 'text',
    value: text.substr(lastIndex, text.length - (lastIndex + 1)),
  })
  // Respond
  return elements
}

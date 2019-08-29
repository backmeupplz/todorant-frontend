// Dependencies
import * as url from 'url'
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
    const parsedUrl = url.parse(
      text.substr(match.index, match.lastIndex - match.index)
    )
    elements.push({
      type: 'link',
      url: match.url,
      value: `${parsedUrl.hostname}${
        (parsedUrl.pathname || '/').substr(1) || parsedUrl.hash ? '/...' : ''
      }`,
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

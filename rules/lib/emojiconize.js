'use strict'

function emojiconize(objectOrString) {
  if (typeof objectOrString === 'string') {
    return `${getEmoji(objectOrString)} ${objectOrString}`
  }
  if (typeof objectOrString === 'object') {
    // eslint-disable-next-line
    return (
      Object.entries(objectOrString)
        .map(([key, value]) => {
          if (typeof value === 'object') return [key, emojiconize(value)]
          else if (typeof value === 'string')
            return [key, `${getEmoji(key)}  ${value}`]
          return [key, value]
        })
        // eslint-disable-next-line
        .reduce((res, [key, value]) => ({ ...res, [key]: value }), {})
    )
  }
  return objectOrString
}

const EMOJIS = ['🙈', '🙉', '🙊', '🐒', '🐵']
function getEmoji(text = '') {
  return EMOJIS[text.length % EMOJIS.length]
}

module.exports = emojiconize

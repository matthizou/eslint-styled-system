'use strict'
const emojiconize = require('../lib/emojiconize')
const STYLED_PROPS_SET = require('./theme-props').STYLED_PROPS_SET

const errorMessages = emojiconize({
  TOO_MANY_STYLED_PROPS:
    'Too many styled props used. Create a styled-component.',
})

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow (or restrict) the usage of styled props in the JSX markup',
    },
  },

  create(context) {
    const options =
      context.options && context.options.length > 0 ? context.options[0] : {}
    const { maxAllowed = 2, ignoredProps = [] } = options

    return {
      JSXOpeningElement(node) {
        if (node.attributes.length <= maxAllowed) {
          return
        }
        const styledProps = node.attributes.filter((attribute) => {
          const { name } = attribute.name
          return STYLED_PROPS_SET.has(name) && !ignoredProps.includes(name)
        })
        if (styledProps.length > maxAllowed) {
          context.report({
            node,
            message: errorMessages.TOO_MANY_STYLED_PROPS,
          })
        }
      },
    }
  },

  errorMessages,
}

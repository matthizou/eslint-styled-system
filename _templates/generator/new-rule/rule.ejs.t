---
to: rules/<%= name %>/<%= name %>.js
---
'use strict'
const emojiconize = require('../lib/emojiconize')

const errorMessages = emojiconize({
  SOME_ERROR: 'Some error message'
})

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: ''
    }
  },

  create(context) {
    return {
      //
      // Enter visitor handlers here
      //
    }
  },

  errorMessages
}

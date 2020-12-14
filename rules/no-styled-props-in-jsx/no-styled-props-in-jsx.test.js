'use strict'

const rule = require('./no-styled-props-in-jsx')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
  },
  }
})

const { errorMessages } = rule
const fullPath = 'MyComponent/MyComponent.js'

ruleTester.run('no-styled-props-in-jsx', rule, {
  valid: [
    {
      code: `const MyComponent = () => <MyComponent />`,
      filename: fullPath,
      options: []
    },
    {
      code: `const MyComponent = () => <MyComponent m={3}/>`,
      options: [{maxAllowed: 1}],
    }
  ],

  invalid: [
    {
      code: `const MyComponent = () => <MyComponent m={3} borderTop={3}/>`,
      options: [{maxAllowed: 1}],
      errors: [{ message: errorMessages.TOO_MANY_STYLED_PROPS }]
    }
  ]
})

---
to: rules/<%= name %>/<%= name %>.test.js
---
'use strict'

const rule = require('./<%= name %>')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module'
  }
})

const { errorMessages } = rule
const fullPath = 'MyComponent/MyComponent.js'

ruleTester.run('<%= name %>', rule, {
  valid: [
    {
      code: '',
      filename: fullPath
    }
  ],

  invalid: [
    {
      code: '',
      filename: fullPath,
      errors: [{ message: '🐲' }]
    }
  ]
})

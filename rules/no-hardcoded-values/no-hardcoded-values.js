'use strict'
const pathLib = require('path')
const loadTheme = require('./loadTheme')
const emojiconize = require('../lib/emojiconize')
const getThemeField = require('./getThemeField')
const fixFunction = require('./fixer')

const errorMessages = emojiconize({
  HARDCODED_VALUE:
    'Use theme value instead. Field: `{{field}}`, value: `{{value}}`',
  HARDCODED_VALUES: 'Use theme values instead',
})
const CSS_RULE_REGEXP = /([\w-_]+):([^;]+);/g

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Ensures your application theme is used everywhere and consistently in styled-components 💅',
    },
    fixable: 'code',
  },

  create(context) {
    if (!context.options || !context.options.length) return {}
    const options = context.options[0] || {}
    const {
      themeFile: { path, useES6Modules = true },
      ignoreZeros = false,
      useThemeGet = false,
      noFix = true,
    } = options

    if (!path) return {}

    const fullPath = path.startsWith('.')
      ? pathLib.resolve(process.cwd(), path)
      : path

    let theme
    try {
      theme = loadTheme({ fullPath, useES6Modules })
      // eslint-disable-next-line no-empty
    } catch (e) {
      console.error(e)
    }
    if (!theme) return {}

    // console.log('Theme 💅:', theme)

    const sourceCode = context.getSourceCode()
    // let styleComponentImport
    // let hasThemeGetImport = false

    return {
      ImportDeclaration(node) {
        // const importSource = node.source.value.trim()
        // if (importSource === 'styled-components') {
        //   styleComponentImport = node
        // } else if (importSource === '@styled-system/theme-get') {
        //   hasThemeGetImport = true
        // }
      },

      TaggedTemplateExpression(node) {
        const { tag, quasi } = node
        const nodeSource = sourceCode.getText(tag)

        if (
          !nodeSource.startsWith('styled.') &&
          !nodeSource.startsWith('styled(')
        ) {
          return
        }
        quasi.quasis.map((templateLiteralPiece) => {
          const text = templateLiteralPiece.value.raw
          let match = CSS_RULE_REGEXP.exec(text)
          while (match !== null) {
            const [cssDeclaration, cssProperty, cssValue] = match
            // console.log(`[line ${match.index}] ${cssDeclaration}`)
            const themeValues = checkForThemeValue({
              property: cssProperty,
              value: cssValue.trim(),
              theme,
              ignoreZeros,
            })

            if (themeValues && themeValues.length) {
              const startIndex = templateLiteralPiece.range[0] + 1 + match.index
              const startLoc = sourceCode.getLocFromIndex(startIndex)
              const endLoc = sourceCode.getLocFromIndex(
                startIndex + cssDeclaration.length,
              )

              context.report({
                loc: {
                  start: startLoc,
                  end: endLoc,
                },
                message:
                  themeValues.length == 1
                    ? errorMessages.HARDCODED_VALUE
                    : errorMessages.HARDCODED_VALUES,
                data: {
                  field: themeValues[0].field,
                  value: themeValues[0].property,
                },
                fix: noFix
                  ? undefined
                  : (fixer) =>
                      fixFunction({
                        fixer,
                        useThemeGet,
                        startIndex,
                        cssProperty,
                        themeValues,
                        cssDeclaration,
                      }),
              })
            }
            // Continue iteration
            match = CSS_RULE_REGEXP.exec(text)
          }
        })
      },
    }
  },

  errorMessages,
}

function checkForThemeValue({ property, value, theme = {}, ignoreZeros }) {
  // console.log('🐞', property, value)
  if (value === undefined || value === '' || !property) {
    return []
  }

  const field = getThemeField(property)
  const themeFieldValues = field && theme[field]
  if (themeFieldValues) {
    if (
      property === 'padding' ||
      property === 'margin' ||
      property === 'border-radius'
    ) {
      const processedValues = value.split(' ').map(
        (subValue) =>
          getThemeValue({
            field,
            value: subValue.toLowerCase(),
            fieldValues: themeFieldValues,
            ignoreZeros,
          }) || {
            value: subValue,
          },
      )
      const hasThemeValue = processedValues.find(({ field }) => Boolean(field))
      return hasThemeValue ? processedValues : null
    }
    const themeValue = getThemeValue({
      field,
      value: value.toLowerCase(),
      fieldValues: themeFieldValues,
      ignoreZeros,
    })
    return themeValue ? [themeValue] : null
  }
}

function getThemeValue({ field, value, fieldValues, ignoreZeros }) {
  let property = null

  if (Array.isArray(fieldValues)) {
    if (value === '0' && ignoreZeros) {
      return
    }
    // `values` is an array
    const index = fieldValues.indexOf(value)
    if (index !== -1) {
      property = index
    }
  } else {
    // `values` is an object
    const match = Object.entries(fieldValues).find(
      ([, entryValue]) => entryValue.toString().toLowerCase() === value,
    )
    if (match) {
      property = match[0]
    }
  }
  if (property !== null) {
    return {
      field,
      property,
      value,
    }
  }
}

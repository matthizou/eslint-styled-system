'use strict'

const rule = require('./no-hardcoded-values')
const pathLib = require('path')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
  },
})
const DIRECTORY_PATH = pathLib.dirname(__filename)

const { errorMessages } = rule
const themeFileWithES5 = {
  path: pathLib.join(DIRECTORY_PATH, './test-data/theme-commonjs.js'),
  useES6Modules: false,
}

const themeFileWithES6 = {
  path: './rules/no-hardcoded-values/test-data/theme-es6-modules.js',
  useES6Modules: true,
}

const useThemeValue = (field, value) => ({
  message: errorMessages.HARDCODED_VALUE.replace('{{field}}', field).replace(
    '{{value}}',
    value,
  ),
})

function getTestsWithCommonjsAndES6Modules(test) {
  return [
    {
      ...test,
      options: [{ themeFile: themeFileWithES5, noFix: true }],
    },
    {
      ...test,
      options: [{ themeFile: themeFileWithES6, noFix: true }],
    },
  ]
}

ruleTester.run('styled-components-with-styled-system', rule, {
  valid: [
    ...getTestsWithCommonjsAndES6Modules({
      // No matching theme values
      code: `
      const MyComponent= styled.div\`
       margin-bottom: 2px;
       z-index: 1;
       background-color: #000;
      \`
      `,
    }),
    {
      // no options - should not crash
      code: `const MyComponent= styled.div\`\``,
    },
    // {
    //   // Attempt to read commonJS file with ES6 module flag
    //   code: `
    //   const MyComponent= styled.div\`
    //      margin-bottom: 4px;
    //   \`
    //   `,
    //   options: [
    //     {
    //       themeFile: {
    //         path:
    //           './rules/styled-components-with-styled-system/test-data/theme-es6-modules.js',
    //         useES6Modules: false
    //       }
    //     }
    //   ]
    // },
    {
      // Option `ignoreZeros` On
      code: `
      const MyComponent= styled.div\`
         margin-bottom: 0;
      \`
      `,
      options: [{ themeFile: themeFileWithES6, ignoreZeros: true }],
    },
  ],
  // valid1: [
  //   {
  //     // no options - should not crash
  //     code: `const MyComponent= styled.div\`\``,
  //     options: [{ themeFile: themeFileWithES5 }]
  //   }
  // ],
  // invalid2: [
  //   {
  //     // Shorthand properties with same field
  //     code: `
  //     const MyComponent= styled.div\`
  //       border-radius: 4px 8px;
  //       padding: 4px 99px 12px 16px;
  //       margin: 16px;
  //     \`
  //     `,
  //     options: [{ themeFile: themeFileWithES6, ignoreZeros: true }],
  //     errors: [
  //       useThemeValue('radii[1] radii[2]'),
  //       useThemeValue('space[1] 99px space[3] space[4]'),
  //       useThemeValue('space[4]')
  //     ]
  //   }
  // ],
  invalid: [
    ...getTestsWithCommonjsAndES6Modules({
      // with array-field in theme file (`space`)
      code: `
      const MyComponent= styled.div\`
       margin-bottom: 4px;
      \`
      `,
      errors: [useThemeValue('space', 1)],
    }),
    ...getTestsWithCommonjsAndES6Modules({
      // with object-field in theme file (`zIndices`)
      code: `
      const MyComponent= styled.div\`
        z-index: 110;
      \`
      `,
      errors: [useThemeValue('zIndices', 'dropdownLevel')],
    }),
    {
      // Computed field in theme file (`colors`). The color `lime` comes from the spread operator,
      // while `berry` doesn't.
      // The spread operator syntax is only supported in commonJS
      code: `
      const MyComponent= styled.div\`
        color: #b0d400;
        background-color: #e2007a;
      \`
      `,
      options: [{ themeFile: themeFileWithES6 }],
      errors: [useThemeValue('colors', 'berry')],
    },
    {
      // Computed field in theme file (`colors`). The color `lime` comes from the spread operator,
      // while `berry` doesn't.
      // The spread operator syntax is only supported in commonJS
      code: `
      const MyComponent= styled.div\`
        color: #b0d400;
        background-color: #e2007a;
      \`
      `,
      options: [{ themeFile: themeFileWithES5 }],
      errors: [
        useThemeValue('colors', 'lime'),
        useThemeValue('colors', 'berry'),
      ],
    },
    ...getTestsWithCommonjsAndES6Modules({
      // more complex variation in the declaration of the styled component
      code: `
      const MyComponent= styled(Input).attrs({ placeholder: 'Enter something'})\`
       margin-bottom: 4px;
      \`
      `,
      errors: [useThemeValue('space', 1)],
    }),
    ...getTestsWithCommonjsAndES6Modules({
      // Case-unsensitivity
      code: `
      const MyComponent= styled.div\`
       margin-bottom: 4PX;
      \`
      `,
      errors: [useThemeValue('space', 1)],
    }),
    ...getTestsWithCommonjsAndES6Modules({
      // with expressions inside template literal
      code: `
      const MyComponent= styled.div\`
        z-index: \${themeGet('zIndices.dropdownLevel')}
        margin-bottom: 4px;
      \`
      `,
      errors: [useThemeValue('space', 1)],
    }),
    ...getTestsWithCommonjsAndES6Modules({
      // Shorthand properties with same field
      code: `
      const MyComponent= styled.div\`
        border-radius: 4px 8px;
        padding: 4px 99px 12px 16px;
        margin: 16px;
      \`
      `,
      options: [{ themeFile: themeFileWithES6 }],
      errors: [
        errorMessages.HARDCODED_VALUES,
        errorMessages.HARDCODED_VALUES,
        useThemeValue('space', 4),
      ],
    }),
    ...getTestsWithCommonjsAndES6Modules({
      // Shorthand properties with same field
      code: `
      const MyComponent= styled.div\`
        border-radius: 4px 8px;
        padding: 4px 99px 12px 16px;
      \`
      `,
      errors: [errorMessages.HARDCODED_VALUES, errorMessages.HARDCODED_VALUES],
    }),
    {
      // Option `ignoreZeros` Off
      code: `
      const MyComponent= styled.div\`
         margin-bottom: 0;
      \`
      `,
      output: `
      const MyComponent= styled.div\`
         margin-bottom: \${({ theme }) => theme.space[0]};
      \`
      `,
      options: [
        {
          themeFile: themeFileWithES6,
          ignoreZeros: false,
          noFix: false,
        },
      ],
      errors: [useThemeValue('space', 0)],
    },
  ],
})

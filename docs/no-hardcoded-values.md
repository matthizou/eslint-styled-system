# no-hardcoded-values

## Intro

- Ensures your application theme's values are used **everywhere and
  consistently**
- **Prevents unecessary** hardcoded css values
- **Speeds up development** of styled-components by eliminating the need to go
  back-and-forth your components and the theme definition/documentation

> _You before:_ hm, what is the style-system field name for `margin` again ?
> `space` or `spaces` ? And the index for `24px` ? it is even defined ?

With this rule, just type `margin: 24px;` and wait for eslint to tell you _"Use
theme value `space[6]`"_.  
And let them auto-fix for you later.

---

## Options

- `themeFile` _Object_ **Required**  
  Data about the file containing the styled-system theme

  - `themeFile.path` _String_ **Required**  
    Path to the theme file _(absolute or relative; but relative is
    recommended)_  
    Relative paths are resolved using the path where `eslint` is **executed**.  
    It is usually the top-level of the application's folder structure.

  - `themeFile.useES6Modules` _Boolean Optional_  
    Whether the theme-file is using ES6 modules or not (as opposed to
    commonJS).  
     When possible, use commonJS (`require` and `module.exports`), as ESLint/Node
    will be able to dynamically load the file without a sweat.  
     When not possible, don't worry, it is going to work, but be sure to read
    the technical details section before, as there are some limitations.  
    _Default value: `true`_

  - `ignoreZeros` _Boolean Optional_  
    Whether, when detected by this rule, `0` values in the css should be ignored
    or not.  
    _Default value: `false`_

  - `useThemeGet` _Boolean Optional_  
    Whether `ThemeGet` is used in your codebase or not. That will impact the way
    this rule auto-fixes detected errors. _Default value: `false`_

  ```
   "rules": {
      ....
      "red/styled-components-with-styled-system": ["warn", {
        themeFile: {
            path: "./node_modules/@xingternal/winery/lib/theme.js",
            useES6Modules: true,
        },
        ignoreZeros: true,
        useThemeGet: true,
      }]
  ```

## Rules

- Theme values must be used when possible in styled-components

  ```jsx
  // 📂 theme-file
  const space = [0, '4px', '8px', '12px', '16px']
  const colors = {
    grey: '#f2f2f2',
    berry: '#e2007a',
    lime: '#b0d400',
  }
  const baseTheme = {
    space,
    colors,
  }
  export default {
    baseTheme
  }

  // 📂 MyComponent.js
  // ✔ Good - No hardcoded values matching theme values
  // Note: What is done inside of the template literal's expressions (`${}`) is ignored by this rule.
  const MyComponent= styled.div`
    color: ${ .... };
    margin-bottom: ${ .... };
    padding: ${ .... };
    background-color: #000;
  `

  //  Bad - Hardcoded values matching theme values
  const MyComponent= styled.div`
    color: #f2f2f2;
    margin-bottom: 4px;
    padding: 12px 8px;
    background-color: #000;
  `

  // 🐲 Auto-fixes - with `themeGet`
    const MyComponent= styled.div`
      color: ${themeGet('colors.grey')};
      margin-bottom: ${themeGet('space.1')};
      padding: ${themeGet('space.3')} ${themeGet('space.2')};
      background-color: #000;
    `

  // 🐲 Auto-fixes - without `themeGet`
    const MyComponent= styled.div`
      color: ${({ theme }) => theme.colors.grey};
      margin-bottom: ${({ theme }) => theme.space[1]};
      padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[2]};
      background-color: #000;
    `
  ```

## Technical details

Node doesn't support ES6 modules natively _(at least not without a feature-flag
unavailable to ESLint + modification of the files extensions)_  
 Therefore dynamically extracting the data from a theme-file using ES6 modules can
be quite tricky: a simple `` `require(filePath)` `` won't load the data (while it
would if the file was using CommonJS).

This rule uses static analysis to solve this limitation of Node.  
 Static analysis comes with its own limitations, but if you write the theme file
following those 2 rules ..(todo)...

- Define top-level variables matching the names of the styled-system fields:
  `colors`, `space`, etc.  
   Refer to https://styled-system.com/table/

- Keep it simple. Just use simple **strings** or **numbers** for the values of
  those variables.
  - Avoid computing values.  
    Properties/indexes whose values are computed through concatenations, object
    spread syntax, imports from other modules or functions will be ignored.

```jsx
// 📂 theme-file-1 - Full discovery
const space = [0, '4px', '8px', '12px', '16px']
const colors = {
  grey: '#f2f2f2',
  berry: '#e2007a',
  lime: '#b0d400',
}
const baseTheme = {
  space,
  colors,
}
export default {
  baseTheme
}

// 📂 theme-file-2 - Partial discovery only
const maxSpace = '50px'
const space = [0, '4px', '8px', '12px', '16px', maxSpace]
const borderRadius = [0, '4px', '8px']
const productColors = {
  berry: '#e2007a',
  lime: '#b0d400',
}
const colors = {
  grey: '#f2f2f2',
  ...productColors,
}
const baseTheme = {
  space,
  colors,
  radii: borderRadius
}
export default {
  baseTheme
}
```

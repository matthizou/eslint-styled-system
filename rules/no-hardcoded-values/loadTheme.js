const fs = require('fs')
const babylon = require('babylon')

const FILE_CACHE = new Map()
const CACHE_CHECK_TIME = 5000

const THEME_FIELDS = [
  'space',
  'colors',
  'sizes',
  'fonts',
  'fontSizes',
  'fontWeights',
  'lineHeights',
  'letterSpacings',
  'borders',
  'borderWidths',
  'borderStyles',
  'radii',
  'zIndices',
  'shadows',
  'textStyles',
  'colorStyles',
  'buttons'
]

function loadTheme({ fullPath, useES6Modules }) {
  if (!fullPath) {
    return
  }
  const now = new Date().getTime()
  let theme = retrieveFromCache(fullPath)

  if (theme) {
    return theme
  }

  const fileExists = fs.existsSync(fullPath)
  let lastModified = null

  if (fileExists) {
    lastModified = getFileUpdatedDate(fullPath)
    try {
      if (useES6Modules) {
        theme = loadThemeWithES6Module(fullPath)
        // with es6 modules
      } else {
        // with commonJS
        theme = require(fullPath)
      }
      if (theme && theme.baseTheme) {
        theme = theme.baseTheme
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  FILE_CACHE.set(fullPath, {
    lastChecked: now,
    fileExists,
    lastModified,
    theme
  })
  return theme || null
}

function getFileUpdatedDate(path) {
  try {
    const stats = fs.statSync(path)
    return stats.mtimeMs
  } catch (e) {
    return null
  }
}

function retrieveFromCache(fullPath) {
  const cache = FILE_CACHE.get(fullPath)
  if (cache) {
    const { lastChecked, lastModified, theme, fileExists } = cache

    // The file was recently checked: return cached theme
    const now = new Date().getTime()
    if (lastChecked && now - lastChecked < CACHE_CHECK_TIME) {
      // console.log(
      //   `🦗 No check | ${pathLib.basename(fullPath)} | ↕️: ${now - lastChecked}`
      // )
      return theme
    }

    if (!fileExists) {
      // We'll check file existence again
      return null
    }

    // Check the last modified date of the file
    const lastUpdate = getFileUpdatedDate(fullPath)
    if (lastUpdate === lastModified) {
      // No change
      // console.log(
      //   `🐻 No change | ${pathLib.basename(fullPath)} | ${cache.lastModified}`
      // )
      cache.lastChecked = now
      return theme
    }

    // Changes detected. Reload theme
    // console.log(
    //   `🐻 Change detected ! Reloading theme | ${pathLib.basename(fullPath)}`
    // )
  }
}

/**
 * Parse specified file containing styled-system theme
 * ES6 modules aren't natively supported in Node (without experimental flag),
 * and cannot dynamically be imported with `require`.
 * This function attempt to load the theme data using static analysis, rather than evaluating it.
 * It has some restrictions:
 * 1/ Variables matching style-system fields (i.e: colors, space) should be declared at the top level
 * 2/ The values of those variables must be arrays or objects whose elements/properties are non-computed numbers or string.
 */
function loadThemeWithES6Module(fullPath) {
  const themeSourceCode = fs.readFileSync(fullPath, 'utf8')
  const tree = babylon.parse(themeSourceCode, {
    sourceType: 'module',
    plugins: ['objectRestSpread']
  })
  const topLevelNodes = tree.program.body

  const theme = topLevelNodes
    .filter(
      node =>
        node.type === 'VariableDeclaration' &&
        node.declarations &&
        node.declarations.length
    )
    .map(node => node.declarations)
    // flatten top-level declarations
    .reduce((res, node) => [...res, ...node], [])
    .filter(node => THEME_FIELDS.includes(node.id.name))
    .map(({ id, init }) => ({
      name: id.name,
      value: getDeclarationValues(init)
    }))
    .filter(field => Boolean(field.value))
    .reduce((res, { name, value }) => ({ ...res, [name]: value }), {})
  // console.log('🐻', theme)

  return theme
}

function isStringOrNumber(node) {
  return (
    node &&
    node.type &&
    (node.type === 'StringLiteral' || node.type === 'NumericLiteral')
  )
}

function getDeclarationValues(node) {
  const { type } = node
  if (type === 'ArrayExpression') {
    const { elements } = node
    return elements.map(node =>
      isStringOrNumber(node) ? node.value.toString() : null
    )
  } else if (type === 'ObjectExpression') {
    const { properties } = node
    const values = properties.map(({ value }) => value)
    if (values.find(isStringOrNumber)) {
      return properties
        .filter(property => isStringOrNumber(property.value))
        .reduce(
          (res, { key, value }) => ({
            [key.name]: value.value,
            ...res
          }),
          {}
        )
    }
  }
}

module.exports = loadTheme

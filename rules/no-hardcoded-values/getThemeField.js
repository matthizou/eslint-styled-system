// https://styled-system.com/table/
/** Gets css property and returns corresponding styled-theme field */
module.exports = function getThemeField(property) {
  const baseProperty = property.split('-').slice(-1)[0]
  switch (baseProperty) {
    case 'color':
      return 'colors'
    case 'margin':
    case 'padding':
      return 'space'
    case 'top':
    case 'bottom':
    case 'left':
    case 'right':
    case 'gap':
      if (isBorder(property)) return 'borders'
      return 'space'
    case 'radius':
      return 'radii'
    case 'index':
      return 'zIndices'
    case 'shadow':
      return 'shadows'
    case 'height':
      if (property === 'font-height') return 'fontSizes'
      return 'sizes'
    case 'weight':
      return 'fontWeights'
    case 'width':
      if (isBorder(property)) return 'borderWidths'
      return 'sizes'
    case 'size':
      if (property === 'font-size') return 'fontSizes'
      break
    case 'family':
      if (property === 'font-family') return 'fonts'
      break
    case 'style':
      // border-top-style, ...
      if (isBorder(property)) return 'bordersStyles'
      break
  }
}

function isBorder(property) {
  return property.startsWith('border')
}

/* eslint-disable */
const radii = [0, '4px', '8px']
var space = [0, '4px', '8px', '12px', '16px'],
  fontSizes = [0, '12px', '14px', '16px', '18px', '22px'],
  zIndices = {
    basicLevel: 10,
    dropdownLevel: 110,
    tooltipLevel: 170
  },
  greyscale = {
    grey50: '#f2f2f2',
    grey100: '#e5e5e5',
    grey150: '#d9d9d9'
  },
  primaryPalette = {
    lightPetrol: '#009090',
    lime: '#b0d400',
    petrol: '#007575'
  },
  colors = {
    berry: '#e2007a',
    indigo: '#546df5',
    ...greyscale,
    ...primaryPalette
  },
  baseTheme = {
    fontSizes: fontSizes,
    space: space,
    colors: colors,
    radii: radii,
    zIndices: zIndices
  }

module.exports = {
  baseTheme
}

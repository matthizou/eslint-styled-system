/* eslint-disable */
const space = [0, '4px', '8px', '12px', '16px']
const fontSizes = [0, '12px', '14px', '16px', '18px', '22px']
const radii = [0, '4px', '8px']
const zIndices = {
  basicLevel: 10,
  navigationLevel: 100,
  dropdownLevel: 110,
  notificationLevel: 165,
  tooltipLevel: 170
}
const greyscale = {
  grey50: '#f2f2f2',
  grey100: '#e5e5e5',
  grey150: '#d9d9d9'
}
const primaryPalette = {
  lightPetrol: '#009090',
  lime: '#b0d400',
  petrol: '#007575'
}
const colors = {
  berry: '#e2007a',
  indigo: '#546df5',
  ...greyscale,
  ...primaryPalette
}
// const colors = Object.assign({}, greyscale, {}, primaryPalette)
const baseTheme = {
  fontSizes: fontSizes,
  space: space,
  colors: colors,
  zIndices: zIndices
}

export default {
  baseTheme
}

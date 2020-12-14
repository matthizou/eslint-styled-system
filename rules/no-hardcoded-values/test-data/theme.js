// Theme from Winery
import { a as _objectSpread2 } from './chunk-5e863035.js'

const blah = [1, 2, 3]

var greyscale = {
    grey50: '#f2f2f2',
    grey100: '#e5e5e5',
    grey150: '#d9d9d9',
    grey200: '#cccccc',
    grey400: '#999999',
    grey600: '#666666',
    grey800: '#333333'
  },
  primaryPalette = {
    lightPetrol: '#009090',
    lime: '#b0d400',
    petrol: '#007575',
    white: '#fff'
  },
  backgroundColors = {
    appBackground: greyscale.grey50,
    cardBackground: primaryPalette.white
  },
  extendedPalette = {
    babyBlue: '#68c3fc',
    berry: '#e2007a',
    indigo: '#546df5',
    mint: '#00d296',
    orange: '#ffa000',
    pigeon: '#365568',
    red: '#f33a58'
  },
  textColor = {
    negativeText: primaryPalette.white,
    primaryText: greyscale.grey800,
    secondaryText: greyscale.grey400,
    linkText: primaryPalette.lightPetrol
  },
  productColors = {
    ebp: '#B0D400',
    xjm: '#73B7E2',
    xrm: '#858AC2',
    xtm: '#A9BAC4',
    xtp: '#F28F7F',
    360: primaryPalette.petrol
  },
  semanticColors = {
    accent: primaryPalette.lightPetrol,
    beta: extendedPalette.berry,
    error: extendedPalette.red,
    eyeCatcher: extendedPalette.orange,
    information: extendedPalette.babyBlue,
    success: primaryPalette.lime,
    neutral: greyscale.grey400
  },
  borderColors = {
    borderActive: primaryPalette.lightPetrol,
    borderLight: greyscale.grey100,
    borderMedium: greyscale.grey200,
    borderDark: greyscale.grey400
  },
  gradients = {
    primaryButtonDefault: 'linear-gradient(to bottom, #bde300 0%, '.concat(
      primaryPalette.lime,
      ' 100%)'
    ),
    secondaryButtonDefault: 'linear-gradient(to bottom, '
      .concat(greyscale.grey150, ' 0%, ')
      .concat(greyscale.grey200, ' 100%)')
  },
  colors = _objectSpread2(
    {},
    backgroundColors,
    {},
    primaryPalette,
    {},
    extendedPalette,
    {},
    textColor,
    {},
    greyscale,
    {},
    productColors,
    {},
    semanticColors,
    {},
    borderColors,
    {},
    gradients
  ),
  space = [
    0,
    '4px',
    '8px',
    '12px',
    '16px',
    '24px',
    '32px',
    '40px',
    '48px',
    '64px'
  ],
  breakpoints = ['640px', '768px', '1024px', '1200px'],
  fontFamily = '"Xing Sans", Helvetica, Arial, sans-serif',
  fontSizes = [
    0,
    '12px',
    '14px',
    '16px',
    '18px',
    '22px',
    '26px',
    '32px',
    '40px',
    '48px'
  ],
  fontWeights = [400, 600],
  lineHeights = [
    0,
    '16px',
    '20px',
    '22px',
    '24px',
    '28px',
    '32px',
    '38px',
    '46px',
    '52px'
  ],
  shadows = [
    'none',
    '0 2px 2px rgba(0,0,0,.16)',
    '0 3px 8px rgba(0,0,0,.20)',
    '0 6px 20px rgba(0,0,0,.25)'
  ],
  borders = {
    active: '1px solid '.concat(borderColors.borderActive),
    light: '1px solid '.concat(borderColors.borderLight),
    medium: '1px solid '.concat(borderColors.borderMedium),
    dark: '1px solid '.concat(borderColors.borderDark)
  },
  textSizes = function() {
    return fontSizes.map(function(a, b) {
      return { fontSize: fontSizes[b], lineHeight: lineHeights[b] }
    })
  },
  buttonSizes = [
    { height: '32px', fontSize: fontSizes[2] },
    { height: '40px', fontSize: fontSizes[3] }
  ],
  buttons = {
    primary: {
      color: colors.grey800,
      background: gradients.primaryButtonDefault,
      '&:not(:disabled):hover': { background: '#b0d400' }
    },
    secondary: {
      color: colors.grey800,
      background: gradients.secondaryButtonDefault,
      '&:not(:disabled):hover': { background: '#d1d1d1' }
    },
    tertiary: {
      background: colors.white,
      border: '1px solid '.concat(colors.borderLight),
      '&:not(:disabled):hover': { borderColor: colors.borderMedium }
    }
  },
  radii = [0, '4px'],
  zIndices = {
    basicLevel: 10,
    navigationLevel: 100,
    dropdownLevel: 110,
    fixedLevel: 120,
    sidebarLevel: 130,
    overlayLevel: 140,
    dialogLevel: 160,
    notificationLevel: 165,
    tooltipLevel: 170,
    godLevel: 1e3
  },
  baseTheme = {
    borders: borders,
    breakpoints: breakpoints,
    buttons: buttons,
    buttonSizes: buttonSizes,
    colors: colors,
    fontFamily: fontFamily,
    fontSizes: fontSizes,
    fontWeights: fontWeights,
    lineHeights: lineHeights,
    radii: radii,
    shadows: shadows,
    space: space,
    textSizes: textSizes(),
    zIndices: zIndices
  },
  createTheme = function(a) {
    return _objectSpread2({}, baseTheme, {}, a)
  }
export {
  backgroundColors,
  baseTheme,
  borderColors,
  createTheme,
  extendedPalette,
  gradients,
  greyscale,
  primaryPalette,
  productColors,
  semanticColors,
  textColor
}
//# sourceMappingURL=theme.js.map

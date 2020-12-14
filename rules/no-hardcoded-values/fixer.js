/***/
module.exports = ({
  fixer,
  useThemeGet,
  startIndex,
  cssProperty,
  themeValues,
  cssDeclaration
}) => {
  const result = []
  //   if (useThemeGet/*, !hasThemeGetImport && styleComponentImport*/) {
  //     // Test for themeGet import
  //     result.push(
  //       fixer.insertTextAfter(
  //         styleComponentImport,
  //         '\nimport themeGet from "@styled-system/theme-get"'
  //       )
  //     )
  //   }
  result.push(
    fixer.replaceTextRange(
      [startIndex, startIndex + cssDeclaration.length],
      `${cssProperty}: ${themeValues
        .map(({ value, field, property }) => {
          if (!field) {
            return value
          }
          if (useThemeGet) {
            return `$\{themeGet("${field}.${property}")}`
          }
          return `$\{({ theme }) => theme.${formatFieldValue(field, property)}}`
        })
        .join(' ')};`
    )
  )
  return result
}

function formatFieldValue(field, property) {
  return typeof property === 'number'
    ? `${field}[${property}]`
    : `${field}.${property}`
}

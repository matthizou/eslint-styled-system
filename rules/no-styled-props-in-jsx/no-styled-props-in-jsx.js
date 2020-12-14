'use strict'
const emojiconize = require('../lib/emojiconize')

const errorMessages = emojiconize({
  TOO_MANY_STYLED_PROPS: 'Too many styled props used. Create a styled-component.'
})

const space = ["margin","m", "marginTop","mt","marginRight","mr","marginBottom","mb","marginLeft","ml","marginX","mx","marginY","my","padding","p","paddingTop","pt","paddingRight","pr","paddingBottom","pb","paddingLeft","pl","paddingX","px","paddingY","py"]
const flex = ["alignItems","alignContent","justifyItems","justifyContent","flexWrap","flexDirection","flex","flexGrow","flexShrink","flexBasis","justifySelf","alignSelf","order"]
const border = ["border", "borderWidth", "borderStyle", "borderColor", "borderRadius", "borderTop", "borderTopWidth", "borderTopStyle", "borderTopColor", "borderTopLeftRadius", "borderTopRightRadius", "borderRight", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottom", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderBottomLeftRadius", "borderBottomRightRadius", "borderLeft", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderX", "borderY"]
const background = ["background", "backgroundImage", "backgroundSize", "backgroundPosition", "backgroundRepeat"]
const position = ["position", "zIndex", "top", "right", "bottom", "left"]

const STYLED_ATTRIBUTES = [...space, ...flex, ...position, ...border, ...position, ...background]

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow (or restrict) the usage of styled props in the JSX markup'
    }
  },

  create(context) {
    const options = context.options && context.options.length > 0 ? context.options[0]: {}
    const {
      maxAllowed = 1,
    } = options

    return {
      JSXOpeningElement(node) {
        const styledProps = node.attributes.filter((attribute) =>
          STYLED_ATTRIBUTES.includes(attribute.name.name)
        );
        console.log('🌍',STYLED_ATTRIBUTES)
        if (styledProps.length > maxAllowed) {
          context.report({
            node,
            message: errorMessages.TOO_MANY_STYLED_PROPS
          });
        }
      }
    };
  },

  errorMessages
}

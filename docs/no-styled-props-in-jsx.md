# no-styled-props-in-jsx

## Intro

Styled props - props introduced by styled-system - are useful, but overusing them can result in a lot of noise in the JSX code.
Look at this piece of code, and imagine a bigger component with a lot of those styled props:

```js
//  Bad - Lot's of props, JSX markup harder to read
const Hello = ({ data }) => (
  <Box id="hello" m={2} px={2} fontSize={3} color="red" data={data}>
    HELLO
  </Box>
)
```

For this reason, some teams prefer do the following (single-use styled components) and separate the styling from the JSX

```js
//  Better - Styled-props are separated
const MyComponentStyled = styled(MyComponent).attrs({
  m: 2,
  px: 2,
  alignItems: 'center',
  color: 'red',
})``

const HelloComponent = ({ data }) => (
  <Box id="hello" data={data}>
    HELLO
  </Box>
)
```

---

## Options

- `maxAllowed` _number_ **Required**  
  Threshold of the maximum number of styled props allowed for a JSX opening tag

- `ignoredProps` _string[]_ Optional  
  Styled system properties that will be ignored by the rule, and therefore won't be counted up

---

## Rules

- Styled props are allowed in a JSX tag up to a certain threshold

```js
// Will warn if `maxAllowed` == 2, won't if `maxAllowed` == 3
const Hello = ({ data }) => (
  <Box id="hello" m={2} px={2} fontSize={3}>
    HELLO
  </Box>
)
```

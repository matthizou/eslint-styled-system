module.exports = {
  // eslint-disable-next-line
  prompt: async ({ prompter }) => {
    const { name } = await prompter.prompt({
      type: 'input',
      name: 'name',
      message: "What's the name of your new rule ?",
      format: value => kebabize(value),
      result: value => kebabize(value),
      validate: value => {
        return value && value.length >= 5
      }
    })
    return { name }
  }
}

function kebabize(text) {
  return text
    .trim()
    .replace(/\W/g, '-')
    .toLowerCase()
}

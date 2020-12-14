# Contributing 🙈

## Create a new rule:

```
yarn create-new-rule
```

### Tips & tricks

- It is advised to start development online in
  [AST Explorer](https://astexplorer.net/)
- Then move development in here, using TDD
- In the last phase, when testing and tweaking new Eslint rules on an other
  project, it is often simplier to modify the code files directly in
  `node_modules/` in this project than changing them in this repo and
  republishing.
- When doing so, you'll need to restart the EsLint server. In Visual Studio
  Code, you can't force a restart by simply disabling then re-enabling EsLint.  
  To do so, execute the command:
  ```
  kill $(ps aux | grep 'eslintServer' | awk '{print $2}')
  ```

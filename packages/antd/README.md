# serlina-plugin-antd

Delightful using Ant.Design in Serlina.

✅ Support `babel-plugin-import`
✅ Support TypeScript

## Usage

```
npm i antd serlina-plugin-antd
```

```js
// serlina.config.js

const { withAntd } = require('serlina-plugin-antd')

module.exports = withAntd()

// or

module.exports = withAntd({ /** your config */ }, {
  // custom less-loader config
  modifyVars: {
    'primary-color': '#000'
  }
})
```

`withAntd` includes:

- babel-plugin-import
- less

### Use with TypeScript

```
npm i typescript @types/react
```

Place your `tsconfig.json` under `baseDir`.

```js
const { withTSAntd } = requrie('serlina-plugin-antd')

module.exports = withTSAntd()
```

`withTSAntd` use Babel to tranform. So you can use `target: "es6"`.

# License

MIT License

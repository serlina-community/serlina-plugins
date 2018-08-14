# serlina-plugin-antd

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

# License

MIT License

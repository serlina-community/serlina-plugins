const webpackConfig = options => (webpack, { miniCSSLoader }) => {
  return {
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [miniCSSLoader, {
            loader: 'css-loader'
          }, {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              ...options
            }
          }]
        },
        { 
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                ["import", { "style": true, libraryName: 'antd' }]
              ]
            }
          }
        }
      ]
    }
  }
}

module.exports = (config, options = {}) => {
  return Object.assign({
    webpack: webpackConfig(options)
  }, config)
}

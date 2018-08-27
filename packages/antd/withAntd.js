const makeWebpackConfig = (options, originConfig) => (webpack, serlinaConfigOptions) => {
  const { miniCSSLoader, merge } = serlinaConfigOptions
  return merge({
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
                [require.resolve('babel-plugin-import'), { "style": true, libraryName: 'antd' }]
              ]
            }
          }
        }
      ]
    }
  }, originConfig ? originConfig(webpack, serlinaConfigOptions) : {})
}

module.exports = (config = {}, options = {}) => {
  const { webpack, nodeExternalsWhitelist } = config

  return {
    webpack: makeWebpackConfig(options, webpack),
    nodeExternalsWhitelist: [/antd\/lib\/.*\/style/].concat(nodeExternalsWhitelist)
  }
}
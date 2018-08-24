const webpackConfig = (options, childWebpackConfig) => (webpack, serlinaConfigOptions) => {
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
  }, childWebpackConfig ? childWebpackConfig(webpack, serlinaConfigOptions) : {})
}

module.exports = (config = {}, options = {}) => {
  const childWebpackConfig = config.webpack
  delete config.webpack
  return Object.assign({
    webpack: webpackConfig(options, childWebpackConfig),
    nodeExternalsWhitelist: [/antd\/lib\/.*\/style/]
  }, config)
}

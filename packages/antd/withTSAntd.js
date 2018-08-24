const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')

const webpackConfig = env => (options, childWebpackConfig) => (webpack, serlinaConfigOptions) => {
  const { miniCSSLoader, merge, baseDir } = serlinaConfigOptions
  const isClient = env === 'client'

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
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: [{
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: !isClient,
              useBabel: true,
              useCache: true,
              module: isClient ? 'commonjs' : 'esnext',
              configFileName: path.resolve(baseDir, './tsconfig.json'),
              babelOptions: {
                ignore: /node_modules/,
                presets: [require.resolve('babel-preset-es2015'), require.resolve('babel-preset-stage-2')]
              }
            }
          }, {
            loader: 'ui-component-loader',
            options: {
              lib: 'antd',
              libDir: isClient ? 'es' : 'lib',
              camel2: '-',
              style: 'style'
            }
          },]
        }
      ]
    },
    plugins: [
      new CheckerPlugin()
    ]
  }, childWebpackConfig ? childWebpackConfig(webpack, serlinaConfigOptions) : {})
}

module.exports = (config = {}, options = {}) => {
  const childWebpackConfig = config.webpack
  delete config.webpack
  return Object.assign({
    webpack: {
      client: webpackConfig('client')(options, childWebpackConfig),
      server: webpackConfig('server')(options, childWebpackConfig)
    },
    nodeExternalsWhitelist: [/antd\/lib\/.*\/style/]
  }, config)
}

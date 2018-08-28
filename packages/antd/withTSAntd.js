const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')

const makeWebpackConfig = (options, originConfig) => (webpack, serlinaConfigOptions) => {
  const { miniCSSLoader, merge, baseDir, compileEnv } = serlinaConfigOptions
  const isClient = compileEnv === 'client'

  return merge({
    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    },
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
  }, originConfig ? originConfig(webpack, serlinaConfigOptions) : {})
}

module.exports = (config = {}, options = {}) => {
  const { webpack, nodeExternalsWhitelist } = config

  return {
    webpack: makeWebpackConfig(options, webpack),
    nodeExternalsWhitelist: [/antd\/lib\/.*\/style/].concat(nodeExternalsWhitelist)
  }
}
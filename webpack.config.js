const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/index'],
  watch: true,
  devtool: 'sourcemap',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [['env', { modules: false }], 'stage-0'],
                plugins: ['transform-regenerator', 'transform-runtime']
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          use: {
            loader: 'raw-loader'
          }
        }
      ]
    },
    plugins: [
      new StartServerPlugin('server.js'),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': { BUILD_TARGET: JSON.stringify('server') }
      }),
      new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
    ],
    output: { path: path.join(__dirname, 'dist'), filename: 'server.js' }
};

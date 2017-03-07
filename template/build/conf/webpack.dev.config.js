import webpack from 'webpack'
import Config from 'webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {
  build
} from '../../config'
export default new Config().extend({
  'build/conf/webpack.base.config.js': config => {
    config.plugins = config.plugins || []
    Object.keys(config.entry).forEach(entry => {
      config.plugins.push(
        new HtmlWebpackPlugin({
          chunks: ['vendor', entry],
          filename: `${entry}.html`,
          template: `./src/pages/${entry}/${build.entryTpl}`
        }))
    })
    return config
  }
}).merge({
  entry: {
    vendor: ['vue', 'es6-promise', 'whatwg-fetch', 'webpack-hot-middleware/client']
  },
  devtool: '#source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
  ]
})

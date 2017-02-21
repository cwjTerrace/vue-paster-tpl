import webpack from 'webpack'
import Config from 'webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import {
  build
} from '../config'

export default new Config().extend({
  'build/webpack.base.config.js': config => {
    config.plugins = config.plugins || []
    Object.keys(config.entry).forEach(entry => {
      config.plugins.push(
        new HtmlWebpackPlugin({
          chunks: [entry],
          filename: `${entry}.html`,
          template: `./src/pages/${entry}/${build.entryTpl}`
        }))
    })
    return config
  }
}).merge({
  output: {
    filename: 'js/[name].[chunkhash:7].js'
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:7].css'
    })
  ]
})

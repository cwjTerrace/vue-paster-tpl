import webpack from 'webpack'
import Config from 'webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { env, build } from '../../config'
export default new Config().extend({
  'scripts/conf/webpack.base.conf.js': config => {
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
  devtool: 'source-map',
  entry: {
    vendor: ['vue', {{#if_eq cdn "no"}} 'core-js/fn/promise', 'whatwg-fetch', {{/if_eq}} env.assetsPath('scripts/es/dev-client.es.js')]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify('development'),
      DEBUG: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
    // new webpack.SourceMapDevToolPlugin({
    //   filename: '[name].js.map',
    //   exclude: ['vendor.js']
    // })
  ]
})

import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotProxyMiddleware from './proxy.es'
import cfg from '../conf/webpack.dev.conf'
import {
  env
} from '../../config'

const compiler = webpack(cfg)
const port = process.env.PORT || env.port

const koaDevMiddleware = webpackDevMiddleware(compiler, {
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
})

const koaHotMiddleware = webpackHotMiddleware(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    koaHotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

/* S - Express */
const app = express()
app.use(webpackHotProxyMiddleware)
app.use(koaDevMiddleware)
app.use(koaHotMiddleware)
// 线上cdn资源
app.get(/inpromo\/lib/, (req, res) => {
  let path = (req.originalUrl || req.url)
  res.sendFile(env.assetsPath(path.replace('inpromo/lib', 'libs')))
})

/* E - Express */
app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  koaDevMiddleware.waitUntilValid(function () {
    console.log(`> Listening at http://localhost:${port}\n`)
  })
})

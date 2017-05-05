/* globals ls,test,cat */
import {
  request,
  get
} from 'https'
import {
  dirname,
  basename
} from 'path'
import {
  blue
} from 'chalk'
import {
  createReadStream,
  createWriteStream,
  appendFileSync,
  statSync
} from 'fs'
import {
  build
} from '../../config'
const option = {
  hostname: 'tinypng.com',
  port: 443,
  path: '/site/shrink',
  method: 'POST',
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  }
}
const compress = (path, name, time) => {
  let prefixDir = `/usr/src/app/${path}`
  let relativeName = `${path}/${name}`
  let tinyPath = `${prefixDir}/tiny.json`
  if (!test('-f', tinyPath)) {
    appendFileSync(tinyPath, '{}', {
      flag: 'w'
    })
  }
  var tiny = JSON.parse(cat(tinyPath))
  if (relativeName in tiny && tiny[`${relativeName}`] === time) {
    console.log(`CompressDone '${blue(relativeName)}'.....`)
  } else {
    console.log(`StartUpload '${blue(relativeName)}'.....`)
    createReadStream(`${prefixDir}/${name}`).pipe(request(option, (res) => {
      res.on('data', resInfo => {
        resInfo = JSON.parse(resInfo.toString())
        var oldSize = (resInfo.input.size / 1024).toFixed(2)
        var newSize = (resInfo.output.size / 1024).toFixed(2)
        get(resInfo.output.url, imgRes => {
          let writeS = createWriteStream(`${prefixDir}/${name}`)
          imgRes.pipe(writeS)
          imgRes.on('end', () => {
            console.log(`CompressSize ${blue(`${oldSize}KB ==> ${newSize}KB -${Math.floor(((oldSize - newSize) / oldSize * 100))}% `)}`)
            console.log(`CompressDone '${blue(relativeName)}'.....`)
          })
          writeS.on('close', () => {
            let compressTime = statSync(`${prefixDir}/${name}`).size
            let _tinyData = JSON.parse(cat(tinyPath))
            _tinyData[`${relativeName}`] = compressTime
            appendFileSync(tinyPath, JSON.stringify(_tinyData), {
              flag: 'w'
            })
          })
        })
      })
    }))
  }
}
ls(build.imgCompress.regx).forEach(file => {
  let name = basename(file)
  if (!/.(png|jpg)$/.test(name)) return ''
  compress(dirname(file), name, statSync(file).size)
})

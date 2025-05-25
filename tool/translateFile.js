// 文件格式转换 webp to jpg
const sharp = require('sharp')
const FS = require('fs')
const fsp = FS.promises
const _path = require('path')
const { checkDir, logName } = require('./utils')

const PATH = _path.resolve('F:\\ing')

checkDir('LOG')

function transformerHandler(list, path) {
  const dirName = _path.parse(path).base
  FS.appendFileSync(`./LOG/${logName}`, `${path}\n${JSON.stringify(list, null, 2)}` + '\n')

  let index = 0

  for (let i = 0, len = list.length; i < len; i++) {
    const file = list[i]
    // 是目标类型文件
    const { ext, name } = _path.parse(file)
    if (['.WEBP', '.webp'].includes(ext)) {
      const newFileName = {
        name,
        mid: '',
        ext: 'jpg'
      }
      // 重命名校验
      while (list.includes(`${newFileName.name}${newFileName.mid}.${newFileName.ext}`)) {
        if (newFileName.mid === '') {
          newFileName.mid = 0
        } else {
          newFileName.mid++
        }
      }
      const newFile = `${newFileName.name}${newFileName.mid}.${newFileName.ext}`

      list.push(newFile)
      // 转换
      convertWebp2Jpg(_path.join(path, file), _path.join(path, newFile))
        .then(() => {
          console.log(`| 转换成功 | ${dirName} | ${++index}(${i}/${len}) | ${file} | ${newFile} |`)

          FS.appendFileSync(`./LOG/${logName}`, `| 成功 | ${dirName} | ${file} | ${newFile} |` + '\n')
          // 删除原文件
          FS.unlink(_path.join(path, file), err => {
            if (err) {
              console.log(`| 删除文件出错 | ${dirName} | ${file} | ${err} |`)
            }
          })
        })
        .catch(err => {
          FS.appendFileSync(`./LOG/${logName}`, `| 失败 | ${dirName} | ${file} | ${newFile} |` + '\n')
          console.log(`| 转换失败 | ${dirName} | ${file} | ${err} |`)
        })
    }
  }
}

// webp to jpg
// function convertWebp2Jpg(inputPath, outPath) {
//   return sharp(inputPath)
//     .jpeg({ quality: 80 })
//     .toFile(outPath)
// }
function convertWebp2Jpg(inputPath, outPath) {
  return new Promise((resolve, reject) => {
    // 以流的形式处理
    const readStream = FS.createReadStream(inputPath)
    const writeStream = FS.createWriteStream(outPath)
    const transformer = sharp().jpeg({ quality: 80 })

    readStream
      .pipe(transformer)
      .pipe(writeStream)
      .on('finish', resolve)
      .on('error', reject)
  })
}

// 解析数据

function readFile(path) {
  const result = {
    files: [],
    directories: [],
    path
  }

  return fsp.readdir(path).then(res => {
    res.forEach(item => {
      const stat = FS.statSync(_path.join(path, item))
      if (stat.isFile()) {
        result.files.push(item)
      } else if (stat.isDirectory()) {
        result.directories.push(item)
      }
    })

    return result
  })
}

function handler(path) {
  return readFile(path)
    .then(async ({ files, directories, path }) => {
      // 处理文件
      if (files.length) {
        transformerHandler(files, path)
      }
      if (directories.length) {
        for (const file of directories) {
          const path1 = _path.join(path, file)
          await handler(path1)
        }
      }
    })
}

handler(PATH)
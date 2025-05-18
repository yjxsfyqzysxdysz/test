// 文件格式转换 webp to jpg
const sharp = require('sharp')
const FS = require('fs')
const _path = require('path')
const { checkDir, logName } = require('./utils')

const PATH = _path.resolve('F:\\Downloads\\360Downloads\\ing\\017\\安然 Maleah')

checkDir('LOG')


const items = FS.readdirSync(PATH)
const result = {
  files: [],
  directories: []
}

items.forEach(item => {
  const stat = FS.statSync(_path.join(PATH, item))
  if (stat.isFile()) {
    result.files.push(item)
  } else if (stat.isDirectory()) {
    result.directories.push(item)
  }
})

// 处理文件
if (!result.files.length) {
  FS.appendFileSync(`./LOG/${logName}`, `${PATH}` + '\n')

  transformerHandler(result.files, PATH)
} else if (!result.directories.length) {

  for (const file of result.directories) {
    const path = _path.join(PATH, file)
    const list = FS.readdirSync(path)
    transformerHandler(list, path)
  }
}

function transformerHandler(list, path) {
  FS.appendFileSync(`./LOG/${logName}`, `${path}` + '\n')

  let index = 0

  for (let i = 0, len = list.length; i < len; i++) {
    const file = list[i]
    // 是目标类型文件
    const { ext, name } = _path.parse(file)
    if (ext === '.webp') {
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
      convertWebp2Jpg(_path.join(DirPath, file), _path.join(DirPath, newFile))
        .then(() => {
          console.log('转换成功', ` ${++index} ${file} ---- ${newFile}`)

          FS.appendFileSync(`./LOG/${logName}`, `成功 ${file} --- ${newFile}` + '\n')
          // 删除原文件
          FS.unlink(_path.join(DirPath, file), err => {
            if (err) {
              console.log('删除文件出错\n', file, err)
            }
          })
        })
        .catch(err => {
          FS.appendFileSync(`./LOG/${logName}`, `失败 ${file} --- ${newFile}` + '\n')
          console.log('转换失败', file, err)
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

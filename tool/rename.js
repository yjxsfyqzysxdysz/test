// 引入文件系统模块
const fs = require('fs')

// 需要修改的文件路径
let PATH = './picture'

// 获取详细文件名，回调返回文件名及路径
function walk(path, callback) {
  // 同步读取文件
  let files = fs.readdirSync(path)

  files.forEach(function (file) {
    if (fs.statSync(path + '/' + file).isFile()) {
      callback(path, file)
    }
  })
}

/*
 *   修改文件名称
 *   oldPath: 原文件路径
 *   newPath：新文件路径
 */
function rename(oldPath, newPath) {
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      throw err
    }
  })
}

// 运行
walk(PATH, function (path, fileName) {
  let oldPath = path + '/' + fileName, // 原文件路径拼接
    // newPath = path + '/' + fileName.replace('.png', '.jpg') // 新文件路径拼接
    newPath = path + '/' + fileName + '.jpg' // 新文件路径拼接

  rename(oldPath, newPath)
})

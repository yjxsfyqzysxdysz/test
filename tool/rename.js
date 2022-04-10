// 引入文件系统模块
const fs = require('fs')

// 需要修改的文件路径
let PATH = './picture'

// 获取详细文件名，回调返回文件名及路径
function walk() {
  // 同步读取文件
  const list = fs.readdirSync(PATH)
  const files = []
  const directory = []
  list.forEach(file => {
    const stats = fs.statSync(`${PATH}/${file}`)
    if (stats.isFile()) {
      files.push(file)
    } else if (stats.isDirectory()) {
      directory.push(file)
    }
  })
  console.log(`files number is ${files.length}\ndirectory number is ${directory.length}\n---------------------------------------`)
  if (files.length) {
    // renameFile(files)
  }
  if (directory.length) {
    renameDirectory(directory)
  }
}

/*
 *   修改文件名称
 *   oldPath: 原文件路径
 *   newPath：新文件路径
 */
function rename(oldPath, newPath) {
  if (oldPath === newPath) throw `${oldPath}: old name and new name is same`
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      throw err
    }
  })
}

function renameFile(list) {
  list.forEach((e, i, arr) => {
    let newName = e.replace(/(\.(png))?$/i, '.jpg')
    if (arr.includes(newName)) {
      newName = newName.replace(
        /(\.jpg)$/i,
        Math.trunc(Math.random() * 1e3)
          .toString()
          .padStart(3, '0') + '$1'
      )
    }
    rename(`${PATH}/${e}`, `${PATH}/${newName}`)
  })
}

function renameDirectory(list) {
  const nameList = [].concat(list)
  let num = 0
  list.forEach(oldName => {
    let newName = oldName
      .replace(/[技術討論新時代的我們草榴社區達蓋爾旗幟.hmltycom6_\s-]+$/i, '')
      .replace(/([-_–，,\s“”？！～]+)|([[［【]\d+P[\]］】])+/g, ' ')
      .replace(/[（（]/, '(')
      .replace(/[））]/, ')')
      .trim()
    if (!newName || oldName === newName) return
    while (nameList.includes(newName)) {
      newName = newName.replace(
        /\d{0,3}$/,
        ' ' +
          Math.trunc(Math.random() * 1e3)
            .toString()
            .padStart(3, '0')
      )
    }
    nameList.splice(nameList.indexOf(oldName), 1, newName)
    console.log(oldName, ' ----- ', newName)
    num++
    rename(`${PATH}/${oldName}`, `${PATH}/${newName}`)
  })
  console.log(`rename total: ${num}`)
}

// 运行
walk(PATH, function (path, fileName) {
  let oldPath = path + '/' + fileName, // 原文件路径拼接
    // newPath = path + '/' + fileName.replace('.png', '.jpg') // 新文件路径拼接
    newPath = path + '/' + fileName + '.jpg' // 新文件路径拼接

  rename(oldPath, newPath)
})

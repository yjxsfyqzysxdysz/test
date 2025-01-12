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
    renameFile(files)
  }
  if (directory.length) {
    renameDirectory(directory)
  }
}

/*
 *   修改文件名称
 *   oldName: 原文件名
 *   newName: 新文件名
 *   path: 公共地址
 */
function rename(oldName, newName, path = '') {
  const oldPath = path ? `${path}/${oldName}` : oldName
  const newPath = path ? `${path}/${newName}` : newName
  if (oldPath === newPath) throw `${oldPath}: old name and new name is same`
  // return console.log(oldName, '\n', newName)
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      throw err
    } else {
      console.log(`${newName.replace(/^.*(\d{3}\w+)/, '$1')} is success`)
    }
  })
}

function renameFile(list) {
  const obj = { size: 0 }
  // 过滤
  list.forEach(e => {
    const [_, name, suffix] = e.match(/^(.*)\.(png|jpg|jpeg)$/)
    const str = (name.match(/^\d+/g) || name.match(/\(?\d+\)?$/g) || ['0'])[0].replace(/[()]/g, '').replace('[懒惰搬运工]美腿如林，多图杀猫[129P] - 2024-07-15T050936.', '')
    if (!obj[str]) {
      obj[str] = []
      obj.size++
    }
    obj[str].push({ name, suffix: suffix.toLocaleLowerCase() })
  })

  // 去重
  if (obj.size !== list.length) {}
  // TODO 排序
  // console.log(obj)
  // 执行
  for (const key in obj) {
    if (key === 'size') continue
    const [{ name, suffix }] = obj[key]
    rename(`${name}.${suffix}`, `${key.padStart(3, '0')}.${suffix}`, PATH)
  }
}

function renameDirectory(list) {
  const nameList = [].concat(list)
  let num = 0
  list.forEach(oldName => {
    let newName = oldName
      .replace(/[技術討論新時代的我們草榴社區達蓋爾旗幟.hmltycom6_\s-]+$/i, '')
      .replace(/([-_–，,\s“”？！～]+)|([[［【]\d+P[\]］】])+/g, ' ')
      .replace(/[（（]/g, '(')
      .replace(/[））]/g, ')')
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
    rename(`${PATH}\\${oldName}`, `${PATH}\\${newName}`)
  })
  console.log(`rename total: ${num}`)
}

// 运行
walk(PATH, function (path, fileName) {
  let oldPath = `${path}/${fileName}`, // 原文件路径拼接
    // newPath = path + '/' + fileName.replace('.png', '.jpg') // 新文件路径拼接
    newPath = path + '/' + fileName + '.jpg' // 新文件路径拼接

  rename(oldPath, newPath)
})

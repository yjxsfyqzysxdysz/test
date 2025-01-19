console.clear()

// 引入文件系统模块
const fs = require('fs')
const { filterPath2, checkDir, logName } = require('./utils')

// 需要修改的文件路径
// const PATH = ''./picture''

checkDir('LOG')

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
  // if (files.length) {
  //   renameFile(files)
  // }
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
  const oldPath = path ? `${path}\\${oldName}` : oldName
  const newPath = path ? `${path}\\${newName}` : newName
  // return
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      fs.appendFileSync(
        `./LOG/${logName}`,
        `oldName: ${oldName}` + '\n'
        + `newName: ${newName}` + '\n'
        + `err: ${err.toString()}` + '\n'
      )
      console.log({ oldName, newName })
      console.log('err', err)
      // throw err
    } else {
      // console.log(`${newName} is success`)
      fs.appendFileSync(`./LOG/${logName}`, `success: ${newName}` + '\n')
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
  fs.appendFileSync(`./LOG/${logName}`, `list: ${JSON.stringify(list, null, 2)}` + '\n')
  const map = new Map()
  list.forEach(oldName => {
    let newName = filterPath2(oldName)
      .replace(/\(\d+\)/g, '')
      .replace(/(?<!\S)\s?\d+$/g, '')
      .replace(/\s?\.+$/g, '')
      .trim() // 清除末尾数字

    console.log('newName', newName)

    if (!newName) {
      newName = oldName
    }
    if (map.has(newName)) {
      map.set(newName, [...map.get(newName), oldName])
    } else {
      map.set(newName, [oldName])
    }
    rename(oldName, `_${oldName}`, PATH)
  })

  console.log(map)
  fs.appendFileSync(
    `./LOG/${logName}`,
    `map: ${JSON.stringify(Array.from(map.entries()), null, 2)}` + '\n'
      + '-'.repeat(20) + '\n'
  )

  new Promise(resolve => {
    setTimeout(resolve, 1e3)
  })
    .then(() => {
      map.forEach((oldNames, newName) => {
        fs.appendFileSync(`./LOG/${logName}`, `newName: ${newName}` + '\n')

        oldNames.forEach((oldName, index) => {
          if (oldNames.length > 1) {
            rename(`_${oldName}`, `${newName} ${(`${index + 1}`).padStart(3, '0')}`, PATH)
          } else {
            rename(`_${oldName}`, newName, PATH)
          }
        })
      })
    })
}

walk()

const download = require('download')
const { ROOT_PATH, SUFFIX_PATH, LOOP_NUM } = require('./config')
const { LIST, } = require('./data')
const { filterList } = require('./getMissItem')

const INDEX = 0
const { list, path } = LIST[INDEX]

const downloadHandler = (list, toast = 0) => {
  if (!list.length) return console.log('the list is empty')
  const path = `${ROOT_PATH}${LIST[INDEX].path}${SUFFIX_PATH}`
  const message = `No.${toast * LOOP_NUM + 1} to NO.${++toast * LOOP_NUM}`
  console.time(`to download ${message}`)
  return Promise.all(
    list.splice(0, LOOP_NUM).map((url, index) =>
      download(url, path).then(() => {
        console.log(`success No.${index + 1}`)
      })
    )
  )
    .then(() => {
      console.log(`success ${message}`)
      if (!list.length) {
        console.log('all finsh')
        return
      }
      downloadHandler(list, toast)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      console.timeEnd(`to download ${message}`)
    })
}

const downloadList = filterList(list, path)

console.log(`download total: ${downloadList.length}`)
downloadHandler(downloadList)

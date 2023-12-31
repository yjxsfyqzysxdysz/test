const download = require('download')
const { ROOT_PATH, SUFFIX_PATH, LOOP_NUM, REGEXP_RULER, LOCAL_DATA_PATH } = require('./config')
const { LIST } = require(LOCAL_DATA_PATH)
const { filterList } = require('./getMissItem')

let INDEX = 0
let { list, path } = LIST[INDEX]

const downloadHandler = (list, path, toast = 0) => {
  if (!list.length) return console.log('the list is empty')
  const filePath = `${ROOT_PATH}${path.replace(REGEXP_RULER.regDash, '_')}${SUFFIX_PATH}`
  const message = `No.${toast * LOOP_NUM + 1} to NO.${(toast + 1) * LOOP_NUM}`
  console.time(`to download ${message}`)
  return Promise.all(
    list.splice(0, LOOP_NUM).map((url, index) =>
      download(url, filePath, { rejectUnauthorized: false }).then(() => {
        console.log(`success No.${toast * LOOP_NUM + index + 1}`)
      })
    )
  )
    .then(() => {
      if (!list.length) {
        console.log('all finsh')
        let newData = LIST[++INDEX]
        if (newData && newData.list.length) {
          const downloadList = filterList(newData.list, newData.path)
          console.log(`download ${newData.path} total: ${downloadList.length}`)
          downloadHandler(downloadList, newData.path)
        }
        return
      }
      downloadHandler(list, path, ++toast)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      console.timeEnd(`to download ${message}`)
    })
}

const downloadList = filterList(list, path)

console.log(`download ${path} total: ${downloadList.length}`)
downloadHandler(downloadList, path)

const ROOT_PATH = 'F:/'
const SUFFIX_PATH = ''
const LOOP_NUM = 5
const REGEXP_RUL = [/http(s)?:\/{2}[\d\w%/.-]+\.(jpg|png|jpeg)/gi]
const MEITU_PATH = 'https://162.209.156.130/gallery' // 美图网地址
const MEITU_MIDPATH = {}

// 图片代理地址
// https://imageproxy.pimg.tw/resize?url=http%3A%2F%2Fimg3.wnacg.org%2Fdata%2F1379%2F28%2F001.jpg

module.exports = {
  ROOT_PATH,
  SUFFIX_PATH,
  LOOP_NUM,
  REGEXP_RUL,
  MEITU_PATH,
  MEITU_MIDPATH
}

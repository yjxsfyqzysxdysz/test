const ROOT_PATH = 'F:/'
const PREFIX_PATH = '[寫真] '
const SUFFIX_PATH = '' //
const LOOP_NUM = 5
const REGEXP_RUL = [/http(s)?:\/{2}[\d\w%/.-]+\.(jpg|png|jpeg)/gi]
const PROXY_URL = 'https://imageproxy.pimg.tw/resize' // 图片代理地址 https://imageproxy.pimg.tw/resize?url=http%3A%2F%2Fimg3.wnacg.org%2Fdata%2F1379%2F28%2F001.jpg
const MEITU_PATH = 'https://162.209.156.130/gallery' // 美图网地址
const IS_ONLEY_ONE = !false
const MEITU_MIDPATH = {}

const DEFINE_URL = ['https://s3.gifyu.com/images/image07b475ae512c301a.png']

module.exports = {
  ROOT_PATH,
  PREFIX_PATH,
  SUFFIX_PATH,
  LOOP_NUM,
  REGEXP_RUL,
  PROXY_URL,
  MEITU_PATH,
  MEITU_MIDPATH,
  IS_ONLEY_ONE,
  DEFINE_URL
}

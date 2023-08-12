const ROOT_PATH = 'F:/'
const PREFIX_PATH = '[寫真]'
const SUFFIX_PATH = ''
const LOOP_NUM = 150
const REGEXP_RUL = [
  /http(s)?:\/{2}[\d\w%/.-]+\.(jpg|png|jpeg)/gi, // 图片url
  /^http(s)?:\/\/imageproxy/, // imageproxy url
  /(%2f|\/)([0-9a-z-_.%\s]+\.[a-z]+)$/i, // 文件名-英文
  /(%2f|\/)([0-9a-z-._%\u4e00-\u9f5a\s]+\.[a-z]+)$/i // 文件名-中文
]
const PROXY_URL = 'https://imageproxy.pimg.tw/resize' // 图片代理地址 https://imageproxy.pimg.tw/resize?url=http%3A%2F%2Fimg3.wnacg.org%2Fdata%2F1379%2F28%2F001.jpg
const MEITU_PATH = 'https://162.209.156.130/gallery' // 美图网地址
const IS_ONLEY_ONE = !false
const MEITU_MIDPATH = {}
// \x1B[33m%s\x1B[0m'  %s  表 log 第2项入参
const LOG_COLOR = {
  bright: '\x1B[1m', // 亮色
  grey: '\x1B[2m', // 灰色
  italic: '\x1B[3m', // 斜体
  underline: '\x1B[4m', // 下划线
  reverse: '\x1B[7m', // 反向
  hidden: '\x1B[8m', // 隐藏
  black: '\x1B[30m', // 黑色
  red: '\x1B[31m', // 红色
  green: '\x1B[32m', // 绿色
  yellow: '\x1B[33m', // 黄色
  blue: '\x1B[34m', // 蓝色
  magenta: '\x1B[35m', // 品红
  cyan: '\x1B[36m', // 青色
  white: '\x1B[37m', // 白色
  blackBG: '\x1B[40m', // 背景色为黑色
  redBG: '\x1B[41m', // 背景色为红色
  greenBG: '\x1B[42m', // 背景色为绿色
  yellowBG: '\x1B[43m', // 背景色为黄色
  blueBG: '\x1B[44m', // 背景色为蓝色
  magentaBG: '\x1B[45m', // 背景色为品红
  cyanBG: '\x1B[46m', // 背景色为青色
  whiteBG: '\x1B[47m', // 背景色为白色
  end: '\x1B[0m' // 表示重置终端颜色，使其在此之后不再继续成为所选颜色
}

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
  LOG_COLOR,
  DEFINE_URL
}

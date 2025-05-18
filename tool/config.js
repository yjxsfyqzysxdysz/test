const ROOT_PATH = 'F:/'
const PREFIX_PATH = '[寫真]'
const SUFFIX_PATH = ''
const LOCAL_DATA_PATH = './data.json' // 本地数据地址
const LOCAL_TMP_DATA_PATH = './data.js' // 本地零时数据地址
const LOOP_NUM = 25
const LIMIT_NUM = 300
const PROXY_URL = 'https://imageproxy.pimg.tw/resize' // 图片代理地址 https://imageproxy.pimg.tw/resize?url=http%3A%2F%2Fimg3.wnacg.org%2Fdata%2F1379%2F28%2F001.jpg
const MEITU_PATH = 'https://162.209.156.130/gallery' // 美图网地址
const IS_ONLEY_ONE = !1
const IS_ERROR_FINASH = 1
const IS_EMPTY_FINASH = 1
const IS_GIF = false
const MEITU_MIDPATH = {
}
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

const IGNORE_URL = [
  'http://a.d/adblo_ck.jpg',
  'https://a.d/adblo_ck.jpg',
  'https://s3.gifyu.com/images/image07b475ae512c301a.png',
  'https://23img.com/i/2022/09/01/fhz5tz.jpg',
  'https://23img.com/i/2023/01/18/j2pf4o.png',
  'https://s11.gifyu.com/images/SgBip.png',
  'http://mmd.asia/pic/toj7tg.png',
  'https://66img.cc/images/2023/07/20/25921461a5a1ca39d4d02e8ede66edc1e383946871ee973.jpg',
  'https://66img.cc/images/2023/11/09/qrcode_for_gh_ce3247fff5e7_258.jpg',
  'https://66img.cc/images/2023/11/08/3899930c2c849c172a8166805e4344c9.jpg',
  'https://66img.cc/images/2024/03/18/qrcode_for_gh_ec5441f6a38c_258.jpg',
  'https://99img.cc/images/2024/05/03/861546ef5cdc0a0b7e7eb32a0ef90105518691ef3edd7401.jpg',
  'https://img12.360buyimg.com/ddimg/jfs/t1/104755/29/47446/49611/65ea820eFbd3c3ba6/021ba6e44457b7aa.jpg',
  'https://66img.cc/images/2024/05/14/qrcode_for_gh_ec5441f6a38c_258-1.jpg',
  'https://files.catbox.moe/dhthzi.png',
  'https://images2.imgbox.com/cf/22/AUJY5wmx_o.png',
  'https://telegraph-image-3ti.pages.dev/file/8c756e9d3561d28065a7b.jpg',
  'https://telegraph-image-3ti.pages.dev/file/72ff0adbcf328a4e0d32b.jpg',
  'https://telegraph-image-3ti.pages.dev/file/29c9755d2805b6639131f.jpg',
  'https://telegraph-image-3ti.pages.dev/file/1a24a8c11de012796ad20.jpg',
  'https://telegraph-image-3ti.pages.dev/file/49c6ddbeec016986ac194.jpg',
  'https://tupian.li/images/2024/09/14/66e59a45ae9ee.png',
  'https://tupian.li/images/2024/09/12/66e2c086c6faa.png',
  'https://66img.cc/i/2024/11/12/67330372b4e79.jpg',
  'https://66img.cc/i/2024/11/12/673303736422c.jpg',
  'https://image.acg.lol/file/2024/12/31/imagea8cbadf865056709.png',
  "https://66img.cc/i/2025/01/28/6798679bc09dd.jpg",
  "https://image.acg.lol/file/2025/03/05/c8771bcccbb2c2d7394e36fca60e292a.webp",
  "https://image.acg.lol/file/2025/03/08/629b5815a49e0d654043bdc29690cd07.webp",
  'https://66img.cc/i/2025/04/15/67fdc312b9cc3.jpg',
]

const REGEXP_RULER = {
  regImageFileUrl: /http(s)?:\/{2}[\d\w%/.-]+\.(jpg|png|jpeg|webp)/gi, // 图片url
  regImageproxyUrl: /^http(s)?:\/\/imageproxy/, // imageproxy url
  regFileNameEn: /(%2f|\/)([0-9a-z-_.%\s]+\.(jpg|png|jpeg|webp))$/i, // 文件名-英文
  regFileNameCh: /(%2f|\/)([0-9a-z-._%\u4e00-\u9fff\s]+\.(jpg|png|jpeg|webp))$/i, // 文件名-中文
  regImageFile1: /[\d\w.-]+\.(jpg|png|jpeg|gif)/gi, // 图片(包含gif)
  regEmoji: /[\ud800-\udbff][\udc00-\udfff]/g, // emoji 校验
  regCLTitle: /<h4 class="f16">(.+)<\/h4>/, // CL title
  regDash: /[-–]/g, // 破折号
  regUnderline: /_/g, // 下划线
  regANDSymbol: /&amp;/g, // &
  regSymbol: /&amp;|&nbsp;|[，，,。“”'"‘’？?!！丶、～~：:；;+|｜\\/@&＆$%^…￥*#<>《》{}_·\-–—]/g, // 符号
  regLeftRoundBrackets: /[（（]/g, // 左圆括号
  regRoundBrackets: /[（）（）]/g,
  regRightRoundBrackets: /[））]/g, // 右圆括号
  regLeftSquareBrackets: /[『［【]/g, // 左方括号
  regRightSquareBrackets: /[】］』]/g, // 右方括号
  regSquareBrackets: /[\[\]［］【】『』]/g,
  regSpaces: /\s/g, // 空格
  regNumber: /((p|v|gif)+\.?\d+|\d+(p|v|gif)+)/gi, // 页数
}

module.exports = {
  ROOT_PATH,
  PREFIX_PATH,
  SUFFIX_PATH,
  LOCAL_DATA_PATH,
  LOCAL_TMP_DATA_PATH,
  LOOP_NUM,
  LIMIT_NUM,
  REGEXP_RULER,
  PROXY_URL,
  MEITU_PATH,
  MEITU_MIDPATH,
  IS_ONLEY_ONE,
  IS_ERROR_FINASH,
  IS_EMPTY_FINASH,
  IS_GIF,
  LOG_COLOR,
  IGNORE_URL,
}

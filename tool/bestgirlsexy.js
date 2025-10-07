const { setLogColor, dateFormat } = require('./utils')
const fs = require('fs')
const _path = require('path')
const download = require('download')
const axios = require('axios')

const {
  ROOT_PATH, PREFIX_PATH, SUFFIX_PATH,
  LOCAL_DATA_PATH, LOCAL_TMP_DATA_PATH,
  LOOP_NUM, LIMIT_NUM,
  MEITU_PATH, MEITU_MIDPATH,
  IS_ONLEY_ONE, IS_ERROR_FINASH, IS_GIF, IS_EMPTY_FINASH,
  REGEXP_RULER, IGNORE_URL,
  LOG_COLOR
} = require('./config')
const configBrand = require('./configBrand')
const configPersion = require('./configPersion')
const configIngore = require('./configIngore')
const logName = `LOG_${dateFormat()}.log`

 let url = 'https://bestgirlsexy.com/xiuren%e7%a7%80%e4%ba%ba%e7%bd%91-no-8948-pai-huang-gua-girl/'
  url = url.replace(/\s?/g, '')
  if (!(/^https?:[/]{2}/.test(url))) return console.log(setLogColor('red'), '[ERROR] 不是 http 开头')
  const index = url.lastIndexOf('/')
  if (!~index) return console.log(setLogColor('red'), '[ERROR] 查找从右往左第一个\'/\'异常, 请检视code')
  const baseURL = url.slice(0, index + 1)
  const originURL = new URL(url).origin
  const htmlURL = url.slice(index + 1)
  const LOG_LIMIT = `// ${'='.repeat(100)}\n`
  let resData = ''
  let cookieNum = 0
  let isList = true
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Accept-Encoding': 'gzip, deflate, br',
      Pragma: 'no-cache',
      'upgrade-insecure-requests': 1
    },
    responseType: 'arraybuffer',
    responseEcoding: 'utf',
    timeout: 30 * 1e3,
  })
  const utf8decoder = new TextDecoder('utf8') // html 默认为 gbk 格式,若直接使用utf8解析会有乱码
  // 请求当前页面
  return instance
    .get(htmlURL, { headers: { cookie: `visits=${++cookieNum}; totalpv=${cookieNum}` } })
    .then(async res => {
      const html = utf8decoder.decode(res.data)
      fs.appendFileSync(`./LOG/${logName}`, `${url}\n${html}`)
    })

    // ERR_UNESCAPED_CHARACTERS
    //     "https://bestgirlsexy.com/wp-content/uploads/2024/10/XiuRen秀人网-No-9076-Pai-Huang-Gua-Girl-0000-5451822015.jpg",

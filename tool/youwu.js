const { setLogColor, dateFormat, filterPath2, saveLocal } = require('./utils')
const fs = require('fs')
const _path = require('path')
const download = require('download')
const axios = require('axios')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const configBrand = require('./configBrand')
const configPersion = require('./configPersion')
const configIngore = require('./configIngore')
const logName = `LOG_${dateFormat()}.log`


// "https://youwu.im/albums/ccee3ab9d0bbd6fec1f956de43cab4ab", "秀人网 Vol. 7635 可乐Vicky"
// "https://youwu.im/albums/620336835756a71f2b0a3289d5694e34", "秀人网 Vol. 7601 可乐Vicky"
// "https://youwu.im/albums/411f08a933d916763e4bd44928bb5e32", "秀人网 Vol. 7535 可乐Vicky"
// "https://youwu.im/albums/b207b66d1eaeb750565c560d656a7e76", "秀人网 Vol. 7493 可乐Vicky"
// "https://youwu.im/albums/28722050a118874619de1af66f416dcd", "秀人网 Vol. 7457 可乐Vicky"
// "https://youwu.im/albums/72ab587b2332821458ca03825632d3e1", "秀人网 Vol. 7419 可乐Vicky"
// "https://youwu.im/albums/896b010401db593cc34a5243cd3ed7ec", "秀人网 Vol. 7342 可乐Vicky"
// "https://youwu.im/albums/ea2a52f72e479342b550bc728bd7e63d", "秀人网 Vol. 7314 可乐Vicky"
// "https://youwu.im/albums/444670b5a92d26ca224ff2c477a144b9", "秀人网 Vol. 7249 可乐Vicky"
// "https://youwu.im/albums/e45de28c28f185c4b81fb116cd5d479a", "秀人网 Vol. 7099 可乐Vicky"
// "https://youwu.im/albums/d02d3bfe030337ec3b142200d565b6f6", "秀人网 Vol. 7067 可乐Vicky"
// "https://youwu.im/albums/a4574cc16dd02627e425b96e0a4db543", "秀人网 Vol. 7027 可乐Vicky"
// "https://youwu.im/albums/af64d251faf3d12e676e4c75b6973628", "秀人网 Vol. 6990 可乐Vicky"
// "https://youwu.im/albums/837a3a5d58c029e6fa67538b375687e1", "秀人网 Vol. 6948 可乐Vicky"
// "https://youwu.im/albums/f1a276fd0c9cd44f511b8ef59ce54ff8", "秀人网 Vol. 6927 可乐Vicky"
// "https://youwu.im/albums/b1416a93f1cd4c08e648a225657644af", "秀人网 Vol. 6883 可乐Vicky"
// "https://youwu.im/albums/266b94816ee21d597ab5a21bdc430d1a", "秀人网 Vol. 6841 可乐Vicky"
// "https://youwu.im/albums/441c7e32bbbab302bee4a45698a16757", "秀人网 Vol. 6800 可乐Vicky"
// "https://youwu.im/albums/a56ebf64bd7d19fc947392379130e91e", "秀人网 Vol. 6744 可乐Vicky"
// "https://youwu.im/albums/b61c4308393164477375305a08fd79a5", "秀人网 Vol. 6703 可乐Vicky"
// "https://youwu.im/albums/3888a595b892be6ec36aaa2bb0bd07b5", "秀人网 Vol. 6677 可乐Vicky"
// "https://youwu.im/albums/bc0d90e598a46a7e5cf1ebaedf44d11a", "秀人网 Vol. 6640 可乐Vicky"
// "https://youwu.im/albums/77ac1b5ecc38a961b59081f793b2f996", "秀人网 Vol. 6595 可乐Vicky"
// "https://youwu.im/albums/4721b6cf0e297a0ba267c80fe4808a27", "秀人网 Vol. 6493 可乐Vicky"
// "https://youwu.im/albums/3f999daa6771a11eef5ef591d7a96f26", "秀人网 Vol. 6465 可乐Vicky"
// "https://youwu.im/albums/2496d35540abb300cd16198d2e84fb48", "秀人网 Vol. 6374 可乐Vicky"
// "https://youwu.im/albums/3678374290d4c31a7e38e4368bc26601", "秀人网 Vol. 6344 可乐Vicky"
// "https://youwu.im/albums/7fb80ac5efaf913f5f2022f6bcf1777b", "秀人网 Vol. 6275 可乐Vicky"
// "https://youwu.im/albums/74837a3d64cf57f488d2365687b7fb1a", "秀人网 Vol. 6239 可乐Vicky"
// "https://youwu.im/albums/7322ecfc9f5ed451b3dd6f49f22061a2", "秀人网 Vol. 5873 可乐Vicky"
// "https://youwu.im/albums/1daf509897829a13c99f9aa20a47a0e7", "秀人网 Vol. 5837 可乐Vicky"
// "https://youwu.im/albums/f6046e3e7c37dc5d194aacbd049579a3", "秀人网 Vol. 5804 可乐Vicky"
// "https://youwu.im/albums/fa70640d948b04334c18b16ab219bd30", "秀人网 Vol. 5769 可乐Vicky"
// "https://youwu.im/albums/06cfd47b9388b9c10f4ae71f36dc3ace", "秀人网 Vol. 5736 可乐Vicky"
// "https://youwu.im/albums/22b2a66c2a749094150ff2ac821c7b6a", "秀人网 Vol. 5706 可乐Vicky"
// "https://youwu.im/albums/bf2fe991313c2c24c47f1493f50e9643", "秀人网 Vol. 5664 可乐Vicky"
// "https://youwu.im/albums/a676b4b113aa6f791a4a08b635755182", "秀人网 Vol. 5562 可乐Vicky"
// "https://youwu.im/albums/35952ec4b6704e106070d7e3727dddfd", "秀人网 Vol. 5530 可乐Vicky"
// "https://youwu.im/albums/28e1e285404201a058483a62c414fb21", "秀人网 Vol. 5484 可乐Vicky"
// "https://youwu.im/albums/5393c1dc8b855fe4bacac3f8286b8132", "秀人网 Vol. 5459 可乐Vicky"
// "https://youwu.im/albums/107eb7c87abb576e129a6f044ff65bd6", "秀人网 Vol. 5378 可乐Vicky"
// "https://youwu.im/albums/8b5374f2770bcde62894fbb7a615d43e", "秀人网 Vol. 5342 可乐Vicky"
// "https://youwu.im/albums/5e75a26b50e90710fe9e56a43394188e", "秀人网 Vol. 4940 可乐Vicky"
// "https://youwu.im/albums/54febe2f25d394a7beb31149f382cdab", "秀人网 Vol. 4904 可乐Vicky"
// "https://youwu.im/albums/ff992771d245e4a0c32f9ade3110ffba", "秀人网 Vol. 4869 可乐Vicky"
// "https://youwu.im/albums/abec9c0f8ac429a5bf51948636c16028", "秀人网 Vol. 4832 可乐Vicky"
// "https://youwu.im/albums/a477850ef9618260d8f561ce37a1d1d5", "秀人网 Vol. 4767 可乐Vicky"
// "https://youwu.im/albums/f89fc09466f332ee52ddbcd92ad93c89", "秀人网 Vol. 4596 可乐Vicky"
// "https://youwu.im/albums/1c0e2346c5221edec7257354e91ec7e3", "秀人网 Vol. 4484 可乐Vicky"
// "https://youwu.im/albums/a6a0db28f02bfff11aabad6fa0afd12f", "秀人网 Vol. 4073 可乐Vicky"
// "https://youwu.im/albums/5b343b0ef0716085543bef2c2f659506", "秀人网 Vol. 4019 可乐Vicky"
// "https://youwu.im/albums/5a49fc6cbe5287472b1201aa066c00b9", "秀人网 Vol. 3967 可乐Vicky"
// "https://youwu.im/albums/52b08e4043c8d0a8edbca689612a1274", "秀人网 Vol. 3924 可乐Vicky"
// "https://youwu.im/albums/22a2975302d14c50f4aa44a436db88a4", "秀人网 Vol. 3890 可乐Vicky"
// "https://youwu.im/albums/09e5a05a5cac2292e00fe9de9da8e237", "秀人网 Vol. 3858 可乐Vicky"
// "https://youwu.im/albums/a7b64318115a9de0ccb2f80628695286", "秀人网 Vol. 3821 可乐Vicky"
// "https://youwu.im/albums/2face1f4a2e471f31e7017f9a16c6602", "秀人网 Vol. 3493 可乐Vicky"
// "https://youwu.im/albums/fb401f93d01bb6ff544cac233d8384fd", "秀人网 Vol. 2299 可乐Vicky"
// "https://youwu.im/albums/0638e9c3191dadf74a8d552046916ac0", "秀人网 Vol. 2280 可乐Vicky"

let url = 'https://youwu.im/albums/0638e9c3191dadf74a8d552046916ac0'

url = url.replace(/\s?/g, '')
if (!(/^https?:[/]{2}/.test(url))) return console.log(setLogColor('red'), '[ERROR] 不是 http 开头')
const index = url.lastIndexOf('/')
if (!~index) return console.log(setLogColor('red'), '[ERROR] 查找从右往左第一个\'/\'异常, 请检视code')
const baseURL = url.slice(0, index + 1)
const originURL = new URL(url).origin
const htmlURL = url.slice(index + 1)
const resData = {
  title: '',
  list: [],
  count: 0
}
let cookieNum = 0

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

function query(url) {
  return instance
    .get(url, { headers: { cookie: `visits=${++cookieNum}; totalpv=${cookieNum}` } })
    .then(res => {
      const html = utf8decoder.decode(res.data)
      fs.appendFileSync(`./LOG/${logName}`, `${url}\n${html}\n`)
      return html
    })
}

query(htmlURL)
  .then(data => {
    const dom = new JSDOM(data)
    const document = dom.window.document
    const h1Dom = document.getElementsByTagName('H1')[0].innerHTML
    const mainDom = document.getElementById('main')
    const imgDom = mainDom.querySelectorAll('div>img')
    const navigationDiv = document.querySelectorAll('a[aria-label]')
    const lastPage = [...navigationDiv].reduce((pre, cur) => Math.max(pre, (cur.search.match(/\d+$/g) || [])[0]), '0')
    resData.title = filterPath2(h1Dom)
    resData.list.push(...[...imgDom].map(e => e.src))
    resData.count = lastPage
  })
  .then(() => {
    if (resData.count > 1) {
      const queryList = []
      for (let i = 2; i <= resData.count; i++) {
        queryList.push(query(`${htmlURL}?page=${i}`))
      }
      return Promise.all(queryList)
    }
  })
  .then(res => {
    if (!res) return
    res.forEach(data => {
      const dom = new JSDOM(data)
      const document = dom.window.document
      const mainDom = document.getElementById('main')
      const imgDom = mainDom.querySelectorAll('div>img')
      resData.list.push(...[...imgDom].map(e => e.src))
    })
  })
  .then(() => {
    resData.list = [...new Set(resData.list)]
    fs.appendFileSync(`./LOG/${logName}`, `\n\n\n${JSON.stringify(resData, null, 2)}\n`)
    saveLocal({ path: resData.title, list: resData.list })
  })

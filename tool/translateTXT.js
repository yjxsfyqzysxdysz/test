const FS = require('fs')
const fsp = FS.promises
const _path = require('path')
const { FSRead, FSsave } = require('./utils')

const PATH = _path.resolve('E:\\文档\\小说')
const fileName = '.txt'

const path = _path.join(PATH, fileName)

let txtData = FSRead(path)

// 内容提取
txtData = txtData
  .replace(new RegExp('<br>', 'g'), '')
  .replace(new RegExp('<form method="post" name="modactions">', 'g'), '')
  .replace(new RegExp('</form>', 'g'), '')
  .replace(new RegExp('	', 'g'), '')
txtData = findAllMatchIndices(txtData, '<input', '>')
txtData = findAllMatchIndices(txtData, '<div id="ad_interthread">', '</div>')
txtData = findAllMatchIndices(txtData, '<div class="mainbox viewthread">', '<font face="宋体 ">', '', new RegExp(/(?<=<strong><font color="Red">)(.+)(?=<\/font><\/strong>)/g))
txtData = findAllMatchIndices(txtData, '</font>', '<!--tea.monkeye.cn ADD {-->')
txtData = findAllMatchIndices(txtData, '<!--tea.monkeye.cn }-->', '</div>')

// 所有匹配项下标
/**
 * @param {String} str 源字符串
 * @param {String} preStr 前缀
 * @param {String} nextStr 后缀
 * @param {String} [replaceData=''] 替换内容
 * @param {RegExp} [keepData=''] 保留内容
 */
function findAllMatchIndices(str, preStr, nextStr, replaceData = '', keepData = '') {
  let index = 0
  while (index < str.length) {
    let keepDataVal = ''
    // 匹配前项
    const matchIndex1 = str.indexOf(preStr, index)
    if (matchIndex1 === -1) break
    // 匹配后项
    const matchIndex2 = str.indexOf(nextStr, matchIndex1)
    if (matchIndex2 === -1) break
    // 将中间项删除
    if (keepData) {
      let tmpStr = str.slice(matchIndex1, matchIndex2 + nextStr.length)
      const [res] = tmpStr.match(keepData) || []
      if (res) {
        keepDataVal = '\n\n' + res + '\n\n'
      }
    }
    str = str.slice(0, matchIndex1) + replaceData + keepDataVal + str.slice(matchIndex2 + nextStr.length)
    index = matchIndex1
  }
  return str
}

// 字符转换
const numberEnum = '１２３４５６７８９０'
const enWordEnum = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'

for (let e of numberEnum) {
  txtData = txtData.replace(new RegExp(e, 'g'), String.fromCharCode(e.charCodeAt() - 65248))
}
for (let e of enWordEnum) {
  txtData = txtData.replace(new RegExp(e, 'g'), String.fromCharCode(e.charCodeAt() - 65248))
}

txtData = txtData
  .replace(new RegExp('？', 'g'), '?')
  .replace(new RegExp('！', 'g'), '!')
  .replace(new RegExp('～', 'g'), '~')
  .replace(new RegExp('（', 'g'), '(')
  .replace(new RegExp('）', 'g'), ')')
  .replace(new RegExp('％', 'g'), '%')
  .replace(new RegExp(/[＊□]/, 'g'), '*')
  .replace(new RegExp('＋', 'g'), '+')
  .replace(new RegExp(/[─―]/, 'g'), '—')
  .replace(new RegExp(/[ｘ×]/, 'g'), 'x')
  .replace(new RegExp(/[　]/, 'g'), ' ')
  .replace(new RegExp('&nbsp;', 'g'), ' ')

// 格式转换
txtData = txtData
  .replace(/(?<=第)([零一二三四五六七八九十百千\d]+) ?章([：:、 ]+)/g, '$1章 ')
  .replace(/(?<=[\u4e00-\u9fa5，.。…\d：a-z》()（）「」」『』【】<>《》!?'、%——…；°:;~+/·])(\n|\r|\r\n)(?=[\u4e00-\u9fa5，.。…\d：a-z》()（）「」」『』【】<>《》!?'、%——…；°:;~+/·])/ig, '')
  .replace(/ +(第 ?[零一二三四五六七八九十百千\d]+ ?[章集][：:]?)/g, '$1')
  .replace(/ {3,}/g, '  ')
  .replace(/  \(([零一二三四五六七八九十百千]+)\)/g, '第$1章')
  .replace(/ (\n|\r|\r\n)/g, '$1')
  .replace(/(\n|\r|\r\n)(\n|\r|\r\n){2,}/g, '$1$1')

FSsave(txtData, path)

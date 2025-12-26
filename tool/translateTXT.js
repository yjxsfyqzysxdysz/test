const FS = require('fs')
const fsp = FS.promises
const _path = require('path')
const { FSRead, FSsave } = require('./utils')

const PATH = _path.resolve('E:\\文档\\小说')
const fileName = '.txt'

const path = _path.join(PATH, fileName)

let txtData = FSRead(path)

const numberEnum = '１２３４５６７８９０'
const enWordEnum = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｒｓｔｕｖｗｘｙｚ'

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
  .replace(new RegExp('＊', 'g'), '*')
  .replace(new RegExp('＋', 'g'), '+')
  .replace(new RegExp('　', 'g'), ' ')
  .replace(/(?<=第)([\d]+ ?章)(?![：: ])/g, '$1 ')
  .replace(/(?<=[\u4e00-\u9fa5，.。…\d：a-z》()（）「」『』【】<>《》!?'、%——…；°:;~+/])(\n|\r|\r\n)(?=[\u4e00-\u9fa5，.。…\d：a-z》()（）「」『』【】<>《》!?'、%——…；°:;~+/])/ig, '')
  .replace(/ +(第 ?[零一二三四五六七八九十百千\d]+ ?[章集][：:]?)/g, '$1')
  .replace(/ {3,}/g, '  ')
  .replace(/ (\n|\r|\r\n)/g, '$1')
  .replace(/(\n|\r|\r\n)(\n|\r|\r\n){2,}/g, '$1$1')

FSsave(txtData, path)

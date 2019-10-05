const mongoose = require('./06_module/db.js')
const NetSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  pic: {
    type: String,
    trim: true
  },
  redirect: {
    type: String,
    set(params) { //增加数据的时候对redirect字段进行处理
      // parmas可以获取redirect的值、返回的数据就是redirect在数据库实际保存的值
      if (!params) {
        return ''
      }
      if (params.indexOf('http://') !== 0 && params.indexOf('https://') !== 0) {
        return 'http://' + params
      }
      return params
    }
  }
})
const netModal = mongoose.model('net', NetSchema)

const insert = () => {
  const param = new netModal({
    title: '我是一个国际新闻',
    pic: 'http://www.xxx.com/x.png',
    redirect: 'www.bbbbb.com'
  })
  param.save((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('新建成功')
  })
}

insert()
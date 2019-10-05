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
    get(params) {
      console.log('get')
      return params + 1
    },
    set(params) {
      console.log('set')
      return params + 2
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
  console.log(param.redirect) // 只有这样调用时，才会触发get方法
  // 且先执行get方法，再执行给方法，再新建
  // 可能适用于动态变更schema的
  param.save((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('新建成功')
  })
}

insert()
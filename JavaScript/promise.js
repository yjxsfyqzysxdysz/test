// channelList.map(e => {
//   _a.push(this.getOsdoverlying(e))
// })
// /**
//  * promise请求全部成功走then
//  * 只要有一个数据出错走catch
//  * 对于非重要数据，稳定性过差
//  * 通过在Promise.all里面添加.catch的方法
//  * 强行改数据，从而走then
//  * 之后通过filter进行过滤
//  * 可得到全部正确的数据
//  */
// Promise.all(_a.map(p => p.catch(e => null))) // 防止.catch中断
//   .then(res => {
//     console.log(res)
//     this.basicsTableItem = []
//     res.filter(e => e).map((e, i) => {
//       this.basicsTableItem.push({ id: this.roundSetData.channelList[i], label: e.chanNameList[0].channelName })
//     })
//   })


function a() {
  return new Promise( //open开关
    (open, err) => { //原任务
      console.log('a_go...')
      open()
    }
  )
}

function b() {
  return new Promise( //open开关
    (open, err) => { //原任务
      console.log('b_go...')
      open()
    }
  )
}

function c() {
  return new Promise( //open开关
    (open, err) => { //原任务
      console.log('c_go...')
      open()
    }
  )
}
a()
  .then(() => {
    console.log('b-----------')
    b()
    console.log('b------end?')
  })
  .then(() => {
    console.log('c-----------')
    c()
    console.log('c------end?')
  })
  .then(() => {
    console.log('the end')
  })
  .catch(err => {
    console.log('err', err)
  })
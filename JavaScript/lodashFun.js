const _ = require('lodash')
const moment = require('moment')


function a (val) { 
  console.log('节流', val)
}
let _a = _.throttle(a, 1000, {
      'leading': true,
      'trailing': false
    })


// setInterval(() => {
//   let _t = new Date().getTime()
//   console.log(_t)
//   _a(_t)
// }, 500)

/**
 * 需求
 * 根据返回的数据
 * 同一通道的同一Code作为判断
 * status -2 -一次性  每次都显示
 * status -1 -开始    每30min显示一次，当出现 status 为0，不再显示
 * status -0 -停止    每次都显示
 */
let alarmInfoFilter = []
let alarmInfoList = []
let once = true
let res = { channel: -1, evtMain: 6, evtSub: 6004, hasPicture: 0, hasRecord: 0, status: 1, time: "2019-11-20 10:33:17" }
let myMap = new Map()
let mapKey
let mapValue

function ttt (res) {
  // console.log('res')
  let tmp = _.cloneDeep(alarminfoListTmp)
  let status = false // 设定状态
  switch (res.status) {
    case 0: // 0 - 停止
      myMap.delete(mapKey)
      status = true
      break
    case 1: // 1 - 开始
      mapValue = myMap.get(mapKey)
      if (mapValue) { // 有
        if (!moment(mapValue.time).add(30, 'm').isAfter(res.time)) {
          myMap.set(mapKey, res)
          status = true
        }
      } else { // 无
        myMap.set(mapKey, res)
        status = true
      }
      break
    case 2: // 2 - 一次性
      status = true
      break
    default:
      break
  }
  if (!status) { return }
  let _data = { time: res.time, type: res.evtMain, info: res.evtSub, name: '-', status: res.status }
  if (res.channel && res.channel !== -1) {
    _data.name = '通道' + res.channel
  }
  tmp.unshift(_data)
  if (tmp.length > 40) {
    tmp.pop()
  }
  alarminfoListTmp = _.cloneDeep(tmp)
  if (once) {
    once = false
    setInterval(() => {
      alarmInfoList = _.cloneDeep(alarminfoListTmp)
      // console.log('alarmInfoList', moment().format('YYYY-MM-DD HH:mm:ss'), alarmInfoList.length,)
      console.log('alarmInfoFilter', alarmInfoFilter.length, JSON.stringify(alarmInfoFilter))
      console.log('alarmInfoList', alarmInfoList.length)
      console.log(JSON.stringify(alarmInfoList))
      console.log('---------------------------------------------------------')
    }, 1000)
  }
}
/*
  setInterval(() => {
    res = { 
      channel: 1,
      evtSub: parseInt(`100${parseInt(Math.random() * 10 / 3)}`),
      status: parseInt(Math.random() * 10 / 3),
      time: moment(res.time).add(10, 'm').format('YYYY-MM-DD HH:mm:ss')
      // channel: parseInt(`${parseInt(Math.random() * 10)}${parseInt(Math.random() * 10)}`) || -1,
      // evtSub: parseInt(`${parseInt(Math.random() * 10 / 7) || 1}0${parseInt(Math.random() * 10 / 5)}${parseInt(Math.random() * 10)}`),
      // status: parseInt(Math.random() * 10 / 3),
      // time: moment(res.time).add(10, 'm').format('YYYY-MM-DD HH:mm:ss')
    }
    // console.log(_.cloneDeep(res))
    ttt(res)
  }, 500)
*/


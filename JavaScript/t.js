// 20:30-15:30	2:30-9:00
const data = require('./test.js')
// console.log(data)
// 开	0.00075
// 平	0.00075
// df=m*g*h*d*0.015%
// hc=m*g*h*0.075%
const moment = require('moment')
function getTime() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}
function profit (data) {
  let openCost, closeCost
  data.forEach((e, i) => {
    const g = e.type === 0 ? 1e3 : e.type === 1 ? 1e2 : 1
    openCost = e.price * g * e.number * 0.00075
    // const s1 = moment(e.time).set({ hours: 15, minutes: 30, seconds: 0 })
    // const e1 = moment(e.time).add(1, 'days').set({ hours: 20, minutes: 30, seconds: 0 })
    // const s2 = moment(e.time).subtract(1, 'days').set({ hours: 20, minutes: 30, seconds: 0 })
    const e2 = moment(e.time).set({ hours: 15, minutes: 30, seconds: 0 })
    // if (moment(e.time).isSameOrAfter(s1) && moment(e.time).isSameOrBefore(e1)) { // 本日
    // } else if (moment(e.time).isSameOrAfter(s2) && moment(e.time).isSameOrBefore(e2)) { // 次日
    // }
    /**
     * 每日的交易时间为
     * 20:30-次日2:30, 9:00-15:30
     * 15:30为结算时间
     */
  })
  // console.log('开仓手续费', openCost)
}


// profit(data)

// console.log(moment('2010-10-20 11:00:00').isSameOrBefore('2010-10-20 11:00:00'))
console.log(moment('2010-10-20 11:00:00').add(3.5, 'h'))

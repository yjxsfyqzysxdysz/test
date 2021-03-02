// moment.js测试文档
const moment = require('moment')
const _arr = require('./data_array.js')

let t
/*
console.log('获取时间')
console.log('')
t = moment().year()
t = moment().get('year')
console.log('获取年份', t)
t = moment().quarter()
t = moment().get('quarter')
console.log('获取季度', t)
t = moment().month() // '0~11, 0: January, 11: December'
t = moment().get('month')
console.log('获取月份', t + 1)
t = moment().date()
t = moment().get('date')
console.log('获取日期', t)
// moment().day(Number|String).get('weekday') 0~6, 0: Sunday, 6: Saturday
t = moment().weekday() // 可设置
t = moment().isoWeekday() // 可设置
t = moment().day() // 可设置
t = moment().days() // 可设置
t = moment().format('d')
t = moment().get('day')
t = moment().get('weekday')
t = moment().get('isoWeekday')
console.log('获取星期', t)
t = moment().hours()
t = moment().get('hours')
console.log('获取小时', t)
t = moment().minutes()
t = moment().get('minutes')
console.log('获取分钟', t)
t = moment().seconds()
t = moment().get('seconds')
console.log('获取秒数', t)
t = moment().milliseconds()
t = moment().get('milliseconds')
console.log('获取毫秒数', t)
t = moment()
console.log('获取现在时间', t._d)
t = moment().toDate()
t = new Date(moment())
t = moment().toArray() // [years, months, date, hours, minutes, seconds, milliseconds]
t = moment().toObject() // {years: xxxx, months: x, date: xx ...}
console.log('获取当前的年月日时分秒', JSON.stringify(t))

t = moment().day(1).format('YYYY-MM-DD')
console.log('获取前一天日期', t)
t = moment().weekday(5).format('YYYY-MM-DD')
console.log('获取本周五日期', t)
t = moment().weekday(-3).format('YYYY-MM-DD')
console.log('上周五日期', t)
t = moment().subtract(1, 'months').format('YYYY-MM-DD')
console.log('获取上个月今天的日期', t)
t = moment().subtract(1, 'months').format('YYYY-MM')
console.log('获取上个月日期', t)
t = moment().subtract(1, 'days').format('YYYY-MM-DD')
console.log('获取前一天日期', t)
t = moment().subtract(1, 'year').format('YYYY-MM-DD')
console.log('获取去年今天的日期', t)
t = moment().add(2, 'hours').format('YYYY-MM-DD HH:mm:ss')
console.log('获取两个小时之后的时间', t)
t = moment().subtract(5, 'days').format('YYYY-MM-DD')
console.log('获取五天前的日期', t)
console.log('------------------------------------------')

console.log('设置时间')
console.log('')
t = moment().year(2019) // (Number), moment().month(Number)...
t = moment().set('year', 2019) // (String, Int)
t = moment().set({
  year: 2019
}) // (Object)
t = moment().add(1, 'years') // (Number, String) +1y
t = moment().add({
  years: 1
}) // (Object) +1y
t = moment().subtract(1, 'years') // (Number, String) -1y
t = moment().subtract({
  years: 1
}).format('YYYY-MM-DD HH:mm:ss:SSS') // (Object) -1y
console.log('设置年份', t)
t = moment().month(11)
t = moment().set('month', 11)
t = moment().add(1, 'months') // +1mon
t = moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss:SSS') // -1mon
console.log('设置月份', t) // (0~11, 0: January, 11: December)
t = moment().date(15)
t = moment().set('date', 15)
t = moment().add(1, 'days') // +1d
t = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss:SSS') // 1d
console.log('设置某个月中的某一天', t)
t = moment().weekday(0) // 设置日期为本周第一天（周日）
t = moment().isoWeekday(1) // 设置日期为本周周一
t = moment().set('weekday', 0)
t = moment().set('isoWeekday', 1)
t = moment().add(1, 'weeks') // +1week
t = moment().subtract(1, 'weeks').format('YYYY-MM-DD HH:mm:ss:SSS') // -1week
console.log('设置某个星期中的某一天', t)
t = moment().hours(12)
console.log(t.format('YYYY-MM-DD HH:mm:ss:SSS'))
t = moment().set('hours', 12)
t = moment().add(1, 'hours') // +1h
t = moment().subtract(1, 'hours').format('HH') // -1h
console.log('设置小时', t)
t = moment().minutes(30)
t = moment().set('minutes', 30)
t = moment().add(1, 'minutes') // +1m
t = moment().subtract(1, 'minutes').format('mm') // -1m
console.log('设置分钟', t)
t = moment().seconds(30)
t = moment().set('seconds', 30)
t = moment().add(1, 'seconds') // +1s
t = moment().subtract(1, 'seconds').format('ss') // -1s
console.log('设置秒数', t)
t = moment().seconds(30)
t = moment().set('milliseconds', 30).format('SSS')
// t = moment().add(1, 'milliseconds') // +1ms
// t = moment().subtract(1, 'milliseconds').format('SSS') // -1ms
console.log('设置毫秒数', t)
console.log('------------------------------------------')

console.log('格式化设置')
t = moment().format('X') // 返回值为字符串类型
t = moment().unix() // 返回值为数值型
console.log('获取时间戳(秒)', t)
t = moment().format('x') // 返回值为字符串类型
t = moment().valueOf() // 返回值为数值型
console.log('获取时间戳(毫秒)', t)
t = moment().format('YYYY年MM月DD日')
t = moment().format('YYYY-MM-DD')
console.log('格式化', t)
t = moment().format('HH时mm分ss秒')
console.log('24小时制', t)
t = moment().format('hh:mm:ss a')
console.log('12小时制', t)
t = moment().format('YYYY年MM月DD日 HH时mm分ss秒')
t = moment().format('YYYY-MM-DD hh:mm:ss:SSS a')
t = moment().format('YYYY-MM-DD hh:mm:ss:SSS A')
console.log(t)
console.log('------------------------------------------')

console.log('提升')
console.log('++++++++++++++++++++++')
console.log('-Start of Time')
t = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss:SSS')
console.log('获取今天0时0分0秒', t)
t = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss:SSS')
console.log('获取本周第一天(周日)0时0分0秒', t)
t = moment().startOf('isoWeek').format('YYYY-MM-DD HH:mm:ss:SSS')
console.log('获取本周周一0时0分0秒', t)
t = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss:SSS')
console.log('获取当前月第一天0时0分0秒', t)
t = moment().startOf('quarter').format('YYYY-MM-DD HH:mm:ss:SSS')
console.log('获取当前季度第一天0时0分0秒', t)
console.log('')
console.log('-End of Time')
t = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss:SSS')
console.log('获取今天23时59分59秒', t)
t = moment().endOf('week').format('YYYY-MM-DD HH:mm:ss:SSS')
console.log('获取本周最后一天(周六)23时59分59秒', t)
t = moment().endOf('isoWeek').format('YYYY-MM-DD HH:mm:ss:SSS')
console.log('获取本周周日23时59分59秒', t)
t = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss:SSS')
console.log('获取当前月最后一天23时59分59秒', t)
t = moment().endOf('quarter').format('YYYY-MM-DD HH:mm:ss:SSS')
console.log('获取当前季度第最后一天23时59分59秒', t)
console.log('')
console.log('-天数')
t = moment().daysInMonth()
console.log('获取当前月的总天数', t)
t = moment().isoWeeksInYear()
t = moment().weeksInYear()
console.log('周数', t)
t = moment().week()
console.log('一年的第几周', t)
t = moment().dayOfYear()
console.log('一年的第几天', t)
console.log('')
// 比较时间
console.log('比较时间')
// moment().diff(Moment|String|Number|Date|Array)
// 获取两个日期之间的时间差
let start_date = moment().subtract(1, 'weeks')
let end_date = moment()
t = end_date.diff(start_date) // 返回毫秒数
console.log('一周的毫秒数', t)
t = end_date.diff(start_date, 'months') // 0
console.log('这一周和上一周的月份差', t)
t = end_date.diff(start_date, 'weeks') // 1
console.log('这一周和上一周的周差', t)
t = end_date.diff(start_date, 'days') // 7
console.log('这一周和上一周的天数差', t)
t = start_date.diff(end_date, 'days') // -7
console.log('上一周和这一周的天数差', t)
console.log('')
// 转化为JavaScript原生Date对象
t = new Date(moment())
console.log('转化为JavaScript原生Date对象', t)
// 将Moment时间转换为JavaScript原生Date对象
let nativeDate1 = moment().toDate()
let nativeDate2 = new Date(moment())
console.log(String(nativeDate1) === String(nativeDate2)) // true
console.log('------------------------------------------')
console.log('')

console.log('练习')
// 获取昨日0时0分0秒到昨日23时59分59秒， 格式：[milliseconds, milliseconds]
console.log(
  JSON.stringify([
    moment().day(1).startOf('day').format('x'),
    moment().day(1).endOf('day').format('x')
  ])
)
// 获取上周一到上周日时间范围，格式: [seconds, seconds]
console.log(
  JSON.stringify([
    moment().weekday(-6).startOf('day').format('X'),
    moment().weekday(0).endOf('day').format('X')
  ])
)
// 获取上个月第一天和最后一天时间范围， 格式：[YYYY-MM-DD, YYYY-MM-DD]
console.log(
  JSON.stringify([
    moment().startOf('month').format('YYYY-MM-DD'),
    moment().endOf('month').format('YYYY-MM-DD')
  ])
)
console.log('------------------------------------------')
console.log('')
t = moment.isMoment(new Date())
console.log('是否 Moment 对象', t)
t = moment.isMoment(moment())
console.log('是否 Moment 对象', t)
t = moment.isDate(new Date())
console.log('是否 Date 对象', t)
t = moment.isDate(moment())
console.log('是否 Date 对象', t)
console.log('')
console.log('是否闰年')
for (let i = 0; i < 10; i++) {
  let d = moment([2000]).add(i, 'years')
  let s = d.isLeapYear()
  if (s) {
    console.log('闰年', d.format('YYYY'))
  }
}
// console.log(
//   moment('2019-09-16 20:00:00:0').isSame(moment('2019-09-16 20:00:00:0'))
//   moment('2019-09-16 20:00:00:0').isBefore(moment('2019-09-16 20:01:00:0')) // 前一个在后一个之前
//   moment('2019-09-16 20:00:00:0').isAfter(moment('2019-09-16 20:00:00:0'))
//   moment('2019-09-16 20:00:00:0').isBetween(moment('2019-09-16 20:00:00:0', undefined)) // Moment|String|Number|Date|Array
//   moment('2019-09-16 20:00:00:0').isSameOrAfter(moment('2019-09-16 20:00:00:0')) // 2.11.0+
//   moment('2019-09-16 20:00:00:0').isSameOrBefore(moment('2019-09-16 20:00:00:0')) // 2.11.0+
// )
console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
console.log(moment().add(10, 'seconds').format('YYYY-MM-DD HH:mm:ss'))
console.log(moment().diff(moment().add(10, 'seconds')))
console.log(moment().add(10, 'seconds').diff(moment()))

*/
// t = moment('2019-11-15 14:34:21').subtract(30, 's').format('YYYY-MM-DD HH:mm:ss')
// console.log(t)
// t = moment('2019-11-15 14:34:21').add(270, 's').format('YYYY-MM-DD HH:mm:ss')


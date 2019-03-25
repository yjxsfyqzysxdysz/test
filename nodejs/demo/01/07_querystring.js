/**
 * nodejs官方提供的模块'querystring'
 * 将查询字符串自动转为对象
 */

// nodejs提供一个模块
const querystring = require('querystring');
var str = 'lid=5&name=tom&age=18';
// 查询字符串解析为对象
var obj = querystring.parse(str);
console.log(obj); // { lid: '5', name: 'tom', age: '18' }

// 把对象转换为查询字符串
var product = {
  pid: 25,
  name: 'dell',
  price: 4000
}
var res = querystring.stringify(product);
console.log(res); // pid=25&name=dell&price=4000
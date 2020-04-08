// 模块和命名空间
// 模块
// export
// 见a.ts

// import
// import { name } from './b'
// import * as info from './b'
// import { name as nameProp } from './b'
// console.log('name', name)
// console.log('info', info)
// console.log('nameProp', nameProp)

// import * as AData from './a'
// console.log(AData)

// import './a' // 适合全局作用的代码逻辑

// export default
// import name from './c'
// console.log(name)

// export = 和 import xx = require()
// import name = require('./c')
// console.log(name)

// 引入moment库
// import moment from 'moment'
// import * as moment from 'moment'
// import moment = require('moment')
// console.log(moment)
// 第1种和第3种是相同的，都是引入其默认导出
// 第2种是包括默认导出所有东西都统统引入

// 命名空间
// 定义和使用
// ts1.5之前被称为内部模块
// module来定义内部模块，export来决定外部抛出
// namespace 命名空间 关键字

// 在程序内部，用于防止全局污染时，想把相关内容都放在一起时，建议使用命名空间
// 当封装工具或库，要适用于模块系统中引入时，适合使用模块(模块也能起到防止全局污染的作用)

// 定义
// 若使用tsc编译，在需要要使用命名空间的地方，使用 /// 指令，path写文件路径（为相对路径）
// /// <reference path="./space.ts" />
// let isLetter = Validation.checkLetter('abc')
// console.log(isLetter)
// 编译时，需要制定一个参数 outFile，该参数用来制定输出的文件名
/**
 * eg:
 * tsc --outFile src/index.js src/ts-modules/index.ts
 *
 * src/index.js
 * var Validation;
 * (function (Validation) {
 *     var isLetterReg = /^[A-Za-z]+$/;
 *     Validation.isNumberReg = /^[0-9]+$/;
 *     Validation.checkLetter = function (text) {
 *         return Validation.isNumberReg.test(text);
 *     };
 * })(Validation || (Validation = {}));
 */
// ts推荐使用模块

// 拆分为多个文件
// /// <reference path="./letter-validation.ts" />
// /// <reference path="./number-validation.ts" />
// let isLetter = Validation.checkLetter('abc')
// let isNumber = Validation.checkNumber('asd')
// console.log(isLetter, isNumber)
// 命名空间相同名称的，会合并为一个，所以命名空间不会冲突

// 别名
// namespace Shapes {
//   export namespace Polygons {
//     export class Triangle {}
//     export class Squaire {}
//   }
// }
// import polygons = Shapes.Polygons
// let triangle = new polygons.Triangle()
// 使用别名可以解决深层次嵌套的问题

// 模块解析
// 相对和非相对模块导入
// 相对导入 / ./ ../ 根目录、当前目录、上级目录

// 模块解析策略
// 解析策略有2种 node || classic
// tsconfig.json
// "moduleResolution": "node"
// 若没有该项配置，则根据module来编译配置
// node node的解析策略，classic ts的解析策略(会由内向外遍历查找)

// 模块解析配置项
// tsconfig.json
// baseUrl 通过设置，来确定编译后模块都放在哪个文件夹下
// paths 可进行路径映射，使用paths必须设置baseUrl 值可以是数组、对象
// rootDirs 路径列表，会将路径放到一个文件中


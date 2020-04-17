// 第三方库的声明文件
import indexOf = require('indexof') // 返回数组下标
console.log(indexOf([1, 5, 2]))

/**
 * 在tsconfig.json的'paths'选项添加路径
 * 如下：
 * "paths": {
 *    "*": ["./node_modules/@types", "./typings/*"]
 *  }
 *
 * 在根目录下添加typings文件夹
 * 其下添加与模块同名文件夹
 * 在该文件夹内添加 index.d.ts 文件
 * 在该文件内书写声明文件
 * 文件范例如下:
 * declare function indexof(array: Array<any>, value?: any): number
 * export = indexof
 *
 * 添加完成即可在引用模块处，显示
 *
 * 注：
 * * 可以现在@types/*中寻找对应模块是否有第三方的声明文件，若没有则需要自己写
 * * ts管网上有ts几种类型的声明文件模板
 * * 全局声明是在 src 中创建globals.d.ts文件，进行声明
 */
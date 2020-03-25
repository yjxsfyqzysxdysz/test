// 模块
// 8.1 模块的的概念
// 8.2 模块导出的几种方法
//     1、export 导出声明
//     2、export 导出语句
//     3、export default
//     4、import导入模块
// 8.3 模块化封装上一讲的DB库

// 模块的的概念（官方）:
//     关于术语的一点说明: 请务必注意一点，TypeScript 1.5里术语名已经发生了变化。 “内部模块”现在称做“命名空间”。
//     “外部模块”现在则简称为“模块” 模块在其自身的作用域里执行，而不是在全局作用域里；
//     这意味着定义在一个模块里的变量，函数，类等等在模块外部是不可见的，除非你明确地使用export形式之一导出它们。
//     相反，如果想使用其它模块导出的变量，函数，类，接口等的时候，你必须要导入它们，可以使用 import形式之一。

// 模块的概念（自己理解）：
//   我们可以把一些公共的功能单独抽离成一个文件作为一个模块。
//   模块里面的变量 函数 类等默认是私有的，如果我们要在外部访问模块里面的数据（变量、函数、类），
//   我们需要通过export暴露模块里面的数据（变量、函数、类...）。
//   暴露后我们通过 import 引入模块就可以使用模块里面暴露的数据（变量、函数、类...）。

import { getData, save, getData as get } from './基础1/modules/db';
// import getData from './modules/db';
// ts 里，不能写 db.ts 的 ts
// as 关键字 重命名
// import 带 {} 为 export 方法抛出
// import 不带 {} 为 export default 方法抛出
// html 是无法识别 import、 require 的，nodejs可以，若要识别需经 webpack 等程序编译

getData();
get()
save();

import { MsSqlDb } from './基础1/modules/db2'

class User{
  username:string | undefined;
  password:string | undefined;
}

var consoleValue = new User();
consoleValue.username = '张三2222';
consoleValue.password = '123456';

var oMssql = new MsSqlDb<User>();
oMssql.add(consoleValue);


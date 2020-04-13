// 声明文件
/**
 * 识别已有js库的类型
 * * 全局库
 * * 模块化库
 * * UMD库
 * 处理库声明文件
 * * 模块插件或UMD插件
 * * 修改全局的模块
 * * 使用依赖
 * * 快捷外部模块声明
 */

// 识别已有js库的类型
// 全局库
/**
 * 在HTML中通过script引入
 * 这种不需要设置变量，只需引入便可使用的
 *
 * 1、有window赋值
 * 2、有判断document或window是否存在的逻辑
 * 3、有顶级的var语句或function声明
 * 有以上3项的，可能为全局库
 *
 * 由于编译工具的出现，现在将全局库打包编译成UMD库十分容易
 * 所以现在全局库很少
 *
 * ts给每一种全局库都有一个模板（3个）
 */
// console.log(documentTitle)
// setTitle('li')
// console.log(getTitle())

// 模块化库
/**
 * 模块化库就是依赖了模块解析器的库
 *
 * 1、一般能看到import和export语句的，就是模块化库
 * 2、无条件的调用require或define方法
 * 3、赋值给exports或module.exports
 * 符合以上3种任意一种的，就是模块化库
 *
 * ts给每一种模块化库都有一个模板（4个）
 */

// UMD库
/**
 * UMD库将全局库和模块化库相结合
 * 会首先判断是否有模块加载器的一些方法
 * 如define、module.exports
 * 度过都没有就走全局的形式
 *
 * 在HTML中通过script引入,在模块中通过模块系统加载
 *
 * 既可以作为模块使用，又可以作为全局库使用
 * 在引进来就能直接使用的库，需要判断是否为UMD模块；若不是，则为全局库
 * 若除了script方式，还有import和require方式在模块中引入，则为UMD库；否则为全局库
 *
 * 有 define 或 module 声明时
 */

// 处理库声明文件
// 模块插件或UMD插件
/**
 * 可以参考module-plugin.d.ts官方范例
 */

// 修改全局的模块
// import '../modules/add-methods-to-string.js'
// const name = 'li'
// console.log(name.getFirstLetter())
/**
 * 其声明文件
 * 写声明合并
 */

// 使用依赖
// import { age, info } from '../modules/c.js'
/**
 * 在
 * 可以加上对其他库的依赖
 * 如果使用全局库可以使用'三斜线'(///)
 * ///<reference types:"库名" />
 * 如果使用模块化库可以使用import
 * import * as moment from 'moment'
 *
 * 注意
 * 防止命名冲突，放在命名空间中
 */

// 快捷外部模块声明
// ts2.0
/**
 * 在typings文件夹中创建组件同名文件夹，文件内index.d.ts
 * :eg declare module 'moment
 */
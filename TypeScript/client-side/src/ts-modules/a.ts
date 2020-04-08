// ts1.5之前有2个概念：内部模块、外部模块
// 1.5之后，内部模块-》命名空间，外部模块-》模块
// ts和es6保持一致，包含顶级的import和export文件都被当成一个模块
// 里面定义的内容仅模块内可见，而不是全局可见

// ts除es6标准的语法外还有一些特定的语法
// ts 的 export 可导出变量、函数、类，还可导出接口、类型别名
export interface FuncInterface {
  name: string
  (arg: number): string
}
export class ClassC {
  constructor() { }
}
class ClassD {
  constructor() { }
}
export { ClassD }
export { ClassD as ClassNamedD }

export * from './b'
export { name } from './b'
export { name as NamePorp } from './b'













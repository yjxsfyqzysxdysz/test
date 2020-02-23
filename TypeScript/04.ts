// ts 中定义类
var consoleValue:any

class class8 {
  name: string // 属性 前面省略了 public关键词
  constructor(n: string) { // 构造函数 实例化类的时候触发的方法
    this.name = n
  }
  run():string {
    return this.name
  }
}
// consoleValue = new class8('heng')

class class9 {
  name: string // 属性 前面省略了 public关键词
  constructor(name: string) { // 构造函数 实例化类的时候触发的方法
    this.name = name
  }
  getName():string {
    return this.name
  }
  setName(name:string):void {
    this.name = name
  }
}
var tmp1 = new class9('heng')
tmp1.setName('ha')
// consoleValue = tmp1.getName()


// ts 中实现继承 extends、super
class class10 {
  name: string
  constructor(name: string) {
    this.name = name
  }
  run(): string{
    return `${this.name} is sport`
  }
}
var tmp2 = new class10('zhong')
// consoleValue = tmp2.run()

class class11 extends class10 { // 使class11 继承class10
  constructor(name: string) {
    super(name) // 调用父类的构造函数 /* 初始化父类的构造函数 */
  }
}
var tmp3 = new class11('wu')
// consoleValue = tmp3.run()

// ts 中继承的探讨 父类的方法和子类的方法一致
class class12 extends class10 { // 使class11 继承class10
  constructor(name: string) {
    super(name) // 调用父类的构造函数 /* 初始化父类的构造函数 */
  }
  run():string { // 当子类与父类中的方法重名时，执行的是子类中的方法
    return `${this.name} is run`
  }
  work():string { // 扩展子类中的方法
    return `${this.name} is working` // 获取父类中的属性
  }
  // 执行方法，先在子类中找，没有时采取父类中找
}
var tmp4 = new class12('wu')
// consoleValue = tmp4.work()


// 类中的修饰符
// TypeScript中定义了3种修饰符
// public：公有类型 在类里面、子类、类外面都可以访问
// protected：保护类型 在类里面、子类里面可以访问，在类外面无法访问
// private：私有类型 在类面可以访问，在类外面、子类里面无法访问
// 属性如果未加修饰符，则默认为公有(public)

// 公有类型
class class13 {
  public name: string // 公有属性
  constructor(name: string) {
    this.name = name
  }
  run(): string{
    return `${this.name} is sport`
  }
}
var tmp5 = new class13('zhong')
// consoleValue = tmp5.run()

// 类外部访问公有属性
class class14 extends class13 {
  constructor(name: string) {
    super(name)
  }
  work():string {
    return `${this.name} is working`
  }
}
var tmp6 = new class14('hei')
// consoleValue = tmp6.work()
// consoleValue = tmp6.name


// 保护类型
class class15 {
  protected name: string // 保护属性
  constructor(name: string) {
    this.name = name
  }
  run(): string{
    return `${this.name} is sport`
  }
}
class class16 extends class15 {
  constructor(name: string) {
    super(name)
  }
  work():string {
    return `${this.name} will working`
  }
}
var tmp7 = new class16('class16')
// consoleValue = tmp7.work()
// consoleValue = tmp7.run()

// 类外部访问保护属性
// consoleValue = tmp7.name // 类外部无法访问保护类型的属性


// 私有类型
class class17 {
  private name: string // 私有属性
  constructor(name: string) {
    this.name = name
  }
  run(): string{
    return `${this.name} is sport`
  }
}
class class18 extends class17 {
  constructor(name: string) {
    super(name)
  }
  // work():string {
  //   return `${this.name} will working` // 子类里面无法访问私有类型的属性
  // }
}
var tmp8 = new class17('class17')
// consoleValue = tmp8.name // 类外部无法访问私有类型的属性
// consoleValue = tmp8.run() // 当前类中可以调用属性

var tmp9 = new class18('class18')
// consoleValue = tmp9.name // 类外部无法访问私有类型的属性

console.log(consoleValue)
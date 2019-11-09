// 1、ts中的累

class Person {
  public name: string; // 属性
  public constructor(n: string) {
    // 构造函数 实例化类的时候触发的方法
    this.name = n;
  }
  public run(): void {
    console.log(this.name);
  }
}

var p = new Person('lalal');
p.run();

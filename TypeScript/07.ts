var consoleValue: any;

// typeScript中的接口
//   属性类接口
//   函数类型接口
//   可索引接口
//   类类型接口
//   接口扩展

// 函数类型接口:对方法传入的参数 以及返回值进行约束    批量约束

// 加密的函数类型接口
interface encrypt {
  (key: string, value: string): string;
}

var md5: encrypt = function(key: string, value: string): string {
  //模拟操作
  return key + value;
};
// consoleValue = md5('name', 'zhangsan')

var sha1: encrypt = function(key: string, value: string): string {
  //模拟操作
  return key + '----' + value;
};
// consoleValue = sha1('name', 'lisi')

// 可索引接口：数组、对象的约束  （不常用）
// ts定义数组的方式
// var arr1: number[] = [2342, 235325]
// var arr2: Array<string> = ['111', '222']

// 可索引接口 对数组的约束
interface UserArr {
  [index: number]: string;
}
var arr3: UserArr = ['aaa', 'bbb'];
// var arr4: UserArr = [123, 'bbb'];  /*错误*/
// console.log(arr[0]);

// 可索引接口 对对象的约束
interface UserObj {
  [index: string]: string;
}
var obj1: UserObj = { name: '张三' };

// 类类型接口:对类的约束  和   抽象类抽象有点相似
interface Animals1 {
  name: string;
  eat(str: string): void;
}

class Dogs1 implements Animals1 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat() {
    console.log(this.name + '吃粮食');
  }
}

// consoleValue = new Dogs1('dog');
// consoleValue.eat();

class Cats1 implements Animals1 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat(food: string) {
    console.log(this.name + '吃' + food);
  }
}

// consoleValue = new Cats1('cat');
// consoleValue.eat('老鼠');

// 接口扩展：接口可以继承接口 // 相当于管道
interface Animals2{
  eat(): void;
}

interface Person1 extends Animals2{
  work(): void;
}

class Web1 implements Person1{
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat() {
    console.log(this.name+'喜欢吃馒头')
  }
  work() {
    console.log(this.name + '写代码');
  }
}

consoleValue = new Web1('小李');
consoleValue.eat();
interface Animals2 {
  eat(): void;
}

interface Person2 extends Animals2 {
  work(): void;
}

class Programmer {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  coding(code: string) {
    console.log(this.name + code);
  }
}

class Web2 extends Programmer implements Person2 { // web2 继承Programmer 实现 Person2
  constructor(name: string) {
    super(name);
  }
  eat() {
    console.log(this.name + '喜欢吃馒头');
  }
  work() {
    console.log(this.name + '写代码');
  }
}

consoleValue = new Web2('小李');
// consoleValue.eat();
consoleValue.coding('写ts代码');

console.log(consoleValue);

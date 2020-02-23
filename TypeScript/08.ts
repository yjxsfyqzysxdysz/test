var consoleValue: any;
// typeScript中的泛型
//   泛型的定义
//   泛型函数
//   泛型类
//   泛型接口

// 泛型：软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。
// 在像C#和Java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。
// 通俗理解：泛型就是解决 类 接口 方法的复用性、以及对不特定数据类型的支持(类型校验)

// eg:
// 1、只能返回string类型的数据
function getData0(value: string): string {
  return value;
}

// 2、同时返回 string类型 和number类型 使用函数重载 （代码冗余）
function getData1(value: string): string {
  return value;
}
function getData2(value: number): number {
  return value;
}

// 3、同时返回 string类型 和number类型 any可以解决这个问题 数据类型放弃校验
function getData3(value: any): any {
  return '哈哈哈';
}
// any放弃了类型检查,传入什么 返回什么。比如:传入number 类型必须返回number类型  传入 string类型必须返回string类型
// 存在传入的参数类型和返回的参数类型可以不一致 的情况
function getData4(value: any): any {
  return '哈哈哈';
}

// 泛型：可以支持不特定的数据类型   要求：传入的参数和返回的参数一致

// T表示泛型，具体什么类型是调用这个方法的时候决定的

function getData5<T>(value: T): T {
  // 要求传入传出参数类型一致
  return value;
}
getData5<number>(123);
getData5<string>('1214231');
// getData5<number>('2112');       /*错误的写法*/

function getData6<T>(value: T): any {
  // 传入传出参数类型可以不一致，对传出参数类型不做限制
  return '2145214214';
}

getData6<number>(123); //参数必须是number
getData6<string>('这是一个泛型');

// 泛型类：比如有个最小堆算法，需要同时支持返回数字和字符串 a  -  z两种类型。  通过类的泛型来实现
// 一般
class MinClass {
  public list: number[] = [];
  add(num: number) {
    this.list.push(num);
  }
  min(): number {
    var minNum = this.list[0];
    for (var i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }
}
consoleValue = new MinClass();
for (let i = 10; i > 0; i--) {
  consoleValue.add(Math.floor(Math.random() * 10));
}
// console.log(consoleValue.min());

// 类的泛型
class MinClas<T> {
  public list: T[] = [];
  add(value: T): void {
    this.list.push(value);
  }
  min(): T {
    var minNum = this.list[0];
    for (var i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }
}

// 泛型函数  相当于自定义函数
consoleValue = new MinClas<
  number
>(); /* 实例化类 并且制定了类的T代表的类型是number */
for (let i = 10; i > 0; i--) {
  consoleValue.add(Math.floor(Math.random() * 10));
}
// console.log(consoleValue.min());

consoleValue = new MinClas<
  string
>(); /* 实例化类 并且制定了类的T代表的类型是string */
consoleValue.add('c');
consoleValue.add('a');
consoleValue.add('v');
// console.log(consoleValue.min());

// 泛型接口

// 函数类型接口
interface ConfigFn1 {
  (value1: string, value2: string): string;
}
var setData: ConfigFn1 = function(value1: string, value2: string): string {
  return value1 + value2;
};
setData('name', '张三');

// 1、泛型接口 方式一
interface ConfigFn2 {
  <T>(value: T): T;
}

var getData7: ConfigFn2 = function<T>(value: T): T {
  return value;
};
// getData7<string>('张三');
// getData7<string>(1243);  // 错误

// 2、泛型接口 方式二
interface ConfigFn3<T> {
  (value: T): T;
}
function getData8<T>(value: T): T {
  return value;
}
var myGetData: ConfigFn3<string> = getData8;
myGetData('20'); // 正确
// myGetData(20)  // 错误

// 两种方式没啥区别，就是一步和两步的区别而已


// 定义一个User的类这个类的作用就是映射数据库字段  
// 然后定义一个 MysqlDb的类这个类用于操作数据库   
// 然后把User类作为参数传入到MysqlDb中

//把类作为参数来约束数据传入的类型
class User1{
  username: string | undefined;
  pasword: string | undefined;
}
class MysqlDb1{
  add(user: User1): boolean{
    console.log(user);
    return true;
  }
}
consoleValue = new User1();
consoleValue.username = '张三';
consoleValue.pasword = '123456';
var Db1 = new MysqlDb1();
Db1.add(consoleValue);

class ArticleCate1{
  title: string | undefined;
  desc: string | undefined;
  status: number | undefined;
}
class MysqlDb2{
  add(info: ArticleCate1): boolean{
    console.log(info);
    console.log(info.title);
    return true;
  }
}
consoleValue = new ArticleCate1();
consoleValue.title = "国内";
consoleValue.desc = "国内新闻";
consoleValue.status = 1;
var Db2 = new MysqlDb2();
Db2.add(consoleValue);

// 问题：代码重复

// 定义操作数据库的泛型类
class MysqlDb3<T> {
  add(info: T): boolean {
    return true;
  }
  updated(info: T, id: number): boolean {
    return true;
  }
}

// 想给User表增加数据

// 1、定义一个User类 和数据库进行映射
class User2{
  username: string | undefined;
  pasword: string | undefined;
}
consoleValue = new User2();
consoleValue.username = '张三';
consoleValue.pasword = '123456';
var Db3 = new MysqlDb3<User2>(); // <User2> 对传入的参数进行校验
Db3.add(consoleValue);

// 2、相关ArticleCate增加数据  定义一个ArticleCate类 和数据库进行映射
class ArticleCate2 {
  title: string | undefined;
  desc: string | undefined;
  status: number | undefined;
  constructor(params: {
    title: string | undefined;
    desc: string | undefined;
    status?: number | undefined;
  }) {
    this.title = params.title;
    this.desc = params.desc;
    this.status = params.status;
  }
}
// 增加操作
consoleValue = new ArticleCate2({
  title: '分类',
  desc: '1111',
  status: 1
});

//类当做参数的泛型类
var Db4 = new MysqlDb3<ArticleCate2>();
Db4.add(consoleValue);

// 修改数据
consoleValue = new ArticleCate2({
  title: '分类111',
  desc: '2222'
});
consoleValue.status = 0;

var Db5 = new MysqlDb3<ArticleCate2>();
Db5.updated(consoleValue, 12);

console.log(consoleValue);

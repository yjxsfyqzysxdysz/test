var consoleValue: any;

// 装饰器:装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，属性或参数上，可以修改类的行为。
// 通俗的讲装饰器就是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能。
// 常见的装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器
// 装饰器的写法：普通装饰器（无法传参） 、 装饰器工厂（可传参）
// 装饰器是过去几年中js最大的成就之一，已是Es7的标准特性之一
// 可以理解为管道

// 1、类装饰器：类装饰器在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。 传入一个参数
// 1.1 类装饰器:普通装饰器（无法传参）
function logClass1(params: any) {
  console.log(params);
  // params 就是当前类
  params.prototype.apiUrl = '动态扩展的属性';
  params.prototype.run = function() {
    console.log('我是一个run方法');
  };
}

@logClass1
class HttpClient1 {
  constructor() {}
  getData() {}
}
consoleValue = new HttpClient1();
console.log(consoleValue.apiUrl);
consoleValue.run();

//1.2 类装饰器:装饰器工厂（可传参）
function logClass2(params: string) {
  return function(target: any) {
    console.log('target', target); // 方法 HttpClient2
    console.log('params', params);
    target.prototype.apiUrl = params;
  };
}

@logClass2('http://127.0.0.1:80')
class HttpClient2 {
  constructor() {}
  getData() {}
}

consoleValue = new HttpClient2();
console.log(consoleValue.apiUrl);

// 1、类装饰器
//   下面是一个重载构造函数的例子。
//   类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
//   如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
function logClass3(target: any) {
  console.log(target);
  return class extends target {
    apiUrl: any = '我是修改后的数据';
    getData() {
      this.apiUrl = this.apiUrl + '----';
      console.log(this.apiUrl);
    }
  };
}

@logClass3
class HttpClient3 {
  public apiUrl: string | undefined;
  constructor() {
    this.apiUrl = '我是构造函数里面的apiUrl';
  }
  getData() {
    console.log(this.apiUrl);
  }
}

consoleValue = new HttpClient3();
consoleValue.getData();

// 2、属性装饰器
//   属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
//   1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
//   2、成员的名字。
// 类装饰器
function logClass(params: string) {
  return function(target: any) {
    // console.log(target);
    // console.log(params);
  };
}

//属性装饰器
function logProperty(params: any) {
  return function(target: any, attr: any) {
    console.log(target);
    console.log(attr);
    target[attr] = params;
  };
}
@logClass('xxxx')
class HttpClient4 {
  @logProperty('http://itying.com')
  public url: any | undefined;
  constructor() {}
  getData() {
    console.log(this.url);
  }
}
var http = new HttpClient4();
http.getData();

// 3、方法装饰器
//   它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。
//   方法装饰会在运行时传入下列3个参数：
//   1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
//   2、成员的名字。
//   3、成员的属性描述符。

// 方法装饰器一
function logClass4(params: any) {
  return function(target: any, methodName: any, desc: any) {
    console.log(target); // 原型 || 静态方法
    console.log(methodName); // 方法名
    console.log(desc); // 描述
    target.apiUrl = 'xxxx';
    target.run = function() {
      console.log('run');
    };
  };
}

class HttpClient5 {
  public url: any | undefined;
  constructor() {}
  @logClass4('http://www.itying,com')
  getData() {
    console.log(this.url);
  }
}

consoleValue = new HttpClient5();
console.log(consoleValue.apiUrl);
consoleValue.run();

// 方法装饰器二
function logClass5(params: any) {
  return function(target: any, methodName: any, desc: any) {
    // console.log('target', target);
    // console.log('methodName', methodName);
    console.log('desc.value', desc.value);
    //修改装饰器的方法  把装饰器方法里面传入的所有参数改为string类型

    //1、保存当前的方法
    var oMethod = desc.value;
    desc.value = function(...args: any[]) {
      args = args.map(value => {
        return String(value);
      });
      // 不加该code，logClass5 会将 getData 替代，不在执行 getData 中的内容
      // 若为修改，通过 apply 进行对象冒充来实现
      oMethod.apply(this, args);
    };
  };
}

class HttpClient6 {
  public url: any | undefined;
  constructor() {}
  @logClass5('http://www.itying,com')
  getData(...args: any[]) {
    console.log('args', args);
    console.log('我是getData里面的方法');
  }
}

consoleValue = new HttpClient6();
consoleValue.getData(123, 'xxx');

// 4、方法参数装饰器
// 参数装饰器表达式会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据 ，传入下列3个参数：
//  1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
//  2、方法的名字。
//  3、参数在函数参数列表中的索引。

function logParams(params: any) {
  return function(target: any, methodName: any, paramsIndex: any) {
    console.log(params); // 参数
    console.log(target); //
    console.log(methodName);
    console.log(paramsIndex);
    target.apiUrl = params;
  };
}

class HttpClient7 {
  public url: any | undefined;
  constructor() {}
  getData(@logParams('xxxxx') uuid: any) {
    console.log(uuid);
  }
}

consoleValue = new HttpClient7();
consoleValue.getData(123456);
console.log(consoleValue.apiUrl);

// 装饰器执行顺序
// 属性 > 方法 > 方法参数 > 类
// 如果有多个同样的装饰器，它会先执行后面的

// 类装饰器
function logClass6(params: string) {
  return function(target: any) {
    console.log('类装饰器1');
  };
}
function logClass7(params: string) {
  return function(target: any) {
    console.log('类装饰器2');
  };
}

// 属性装饰器
function logAttribute1(params?: string) {
  return function(target: any, attrName: any) {
    console.log('属性装饰器1');
  };
}
function logAttribute2(params?: string) {
  return function(target: any, attrName: any) {
    console.log('属性装饰器2');
  };
}

// 方法装饰器
function logMethod1(params?: string) {
  return function(target: any, attrName: any, desc: any) {
    console.log('方法装饰器1');
  };
}
function logMethod2(params?: string) {
  return function(target: any, attrName: any, desc: any) {
    console.log('方法装饰器2');
  };
}

// 方法参数装饰器
function logParams1(params?: string) {
  return function(target: any, attrName: any, desc: any) {
    console.log('方法参数装饰器1');
  };
}
function logParams2(params?: string) {
  return function(target: any, attrName: any, desc: any) {
    console.log('方法参数装饰器2');
  };
}

@logClass6('http://www.itying.com/api') // 类装饰器 4-2
@logClass7('xxxx') // 类装饰器 4-1
class HttpClient8 {
  @logAttribute1() // 属性装饰器 1-2
  @logAttribute2() // 属性装饰器 1-1
  public apiUrl: string | undefined;
  constructor() {}

  @logMethod1() // 方法装饰器 2-2
  @logMethod2() // 方法装饰器 2-1
  getData() {
    return true;
  }
  setData(
    @logParams1() attr1: any, // 方法参数装饰器 3-2
    @logParams2() attr2: any // 方法参数装饰器 3-1
  ) {

  }
}

consoleValue = new HttpClient8();

console.log(consoleValue);

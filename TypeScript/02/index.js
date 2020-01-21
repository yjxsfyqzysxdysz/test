"use strict";
var num;
// 匿名函数
function run() {
    console.log('asdas');
}
function run1() {
    console.log('void');
}
function run2() {
    console.log('number');
    return 465;
}
function run3() {
    console.log('number | null');
    // return null
    return 566;
}
// 定义方法传参
// ?可选参数
var a = function (num, age) {
    return num + '----' + age;
};
a('sd', 85);
a();
/**
 * 默认参数
 */
function getInfo(name, age) {
    if (age === void 0) { age = 20; }
    if (age) {
        return name + " --- " + age;
    }
    else {
        return name + '----asafas';
    }
}
getInfo('sdad', 5);
/**
 * 剩余参数
 */
function sum() {
    var result = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        result[_i] = arguments[_i];
    }
    // function sum(a: number, b: number, ...result: number[]): number {
    // 将第一个数赋值给a
    // 将第二个数赋值给b
    // 将剩余的数赋值给result
    var sum = 0;
    result.map(function (e) {
        sum += e;
    });
    return sum;
}
sum(1, 5, 6, 5, 6, 5, 6, 6);
function getinfo(num) {
    return num + '--' + typeof num;
}
console.log(getinfo(true));
var b;
b = 'ad';
var decimal = 6;
var hex = 0xf00d;
var binary = 10;
var octal = 484;
var color = "blue";
color = 'red';
var fullName = "Bob Bobbington";
var age = 37;
var sentence1 = "Hello, my name is " + fullName + ". I'll be " + (age + 1) + " years old next month.";
// 和上文效果类似
var sentence2 = "Hello, my name is " + name + ".\n\n" + "I'll be " + (age + 1) + " years old next month.";
// let sym1 = Symbol()
// let sym2 = Symbol("key") 
// // 可选的字符串key
// // Symbols是不可改变且唯一的。
// let sym3 = Symbol("key")
// let sym4 = Symbol("key")
// sym3 === sym4
// // false, symbols是唯一的
// // 像字符串一样， symbols也可以被用做对象属性的键。
// let sym = Symbol()
// let obj = {[sym]: "value"}
// console.log(obj[sym]) // "value"
// const getClassNameSymbol = Symbol()
// class C {
//   [getClassNameSymbol](){
//     return "C"
//   }
// }
// let c = new C()
// let className = c[getClassNameSymbol]() // "C"
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
// Declare a tuple type
var x;
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
console.log(x[0].substring(1)); // OK
console.log(x[1].substring(1)); // Error, 'number' does not have 'substring'
x[3] = "world"; // Error, Property '3' does not exist on type '[string, number]'.
console.log(x[5].toString()); // Error, Property '5' does not exist on type '[string, number]'.
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green; // 1
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c = Color.Green; // 2
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
var c = Color.Green; // 2
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var colorName = Color[2];
console.log(colorName); // 显示'Green'因为上面代码里它的值是2
var log = console.log;
(function (Color) {
    Color["Red"] = "rRed";
    Color["Green"] = "rGreen";
    Color["Blue"] = "rBlue";
})(Color || (Color = {}));
var c = Color.Red; // 1
log(c); // rRed
log(Color.Green); // rGreen
log(Color.Blue); // rBlue
// Enum member must have initializer.
(function (Color) {
    Color["Red"] = "rRed";
    Color[Color["Green"] = void 0] = "Green";
    Color[Color["Blue"] = void 0] = "Blue";
})(Color || (Color = {}));
// fine
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color["Green"] = "rGreen";
    Color["Blue"] = "rBlue";
})(Color || (Color = {}));
// Computed values are not permitted in an enum with string valued members.
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color["Green"] = "rGreen";
    Color["Blue"] = "rBlue";
})(Color || (Color = {}));
// Type 'true' is not assignable to type 'Color'
// Type 'false' is not assignable to type 'Color'
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 0] = "Green";
    Color[Color["Blue"] = 0] = "Blue";
})(Color || (Color = {}));
// Type 'null' is not assignable to type 'Color'
// Type 'undefined' is not assignable to type 'Color'
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 0] = "Green";
    Color[Color["Blue"] = 0] = "Blue";
})(Color || (Color = {}));
// Type 'never[]' is not assignable to type 'Color'
// Type '{}' is not assignable to type 'Color'
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 0] = "Green";
    Color[Color["Blue"] = 0] = "Blue";
})(Color || (Color = {}));
var sys = Symbol();
// Type 'unique symbol' is not assignable to type 'Color'.
// Type '{}' is not assignable to type 'Color'
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 0] = "Green";
    Color[Color["Blue"] = 1] = "Blue";
})(Color || (Color = {}));
var notSure = 4;
notSure = "maybe a string instead";
notSure = false;
// okay, definitely a boolean
var notSure = 4;
notSure.ifItExists(); //  TSLint will not throw Error, okay, ifItExists might exist at runtime
notSure.toFixed(); // TSLint will not throw Error, okay, toFixed exists (but the compiler doesn't check)
var prettySure = 4;
prettySure.toFixed(); // TSLint will throw Error: Property 'toFixed' does not exist on type 'Object'.
var list = [1, true, "free"];
list[1] = 100;
function warnUser() {
    console.log("This is my warning message");
}
var unusable = undefined;
// fine
function testBreak() {
    while (true) {
        break;
    }
}
// fine
function testIf() {
    if (true) {
    }
}
// fine
function testDoWhile(x) {
    do {
    } while (x > 3);
}
// fine
function testAny(test) {
    return test; // fine
}
var log = console.log;
log(testAny(1)); // 1
function testString(test) {
    return test; // Type 'string' is not assignable to type 'void'.
}
function testNumber(test) {
    return test; // Type 'number' is not assignable to type 'void'.
}
function testBoolean(test) {
    return test; // Type 'boolean' is not assignable to type 'void'.
}
function testUndefined(test) {
    return test; // Type 'undefined' is not assignable to type 'void'.
}
function testNull(test) {
    return test; // Type 'null' is not assignable to type 'void'.
}
// Not much else we can assign to these variables!
var u = undefined;
var n = null;
// null
var x1 = null; // Type 'null' is not assignable to type 'string'.
var x2 = null; // Type 'null' is not assignable to type 'number'.
var x3 = null; // Type 'null' is not assignable to type 'boolean'.
var x4 = null; // Type 'null' is not assignable to type 'undefined'.
var x5 = null; // Type 'null' is not assignable to type 'never'.
var x6 = null;
var x7 = null;
// undefined
var x1 = undefined; // Type 'undefined' is not assignable to type 'string'.
var x2 = undefined; // Type 'undefined' is not assignable to type 'number'.
var x3 = undefined; // Type 'undefined' is not assignable to type 'boolean'.
var x4 = undefined; // Type 'undefined' is not assignable to type 'null'.
var x5 = undefined; // Type 'undefined' is not assignable to type 'never'.
var x6 = undefined;
var x7 = undefined;
function testNever(test) {
    return test;
}
// 返回never的函数必须存在无法达到的终点
function error(message) {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) { }
}
function testDoWhile() {
    do { } while (true);
}
var x1 = never; // 'never' only refers to a type, but is being used as a value here.
var x2 = never; // 'never' only refers to a type, but is being used as a value here.
var x3 = never; // 'never' only refers to a type, but is being used as a value here.
var x4 = never; // 'never' only refers to a type, but is being used as a value here.
var x5 = never; // 'never' only refers to a type, but is being used as a value here.
var x6 = never; // 'never' only refers to a type, but is being used as a value here.
var x7 = never; // 'never' only refers to a type, but is being used as a value here.
// A function returning 'never' cannot have a reachable end point.
function testBreak() {
    while (true) {
        break;
    }
}
// A function returning 'never' cannot have a reachable end point.
function testIf() {
    if (true) { }
}
// A function returning 'never' cannot have a reachable end point.
function testDoWhile(x) {
    do { } while (x > 3);
}
function testString(test) {
    return test; // Type 'string' is not assignable to type 'never'.
}
function testNumber(test) {
    return test; // Type 'number' is not assignable to type 'never'.
}
function testBoolean(test) {
    return test; // Type 'boolean' is not assignable to type 'never'.
}
function testUndefined(test) {
    return test; // Type 'undefined' is not assignable to type 'never'.
}
function testNull(test) {
    return test; // Type 'null' is not assignable to type 'never'.
}
function testAny(test) {
    return test; // Type 'any' is not assignable to type 'never'.
}
create({ prop: 0 }); // OK
create(null); // OK
create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
var someValue = "this is a string";
var strLength = someValue.length;
// 当然直接写也是可以的。
var strLength2 = someValue.length; // 16
var someValue = "this is a string";
var strLength = someValue.length;

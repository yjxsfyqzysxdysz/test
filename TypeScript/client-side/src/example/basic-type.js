"use strict";
// 布尔类型
let bool;
bool = false;
// 数值类型
let num;
num = 123; // 十进制
num = 0b101010101010; // 二进制
num = 0o173; // 八进制
num = 0x7b; // 十六进制
// 字符串类型
let str;
str = 'abc';
str = `number is ${num}`;
// 数组类型
// 写法1
let arr1;
arr1 = [5];
// 写法2
let arr2; // arr2为array，参数为number
let arr3;
arr3 = [1, 'a'];
// 元组类型
let tuple; // 规定长度、规定类型(v2.6之后对长度有限制，之前无长度限制，超出元素只要类型符合即可)
tuple = ['a', 1, true];
// 枚举类型
var Roles;
(function (Roles) {
    Roles[Roles["SUPER_ADMIN"] = 0] = "SUPER_ADMIN";
    Roles[Roles["ADMIN"] = 4] = "ADMIN";
    Roles[Roles["USER"] = 5] = "USER";
})(Roles || (Roles = {}));
// 默认为自然数顺序
// 可手动修改，之后的自动递增
// any类型
let value;
value = '123';
value = false;
value = 123;
// void类型
// 不是任何类型，通常是函数不返回值时使用
const consoleText = (text) => {
    console.log(text);
};
consoleText('text');
let v;
v = undefined;
// v = null
// null 和 undefined
let u;
u = undefined;
let n;
n = null;
// never类型
// 返回为Error、死循环、函数自调用
const errorFunc = (message) => {
    throw new Error(message);
};
const infiniteFunc = () => {
    while (true) { }
};
let neverVariable = (() => {
    while (true) { }
})();
// objevt类型
let obj = {
    name: 'a'
};
let obj2 = obj;
obj2.name = 'A';
function getObject(obj) {
    console.log('obj', obj);
}
getObject(obj2);
// 类型断言
// 类型断言的2种写法
// <>、as
// *.jsx中不能使用<>的形式
const getLength = (target) => {
    if (target.length || target.length === 0) {
        return target.length;
    }
    else {
        return target.toString().length;
    }
};
getLength(5);

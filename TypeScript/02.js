"use strict";
// typeScript中的函数
// 函数的定义
// 可选参数
// 默认参数
// 剩余参数
// 函数重载
// 箭头函数  es6
var consoleValue;
// 1.函数的定义
// 函数声明
function fun1() {
    return 'fun1';
}
// consoleValue = fun1()
// 匿名函数
var fun2 = function () {
    return 'fun2';
};
// consoleValue = fun2()
// ts中的方法
// 函数声明
function fun3() {
    return 'fun3';
}
// consoleValue = fun3()
// 匿名函数
function fun4() {
    return 85;
}
// consoleValue = fun4()
// ts定义方法传参
function fun5(name, age) {
    return name + " --- " + age;
}
// consoleValue = fun5('aa', 55)
var fun6 = function (name, age) {
    return name + " --- " + age;
};
// consoleValue = fun6('aa', 66)
// 没有返回值的方法
function fun7() {
    console.log('fun7');
}
// fun7()
// 2.方法可选参数
// es5方法的实参和形参可不一样，
// ts中若不一样，必须配置可选参数
function fun8(name, age) {
    if (age) {
        return name + " ---- " + age;
    }
    else {
        return name + " ---- \u5E74\u9F84\u672A\u77E5";
    }
}
// consoleValue = fun8('a', 5)
// consoleValue = fun8('b')
// 注意：可选参数必须配置到参数的最后面
// 3.默认参数
// es5中无法设置默认参数，ts和es6中都可以设置默认参数
function fun9(name, age) {
    if (age === void 0) { age = 20; }
    return name + " ---- " + age;
}
// consoleValue = fun9('b')
// consoleValue = fun9('c', 55)
// 4.剩余参数
function fun10(a, b, c, d) {
    return a + b + c + d;
}
function fun11() {
    var res = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        res[_i] = arguments[_i];
    }
    var _a = 0;
    for (var i = 0; i < res.length; i++) {
        _a += res[i];
    }
    return _a;
}
function fun12(a) {
    var res = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        res[_i - 1] = arguments[_i];
    }
    var _a = a;
    for (var i = 0; i < res.length; i++) {
        _a += res[i];
    }
    return _a;
}
function fun13(str) {
    if (typeof str === 'string') {
        return 'any -- ' + str;
    }
    return 'number || string -- ' + str;
}
function fun14(name, age) {
    if (age) {
        return "my name is " + name + ", i am " + age + " years old";
    }
    else {
        return "my name is " + name;
    }
}
// consoleValue = fun14('A')
// consoleValue = fun14('A', 10)
// 6.箭头函数  es6
// this指向的问题    箭头函数里面的this指向上下文
var fun15 = function () { };
fun15 = function () { };
console.log(consoleValue);

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

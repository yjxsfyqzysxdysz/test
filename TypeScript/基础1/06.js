"use strict";
var consoleValue;
// 接口的作用：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用。接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。 typescrip中的接口类似于java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。
// 定义标准。
// typeScript中的接口
//  属性类接口
//  函数类型接口
//  可索引接口
//  类类型接口
//  接口扩展
// 1、属性接口     对json的约束
// ts中定义方法
function fn1() {
    console.log('fn1');
}
// fn1();
// ts中定义方法传入参数
function fn2(label) {
    console.log('fn2');
}
// fn2('hahah');
// ts中自定义方法传入参数, 对json进行约束
function fn3(obj) {
    console.log('fn3');
}
function fn4(name) {
    // 必须传入对象  firstName  secondName
    console.log(name.firstName + '--' + name.secondName);
}
// fn4('1213');  // 错误
var obj = {
    // 传入的参数必须包含 firstName secondName，可以包含别的参数
    age: 20,
    firstName: '张',
    secondName: '三'
};
// fn4(obj)
// fn4({ age: 20, firstName: '张', secondName: '三' }) // 改写法 传入参数必须仅有 firstName secondName
// 接口：行为和动作的规范，对批量方法进行约束
function fn5(name) {
    // 必须传入对象  firstName  secondName
    console.log(name.firstName + '--' + name.secondName);
    // console.log(name.age) // 仅能获取FullName中的参数
}
function fn6(info) {
    // 必须传入对象  firstName  secondName
    console.log(info.firstName + '++' + info.secondName);
}
// fn5(obj);
// fn6({
//   firstName: '李',
//   secondName: '四'
// });
// 接口 ：可选属性
function fn7(name) {
    console.log(name);
}
function fn8(name) {
    console.log(name);
}
//原生js封装的ajax
function ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('chengong');
            if (config.dataType === 'json') {
                console.log(JSON.parse(xhr.responseText));
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
}
// ajax({
//   type: 'get',
//   data: 'name=zhangsan',
//   url: 'http://a.itying.com/api/productlist', //api
//   dataType: 'json'
// });
console.log(consoleValue);

"use strict";
// 1、ts中的类
var Person = /** @class */ (function () {
    function Person(n) {
        // 构造函数 实例化类的时候触发的方法
        this.name = n;
    }
    Person.prototype.run = function () {
        console.log(this.name);
    };
    return Person;
}());
var p = new Person('lalal');
p.run();

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var consoleValue;
var md5 = function (key, value) {
    //模拟操作
    return key + value;
};
// consoleValue = md5('name', 'zhangsan')
var sha1 = function (key, value) {
    //模拟操作
    return key + '----' + value;
};
var arr3 = ['aaa', 'bbb'];
var obj1 = { name: '张三' };
var Dogs1 = /** @class */ (function () {
    function Dogs1(name) {
        this.name = name;
    }
    Dogs1.prototype.eat = function () {
        console.log(this.name + '吃粮食');
    };
    return Dogs1;
}());
// consoleValue = new Dogs1('dog');
// consoleValue.eat();
var Cats1 = /** @class */ (function () {
    function Cats1(name) {
        this.name = name;
    }
    Cats1.prototype.eat = function (food) {
        console.log(this.name + '吃' + food);
    };
    return Cats1;
}());
var Web1 = /** @class */ (function () {
    function Web1(name) {
        this.name = name;
    }
    Web1.prototype.eat = function () {
        console.log(this.name + '喜欢吃馒头');
    };
    Web1.prototype.work = function () {
        console.log(this.name + '写代码');
    };
    return Web1;
}());
consoleValue = new Web1('小李');
consoleValue.eat();
var Programmer = /** @class */ (function () {
    function Programmer(name) {
        this.name = name;
    }
    Programmer.prototype.coding = function (code) {
        console.log(this.name + code);
    };
    return Programmer;
}());
var Web2 = /** @class */ (function (_super) {
    __extends(Web2, _super);
    function Web2(name) {
        return _super.call(this, name) || this;
    }
    Web2.prototype.eat = function () {
        console.log(this.name + '喜欢吃馒头');
    };
    Web2.prototype.work = function () {
        console.log(this.name + '写代码');
    };
    return Web2;
}(Programmer));
consoleValue = new Web2('小李');
// consoleValue.eat();
consoleValue.coding('写ts代码');
console.log(consoleValue);

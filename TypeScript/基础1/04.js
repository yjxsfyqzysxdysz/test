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
// ts 中定义类
var consoleValue;
var class8 = /** @class */ (function () {
    function class8(n) {
        this.name = n;
    }
    class8.prototype.run = function () {
        return this.name;
    };
    return class8;
}());
// consoleValue = new class8('heng')
var class9 = /** @class */ (function () {
    function class9(name) {
        this.name = name;
    }
    class9.prototype.getName = function () {
        return this.name;
    };
    class9.prototype.setName = function (name) {
        this.name = name;
    };
    return class9;
}());
var tmp1 = new class9('heng');
tmp1.setName('ha');
// consoleValue = tmp1.getName()
// ts 中实现继承 extends、super
var class10 = /** @class */ (function () {
    function class10(name) {
        this.name = name;
    }
    class10.prototype.run = function () {
        return this.name + " is sport";
    };
    return class10;
}());
var tmp2 = new class10('zhong');
// consoleValue = tmp2.run()
var class11 = /** @class */ (function (_super) {
    __extends(class11, _super);
    function class11(name) {
        return _super.call(this, name) || this; // 调用父类的构造函数 /* 初始化父类的构造函数 */
    }
    return class11;
}(class10));
var tmp3 = new class11('wu');
// consoleValue = tmp3.run()
// ts 中继承的探讨 父类的方法和子类的方法一致
var class12 = /** @class */ (function (_super) {
    __extends(class12, _super);
    function class12(name) {
        return _super.call(this, name) || this; // 调用父类的构造函数 /* 初始化父类的构造函数 */
    }
    class12.prototype.run = function () {
        return this.name + " is run";
    };
    class12.prototype.work = function () {
        return this.name + " is working"; // 获取父类中的属性
    };
    return class12;
}(class10));
var tmp4 = new class12('wu');
// consoleValue = tmp4.work()
// 类中的修饰符
// TypeScript中定义了3种修饰符
// public：公有类型 在类里面、子类、类外面都可以访问
// protected：保护类型 在类里面、子类里面可以访问，在类外面无法访问
// private：私有类型 在类面可以访问，在类外面、子类里面无法访问
// 属性如果未加修饰符，则默认为公有(public)
// 公有类型
var class13 = /** @class */ (function () {
    function class13(name) {
        this.name = name;
    }
    class13.prototype.run = function () {
        return this.name + " is sport";
    };
    return class13;
}());
var tmp5 = new class13('zhong');
// consoleValue = tmp5.run()
// 类外部访问公有属性
var class14 = /** @class */ (function (_super) {
    __extends(class14, _super);
    function class14(name) {
        return _super.call(this, name) || this;
    }
    class14.prototype.work = function () {
        return this.name + " is working";
    };
    return class14;
}(class13));
var tmp6 = new class14('hei');
// consoleValue = tmp6.work()
// consoleValue = tmp6.name
// 保护类型
var class15 = /** @class */ (function () {
    function class15(name) {
        this.name = name;
    }
    class15.prototype.run = function () {
        return this.name + " is sport";
    };
    return class15;
}());
var class16 = /** @class */ (function (_super) {
    __extends(class16, _super);
    function class16(name) {
        return _super.call(this, name) || this;
    }
    class16.prototype.work = function () {
        return this.name + " will working";
    };
    return class16;
}(class15));
var tmp7 = new class16('class16');
// consoleValue = tmp7.work()
// consoleValue = tmp7.run()
// 类外部访问保护属性
// consoleValue = tmp7.name // 类外部无法访问保护类型的属性
// 私有类型
var class17 = /** @class */ (function () {
    function class17(name) {
        this.name = name;
    }
    class17.prototype.run = function () {
        return this.name + " is sport";
    };
    return class17;
}());
var class18 = /** @class */ (function (_super) {
    __extends(class18, _super);
    function class18(name) {
        return _super.call(this, name) || this;
    }
    return class18;
}(class17));
var tmp8 = new class17('class17');
// consoleValue = tmp8.name // 类外部无法访问私有类型的属性
// consoleValue = tmp8.run() // 当前类中可以调用属性
var tmp9 = new class18('class18');
// consoleValue = tmp9.name // 类外部无法访问私有类型的属性
console.log(consoleValue);

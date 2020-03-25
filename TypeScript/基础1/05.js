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
// 静态属性 静态方法 抽象类 多态
// function Person(this: any) {
//   this.runl = function () { }
// }
// Person.name = 'llll' // 静态属性
// Person.run2 = function() { // 静态方法
// }
// var p = new Person()
// Person.run2() // 静态方法的调用
// 静态方法
// jQuery的方式
// function $(ele: any) {
//   return new Base(ele)
// }
// $.get = function () {} // get相当于$的静态方法
// function Base(this: any, ele: string) {
//   this.ele = '获取dom节点'
//   // 实例方法
//   this.css = function (attr: string, value: string) {
//     this.ele.style.attr = value
//   }
// }
// $('.app').css('color', 'red')
// $.get()
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.run = function () {
        return this.name + 'sport';
    };
    Person.prototype.work = function () {
        return this.name + 'work';
    };
    Person.print = function () {
        // 静态方法无法直接调用类里面的属性
        return 'print_' + Person.sex;
    };
    // 静态属性
    Person.sex = 'any';
    return Person;
}());
// consoleValue = new Person('sun')
// console.log(consoleValue.run())
// consoleValue = Person.print()
// 多态:父类定义一个方法不去实现，让继承它的子类去实现  每一个子类有不同的表现 
// 多态属于继承
var Animals = /** @class */ (function () {
    function Animals(name) {
        this.name = name;
    }
    Animals.prototype.eat = function () {
        //具体吃什么  不知道   ，  具体吃什么?继承它的子类去实现 ，每一个子类的表现不一样
        console.log('吃的方法');
    };
    return Animals;
}());
var Dogs = /** @class */ (function (_super) {
    __extends(Dogs, _super);
    function Dogs(name) {
        return _super.call(this, name) || this;
    }
    Dogs.prototype.eat = function () {
        return this.name + '狗粮';
    };
    return Dogs;
}(Animals));
var Cats = /** @class */ (function (_super) {
    __extends(Cats, _super);
    function Cats(name) {
        return _super.call(this, name) || this;
    }
    Cats.prototype.eat = function () {
        return this.name + '猫粮';
    };
    return Cats;
}(Animals));
// consoleValue = new Dogs('DogName')
// console.log(consoleValue.eat())
// typescript中的抽象类：它是提供其他类继承的基类，不能直接被实例化。
// 用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
// abstract抽象方法只能放在抽象类里面
// 抽象类和抽象方法用来定义标准 。   标准：Animal 这个类要求它的子类必须包含eat方法
// 标准:
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.run = function () {
        console.log('其他方法可以不实现');
    };
    return Animal;
}());
// var a = new Animal() /* 错误的写法 不能直接被实例化 */
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    // 抽象类的子类必须实现抽象类里面的抽象方法
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    Dog.prototype.eat = function () {
        console.log(this.name + '吃粮食');
    };
    return Dog;
}(Animal));
// consoleValue = new Dog('Dog')
// consoleValue.eat()
// consoleValue.run()
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    // 抽象类的子类必须实现抽象类里面的抽象方法
    function Cat(name) {
        return _super.call(this, name) || this;
    }
    Cat.prototype.run = function () { };
    Cat.prototype.eat = function () {
        console.log(this.name + '吃老鼠');
    };
    return Cat;
}(Animal));
// consoleValue = new Cat('Cat')
// consoleValue.eat()
// consoleValue.run()
console.log(consoleValue);

import { A, B } from './12';
// ts 3.0 以下，支持 /// <reference path="12.ts" /> 该引入方式，在被引入的模块不用写 export 将方法抛出

var d1 = new A.Dog('小黑');
d1.eat();

var d2 = new B.Dog('小花');
d2.eat();

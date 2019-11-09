"use strict";
var num;
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
var a = function (num, age) {
    return num + '----' + age;
};
a('sd', 85);
a();
function getinfo(num) {
    return num + '--' + typeof num;
}
console.log(getinfo(true));
var b;
b = 'ad';

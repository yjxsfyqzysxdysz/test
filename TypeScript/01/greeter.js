"use strict";
function greeter1(person) {
    return 'Hello, ' + person;
}
var user1 = 'Jane User';
console.log(greeter1(user1));
function greeter2(person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
var user2 = { firstName: 'Jane', lastName: 'User' };
console.log(greeter2(user2));
function printLabel(labelObj) {
    console.log(labelObj.label);
}
var myObj2 = { size: 10, label: 'Size 10 Object' };
// printLabel(myObj2);

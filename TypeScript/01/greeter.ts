function greeter1(person: string) {
  return 'Hello, ' + person;
}
let user1 = 'Jane User';
console.log(greeter1(user1));

interface person { // 句首不能大写
  firstName: string;
  lastName: string;
}
function greeter2(person: person): string {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
let user2 = { firstName: 'Jane', lastName: 'User' };
console.log(greeter2(user2));


interface labelValue {
  label: string;
}
function printLabel(labelObj: labelValue) {
  console.log(labelObj.label);
}
let myObj2 = { size: 10, label: 'Size 10 Object' };
// printLabel(myObj2);

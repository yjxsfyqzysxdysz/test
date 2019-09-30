function greeter1(person: string) {
  return "Hello, " + person;
}
let user1 = "Jane User";
console.log(greeter1(user1));

interface Person {
  firstName: string;
  lastName: string;
}
function greeter2(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
let user2 = { firstName: "Jane", lastName: "User" };
console.log(greeter2(user2));


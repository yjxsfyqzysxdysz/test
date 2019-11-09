let num: number;

function run() {
  console.log('asdas');
}

function run1(): void {
  console.log('void');
}

function run2(): number {
  console.log('number');
  return 465;
}

function run3(): number | null {
  console.log('number | null');
  // return null
  return 566;
}

let a = function(num: string | void, age?: number | void) {
  return num + '----' + age;
};
a('sd', 85);
a();

function getinfo(num: number): string;
function getinfo(num: string): string;
function getinfo(num: any): any;
function getinfo(num: any): any {
  return num + '--' + typeof num;
}
console.log(getinfo(true));
let b: string;
b = 'ad';

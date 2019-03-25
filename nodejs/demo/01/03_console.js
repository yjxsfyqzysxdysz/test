console.log(123);
console.info(123);
console.warn(123);
console.error(123);

console.time('for循环运行时间'); // 开始计时
var sum = 0;
for (var i = 0; i < 10; i++) {
  sum += i;
}
console.timeEnd('for循环运行时间'); // 结束计时

// while 
console.time('while运行时间');
var i = 0,
  sum = 0;
while (i < 100000) {
  sum += i;
  i++;
}
console.log(i);
console.timeEnd('while运行时间');

// dowhile
console.time('dowhile运行时间');
var i = 0,
  sum = 0;
do {
  sum += i;
  i++;
}
while (i < 100000);
console.timeEnd('dowhile运行时间');


console.log(process.arch);
console.log(process.platform);
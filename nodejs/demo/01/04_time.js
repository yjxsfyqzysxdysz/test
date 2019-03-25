var timer = null;
// 一次性定时器
// 开启一次性定时器
timer = setTimeout(function () {
  console.log('ddddddddddd');
}, 3000);

// 清除一次性定时器
clearTimeout(timer);

/***********************/

// 周期性定时器
timer = setInterval(function () {
  console.log('bbbbbbbb');
}, 3000);
clearInterval(timer);

/*************************/

process.nextTick(function () {
  console.log('dd');
});

/**************************/

timer = setImmediate(() => {
  console.log('hello');
});
clearImmediate(timer);
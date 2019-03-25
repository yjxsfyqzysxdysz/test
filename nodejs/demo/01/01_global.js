var a = 1;
console.log(a); // 1
// a不是全局作用域下的变量，不能使用global访问
console.log(global.a); // undefined
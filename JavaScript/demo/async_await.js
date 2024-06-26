/**
 * 关于async/await
 */

/**
 async/await的优点
 1）方便级联调用：即调用依次发生的场景；
 2）同步代码编写方式： Promise使用then函数进行链式调用，一直点点点，是一种从左向右的横向写法；async/await从上到下，顺序执行，就像写同步代码一样，更符合代码编写习惯；
 3）多个参数传递： Promise的then函数只能传递一个参数，虽然可以通过包装成对象来传递多个参数，但是会导致传递冗余信息，频繁的解析又重新组合参数，比较麻烦；async/await没有这个限制，可以当做普通的局部变量来处理，用let或者const定义的块级变量想怎么用就怎么用，想定义几个就定义几个，完全没有限制，也没有冗余工作；
 4）同步代码和异步代码可以一起编写： 使用Promise的时候最好将同步代码和异步代码放在不同的then节点中，这样结构更加清晰；async/await整个书写习惯都是同步的，不需要纠结同步和异步的区别，当然，异步过程需要包装成一个Promise对象放在await关键字后面；
 5）基于协程： Promise是根据函数式编程的范式，对异步过程进行了一层封装，async/await基于协程的机制，是真正的“保存上下文，控制权切换……控制权恢复，取回上下文”这种机制，是对异步过程更精确的一种描述；
 6）async/await是对Promise的优化： async/await是基于Promise的，是进一步的一种优化，不过在写代码时，Promise本身的API出现得很少，很接近同步代码的写法；

 协程
 进程>线程>协程
 协程的第一大优势是具有极高的执行效率，因为子程序切换不是线程切换，而是由程序自身控制，因此没有线程切换的开销，和多线程比，线程数量越多，协程的性能优势就越明显；
 协程的第二大优势是不需要多线程的锁机制，因为只有一个线程，也不存在同时写变量冲突，在协程中控制共享资源不加锁，只需要判断状态就好了，所以执行效率比多线程高很多；
 协程看上去也是子程序，但执行过程中，在子程序内部可中断，然后转而执行别的子程序，在适当的时候再返回来接着执行，需要注意的是：在一个子程序中中断，去执行其他子程序，这并不是函数调用，有点类似于CPU的中断；
 用汽车和公路举个例子：js公路只是单行道（主线程），但是有很多车道（辅助线程）都可以汇入车流（异步任务完成后回调进入主线程的任务队列）；generator把js公路变成了多车道（协程实现），但是同一时间只有一个车道上的车能开（依然单线程），不过可以自由变道（移交控制权）；
 协程意思是多个线程互相协作，完成异步任务，运行流程大致如下：
 1）协程A开始执行；
 2）协程A执行到一半，进入暂停，执行权转移到协程B；
 3）一段时间后，协程B交还执行权；
 4）协程A恢复执行；
 协程是一个无优先级的子程序调度组件，允许子程序在特定的地点挂起恢复；
 线程包含于进程，协程包含于线程，只要内存足够，一个线程中可以有任意多个协程，但某一个时刻只能有一个协程在运行，多个协程分享该线程分配到的计算机资源；
 就实际使用理解来说，协程允许我们写同步代码的逻辑，却做着异步的事，避免了回调嵌套，使得代码逻辑清晰；
 何时挂起，唤醒协程：协程是为了使用异步的优势，异步操作是为了避免IO操作阻塞线程，那么协程挂起的时刻应该是当前协程发起异步操作的时候，而唤醒应该在其他协程退出，并且他的异步操作完成时；
 单线程内开启协程，一旦遇到io，从应用程序级别（而非操作系统）控制切换对比操作系统控制线程的切换，用户在单线程内控制协程的切换，优点如下：
 1）协程的切换开销更小，属于程序级别的切换，操作系统完全感知不到，因而更加轻量级；
 2）单线程内就可以实现并发的效果，最大限度地利用cpu；

 async关键字
 1）表明程序里面可能有异步过程： async关键字表明程序里面可能有异步过程，里面可以有await关键字；当然全部是同步代码也没关系，但是这样async关键字就显得多余了；
 2）非阻塞： async函数里面如果有异步过程会等待，但是async函数本身会马上返回，不会阻塞当前线程，可以简单认为，async函数工作在主线程，同步执行，不会阻塞界面渲染，async函数内部由await关键字修饰的异步过程，工作在相应的协程上，会阻塞等待异步任务的完成再返回；
 3）async函数返回类型为Promise对象： 这是和普通函数本质上不同的地方，也是使用时重点注意的地方；
 （1）return newPromise();这个符合async函数本意；
 （2）return data;这个是同步函数的写法，这里是要特别注意的，这个时候，其实就相当于Promise.resolve(data);还是一个Promise对象，但是在调用async函数的地方通过简单的=是拿不到这个data的，因为返回值是一个Promise对象，所以需要用.then(data => { })函数才可以拿到这个data；
 （3）如果没有返回值，相当于返回了Promise.resolve(undefined);
 4）无等待 联想到Promise的特点，在没有await的情况下执行async函数，它会立即执行，返回一个Promise对象，并且绝对不会阻塞后面的语句，这和普通返回Promise对象的函数并无二致；
 5）await不处理异步error： await是不管异步过程的reject(error)消息的，async函数返回的这个Promise对象的catch函数负责统一抓取内部所有异步过程的错误；async函数内部只要有一个异步过程发生错误，整个执行过程就中断，这个返回的Promise对象的catch就能抓取到这个错误；
 5）async函数的执行： async函数执行和普通函数一样，函数名带个()就可以了，参数个数随意，没有限制，也需要有async关键字；只是返回值是一个Promise对象，可以用then函数得到返回值，用catch抓整个流程中发生的错误；

*/

async function testAsync() {
  return 'hello async'
}

const result = testAsync() // 返回一个Promise对象
console.log(result)
// async函数返回的是一个Promise对象，async函数（包括函数语句、函数表达式、Lambda表达式）会返回一个Promise对象，如果在函数中return一个直接量，async会把这个直接量通过Promise.resolve() 封装成 Promise 对象；

// async函数返回的是一个Promise对象，所以在最外层不能用await获取其返回值的情况，应该使用原始的方式：then()链来处理这个Promise对象
testAsync().then(v => {
  console.log(v) // 输出 hello async
})

/**
 * async
 */
// const async = require('async')
// async.series(
//   [
//     function (callback) {}, //如果想使程序提前结束,不再进行下去就callback(err, null)或者callback("err", null)
//     function (callback) {}
//   ],
//   function (err, result) {
//     if (err || err == 'err') {
//       callback(err, null)
//     }
//   }
// )

/**
 * 手写
 * https://blog.csdn.net/CSDN_KONGlX/article/details/125631281
 */
function generatorToAsync(generatorFn) {
  return function () {
    const gen = generatorFn.apply(this, arguments) // gen有可能传参
    // 返回一个Promise
    return new Promise((resolve, reject) => {
      function go(key, arg) {
        let res
        try {
          res = gen[key](arg) // 这里有可能会执行返回reject状态的Promise
        } catch (error) {
          return reject(error) // 报错的话会走catch，直接reject
        }

        // 解构获得value和done
        const { value, done } = res
        if (done) {
          // 如果done为true，说明走完了，进行resolve(value)
          return resolve(value)
        } else {
          // 如果done为false，说明没走完，还得继续走
          // value有可能是：常量，Promise，Promise有可能是成功或者失败
          return Promise.resolve(value).then(
            val => go('next', val),
            err => go('throw', err)
          )
        }
      }

      go('next') // 第一次执行
    })
  }
}

function fn(nums) {
  return new Promise(resolve => {
    setTimeout(() => resolve(nums * 2), 1000)
  })
}

function* gen() {
  const num1 = yield fn(1)
  console.log(num1) // 2
  const num2 = yield fn(num1)
  console.log(num2) // 4
  const num3 = yield fn(num2)
  console.log(num3) // 8
  return num3
}

const genToAsync = generatorToAsync(gen)
const asyncRes = genToAsync()
console.log(asyncRes) // Promise
asyncRes.then(res => console.log(res)) // 8

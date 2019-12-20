// Promise


/**
 * session: 1
 * promise请求全部成功走then
 * 只要有一个数据出错走catch
 * 对于非重要数据，稳定性过差
 * 通过在Promise.all里面添加.catch的方法
 * 强行改数据，从而走then
 * 之后通过filter进行过滤
 * 可得到全部正确的数据
 */
let fun1 = (val) => {
  let num = Math.random()
  console.log('fun1', val, num)
  return new Promise((resolve, reject) => {
    if (num > 0.5) {
      resolve({ num, index: val }) // success
    } else {
      reject() // error
    }
  })
}
/*
  let arr1 = []
  for (let i = 0; i < 10; i++) {
    arr1.push(fun1(i))
  }

  console.log('当一个失败时，全部失败')
  Promise.all(arr1)
    .then(res => {
      console.log('res', res)
    })
    .catch(err => {
      console.log('err', err)
    })

  console.log('当一个失败时，就挂起，全部返回then')
  Promise.all(arr1.map(e => e.catch(e => null)))
    .then(res => {
      console.log('res', JSON.stringify(res))
    })
    .catch(err => {
      console.log('err', err)
    })
*/

/**
 * session: 2
 * Promise的基本用法1
 * 链式调用
 */
let fun2 = () => {
  return new Promise((resolve, reject) => {
    console.log('fun2---start')
    resolve()
  })
}
let fun2_1 = () => {
  return new Promise((resolve, reject) => {
    console.log('fun2_1---start')
    resolve()
  })
}
let fun2_2 = () => {
  return new Promise((resolve, reject) => {
    console.log('fun2_2---start')
    resolve()
  })
}
let fun2_3 = () => {
  return new Promise((resolve, reject) => {
    console.log('fun2_3---start')
    resolve()
  })
}

/*
  fun2()
    .then(() => {
      console.log('fun2---end')
      fun2_1()
    })
    .then(() => {
      console.log('fun2_1---end')
      func_2()
    })
    .then(() => {
      console.log('fun2_2---end')
      fun2_3()
    })
    .then(() => {
      console.log('fun2_3---end')
      console.log('All-end')
    })
*/

/**
 * session: 3
 * Promise的基本用法2
 * 链式操作
 * 当需要上一个调用的函数的返回结果时，则需要在方法前加return
 * 当不需要上一个调用的函数的返回结果时，则不用在方法前加return
 * 通过return可将数据传递给下一个then()中
 * 当通过reject()时，将跳过之后的所有then()直接到最近的catch()方法
 * 若在catch()中将数据return出，之后的then()又可以接收到
 */
let fun3 = val => {
  return new Promise((resolve, reject) => {
    console.log('fun3', val)
    resolve(val + 1)
  })
}
let fun3_1 = val => {
  return new Promise((resolve, reject) => {
    console.log('fun3_1', val)
    resolve(val + 2)
  })
}
let fun3_2 = val => {
  return new Promise((resolve, reject) => {
    console.log('fun3_2', val)
    resolve(val + 3)
  })
}
let fun3_3 = val => {
  return new Promise((resolve, reject) => {
    console.log('fun3_3', val)
    resolve(val + 4)
  })
}
let fun3_4 = val => {
  return new Promise((resolve, reject) => {
    console.log('fun3_4', val)
    reject(val + 5)
  })
}

/*
  fun3(1)
    .then(res => {
      return fun3_1(res)
    })
    .then(res => {
      return fun3_2(res)
    })
    .then(res => {
      return fun3_3(res)
    })
    .then(res => {
      fun3_3(res)
      return res
    })
    .then(res => {
      return fun3_4(res)
    })
    .then(res => {
      console.log('res', res)
    })
    .catch(err => {
      console.log('err', err)
      return err
    })
    .then(res => {
      console.log('res', res)
    })
*/

/**
 * session: 4
 * Promise的基本用法3
 * 错误处理两种做法：
 * 第一种：reject('错误信息').then(() => {}, () => {错误处理逻辑})
 * 第二种：throw new Error('错误信息').catch( () => {错误处理逻辑})
 * 推荐使用第二种方式，更加清晰好读，并且可以捕获前面所有的错误（可以捕获N个then回调错误）
 */
let fun4 = () => {
  return new Promise((resolve, reject) => {
    console.log('fun4')
    resolve(1)
  })
}
/*
  fun4()
    .then(
      (res) => {console.log(res)},  // 成功
      (err) => {console.log(err)} // 失败
    )
*/

let fun4_1 = () => {
  return new Promise((resolve, reject) => {
    console.log('fun4_1')
    resolve(1)
  })
}
/*
  fun4_1()
    // catch也会返回一个promise实例，并且是resolved状态
    .then(res => {
      console.log(res)
      throw new Error('test error')
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      console.log('a')
    })
*/

let fun4_2 = () => {
  return new Promise((resolve, reject) => {
    console.log('fun4_2')
    resolve(1)
  })
}
/*
  fun4_2()
    //  抛出错误变为rejected状态，所以绕过两个then直接跑到最下面的catch
    .then(res => {
      console.log('start')
      throw 'start - error'
    })
    .then(res => {
      console.log('a')
    })
    .then(res => {
      console.log('b')
    })
    .catch(err => {
      console.log('i catch:', err)
      return Promise.reject(err)
    })
    .then(res => {
      console.log('a')
    })
    .catch(err => {
      console.log('Promise.reject', err)
    })
*/

/**
 * session: 5
 * Promise相互嵌套
 * then和catch的各种向上抛数据
 */
let fun5 = () => {
  return new Promise((resolve, reject) => {
    let num = 6
    console.log('fun5', num)
    if (num > 5) {
     return resolve({ meg: 'ok', num })
    } else {
     return reject({ msg: 'err', num })
    }
 })
}

/*
  fun5()
    .then(res => {
      console.log('调用res-suc', JSON.stringify(res))
    })
    .catch(err => {
      console.log('调用res-err', JSON.stringify(err))
    })
*/

let fun5_1 = () => {
  return fun5()
    .then(res => {
      console.log('res-ok', JSON.stringify(res))
      if (res.num % 2) {
        console.log('then - then')
        return res // 调上一级的then
      } else {
        console.log('then - catch')
        // return Promise.reject(res)
        throw res // 调同级的catch
      }
    })
    .catch(err => {
      console.log('res-err', JSON.stringify(err))
      // throw err // 调用fun5_1的then
      return err // 调用fun5_1的catch
    })
}

/*
  fun5_1()
    .then(res => {
      console.log('fun5_1-res', res)
    })
    .catch(err => {
      console.log('fun5_1-err', err)
    })
*/

/**
 * session: 6
 * Promise特点
 * 对象的状态不受外界影响。
 * Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
 * 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
 * 这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
 * 一旦状态改变，就不会再变，任何时候都可以得到这个结果。
 * Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
 * 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
 * 如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
 * 这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
 */
let fun6 = () => {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      console.log('fun6')
      resolve('fun6_resolved')
    }, 500)   
  })
}

/*
  fun6()
    .then(res => {
      console.log(res)
    })
*/

/**
 * session: 7
 * Promise
 * 使用Promise的循环调用
 * 使用sleep进行同步阻塞
 * 可用于循环调用，获取状态
 * return 至 then()
 * Promise.reject || throw 至 catch
 */
// 下面编写的sleep 函数，是同步的，执行完延时阻塞之后，才执行下面的代码：
let sleep = delay => {
  let start = new Date().getTime()
  while (new Date().getTime() < start + delay) {
    continue
  }
}
/*
  function test() {
    console.log('111')
    console.time('tiem')
    sleep(2000)
    console.timeEnd('tiem')
    console.log('222')
  }
  test()
*/

let fun7 = () => {
  return new Promise((resolve, reject) => {
    resolve()
  })
}
  
let fun7_2 = n => {
  n--
  return new Promise((resolve, reject) => {
    resolve()
  })
    .then(() => {
      if (n > 90) {
        console.log('fun7_2-then', n)
        sleep(500)
        return fun7_2(n)
      } else {
        // return 'the end'
        // return Promise.reject('the end')
        throw 'the end'
      }
    })
}

/*
  fun7()
    .then(() => {
      return fun7_2(100)
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log('err', err)
    })
*/

/**
 * session: 8
 * Promise
 * 使用 while 或 do-while 来进行不确定循环次数的循环
 * 通过back跳出
 * 将需要调用的方法及处理函数放置声明的变量中，将其逐个放进数组中
 * 使用async的series方法
 * 当 有/无 错误时，全部执行
 */
const async = require("async")
let fun8 = () => {
  return new Promise((resolve, reject) => {
    resolve()
  })
}
let fun8_1 = n => {
  return new Promise((resolve, reject) => {
    let num = Math.round(Math.random() * 20)
    console.log(n, num)
    if (num > 0) {
      resolve({ n, num })
    } else {
      reject({ n, num })
    }
  })
}

fun8()
  .then(() => {
    let arr = []
    let i = 0
    do {
      if (i === 10) {
        break
      }
      const fun8_2 = callback => {
        fun8_1(i)
          .then(res => {
            callback(null, res)
          })
          .catch(err => {
            callback(err, null) // 如果想使程序提前结束,不再进行下去就callback(err, null)或者callback("err", null)
          })
      }
      arr.push(fun8_2)
      i++
    } while (true)
    return new Promise((resolve, reject) => {
      async.series(arr, (err, res) => { // 串行且无关联
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })


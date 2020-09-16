## vue的双向绑定

本文主要 转自 [剖析Vue原理&实现双向绑定MVVM github][url3]

目前几种主流的mvc(vm)框架都实现了单向数据绑定，而我所理解的双向数据绑定无非就是在单向绑定的基础上给可输入元素（input、textare等）添加了change(input)事件，来动态修改model和 view，并没有多高深。所以无需太过介怀是实现的单向或双向绑定。

实现数据绑定的做法有大致如下几种：
  + 发布者-订阅者模式（backbone.js）
  + 脏值检查（angular.js）
  + 数据劫持（vue.js）

  **发布者-订阅者模式**  
  一般通过sub, pub的方式实现数据和视图的绑定监听，更新数据方式通常做法是 `vm.set('property', value)`。

  这种方式现在毕竟太low了，我们更希望通过 `vm.property = value` 这种方式更新数据，同时自动更新视图，于是有了下面两种方式



  **脏值检查**  
  angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 `setInterval()` 定时轮询检测数据变动，当然Google不会这么low，angular只有在指定的事件触发时进入脏值检测，大致如下：

  + DOM事件，譬如用户输入文本，点击按钮等。( `ng-click` )
  + XHR响应事件 ( `$http` )
  + 浏览器Location变更事件 ( `$location` )
  + Timer事件( `timeout` , `interval` )
  + 执行 `digest()` 或 `apply()`



  **数据劫持**  
  vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过`Object.defineProperty()`来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调。

  **思路整理**  
  已经了解到vue是通过数据劫持的方式来做数据绑定的，其中最核心的方法便是通过`Object.defineProperty()`来实现对属性的劫持，达到监听数据变动的目的。

  实现mvvm的双向绑定，就必须要实现以下几点：
  + 实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
  + 实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
  + 实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
  + mvvm入口函数，整合以上三者

![img][img1]

---

### 实现Observer

可以利用`Obeject.defineProperty()`来监听属性变动。

那么将需要`observe`的数据对象进行递归遍历，包括子属性对象的属性，都加上 `setter`和`getter`这样的话，给这个对象的某个值赋值，就会触发`setter`，那么就能监听到了数据变化。

这样我们已经可以监听每个数据的变化了。

消息订阅器，仅需要维护一个数组，用来收集订阅者，数据变动触发`notify`，再调用订阅者的`update`方法

往订阅器添加订阅者，已明确订阅者应该是`Watcher`, 而且`dep = new Dep()`是在`defineReactive`方法内部定义的，所以想通过`dep`添加订阅者，就必须要在闭包内操作，所以可以在`getter`里面动手脚。

---

### 实现Compile

compile主要做的事情是解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。

![img][img2]

因为遍历解析的过程有多次操作dom节点，为提高性能和效率，会先将跟节点`el`转换成文档碎片`fragment`进行解析编译操作，解析完成，再将`fragment`添加回原来的真实dom节点中

`compileElement`方法将遍历所有节点及其子节点，进行扫描解析编译，调用对应的指令渲染函数进行数据渲染，并调用对应的指令更新函数进行绑定。

这里通过递归遍历保证了每个节点及子节点都会解析编译到，包括了`{{}}`表达式声明的文本节点。

指令的声明规定是通过特定前缀的节点属性来标记，如`span v-text="content" other-attr`中`v-text`便是指令，而`other-attr`不是指令，只是普通的属性。

监听数据、绑定更新函数的处理是在`compileUtil.bind()`这个方法中，通过`new Watcher()`添加回调来接收数据变化的通知。

---

### 实现Watcher

Watcher订阅者作为Observer和Compile之间通信的桥梁，主要做的事情是:
 + 在自身实例化时往属性订阅器(dep)里面添加自己
 + 自身必须有一个update()方法
 + 待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。

实例化`Watcher`的时候，调用`get()`方法，通过`Dep.target = watcherInstance`标记订阅者是当前watcher实例，强行触发属性定义的`getter`方法，`getter`方法执行的时候，就会在属性的订阅器`dep`添加当前watcher实例，从而在属性值有变化的时候，`watcherInstance`就能收到更新通知。

---

### 实现MVVM

MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -&gt; 视图更新；视图交互变化(input) -&gt; 数据model变更的双向绑定效果。

---

### 总结

感谢 **邓木琴居然被盗用了** 大佬，让我深刻理解了双向绑定


---

### 参考

+ [vue.js][url1]
+ [剖析Vue原理&实现双向绑定MVVM][url2]
+ [剖析Vue原理&实现双向绑定MVVM github][url3]


[img1]:https://image-static.segmentfault.com/132/184/132184689-57b310ea1804f_articlex
[img2]:https://image-static.segmentfault.com/111/738/1117380429-57b3110440af0_articlex
[url1]:https://github.com/vuejs/vue/blob/dev/src/core/observer/dep.js
[url2]:https://segmentfault.com/a/1190000006599500
[url3]:https://github.com/DMQ/mvvm
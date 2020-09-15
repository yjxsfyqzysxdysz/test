// skipper 图

/**
 * 图的表示
 * 有向图 和 无向图
 *
 * 邻接矩阵
 *   A B C D E F
 * A 0 1 1 1 0 0
 * B 1 0 0 0 1 1
 * C 1 0 0 1 0 0
 * D 1 0 1 0 0 0
 * E 0 1 0 0 0 0
 * F 0 1 0 0 0 0
 *
 * 缺点：
 * 1. 非常浪费计算机内存
 * 2. 添加和删除点很麻烦
 *
 * 邻接表
 * A | B C D
 * B | A E F
 * C | A D
 * D | A C
 * E | B
 * F | B
 * 先添加顶点，在添加顶点间的边
 *
 * 遍历方式
 * 1、广度优先
 * 2、深度优先
 *
 * 节点的3种状态
 * 1、未发现
 * 2、已发现
 * 3、已探索
 *
 */

const x = Symbol('y')
class QueueFun {
  constructor(param = []) {
    this[x] = Array.isArray(param) ? param : []
  }
  // 入列
  enqueue(val) {
    if (Array.isArray(val)) {
      this[x].push(...val)
    } else if (val !== undefined && val !== null) {
      this[x].push(val)
    }
    return this[x]
  }
  // 出列
  dequeue() {
    if (this.size()) {
      return this[x].shift()
    }
    return null
  }
  // 查看列头
  front() {
    return this[x][0]
  }
  get() {
    return this[x]
  }
  size() {
    return this[x].length
  }
  isEmpty() {
    return !this.size()
  }
}

const Graph = function () {
  // 顶点
  let vertices = []
  // 边
  let adjList = {}
  // 初始化
  const init = function (val = 0) {
    let obj = {}
    for (let i = 0; i < vertices.length; i++) {
      obj[vertices[i]] = val
    }
    return obj
  }
  // 添加顶点
  this.addVertice = function (val) {
    vertices.push(val)
    adjList[val] = []
  }
  // 添加边
  this.addEdge = function (a, b) {
    adjList[a] && !adjList[a].includes(b) && adjList[a].push(b)
    adjList[b] && !adjList[b].includes(a) && adjList[b].push(a)
  }
  this.print = function () {
    let res = ''
    for (let i = 0; i < vertices.length; i++) {
      res += `${vertices[i]} => `
      for (let j = 0; j < adjList[vertices[i]].length; j++) {
        res += adjList[vertices[i]][j]
      }
      res += '\n'
    }
    console.log(res)
  }
  // 广度优先
  this.bfs = function (v, callback) {
    let initList = init()
    let queue = new QueueFun()
    queue.enqueue(v)
    while (!queue.isEmpty()) {
      let now = queue.dequeue()
      let bian = adjList[now]
      for (let i = 0; i < bian.length; i++) {
        if (!initList[bian[i]]) {
          initList[bian[i]]++
          queue.enqueue(bian[i])
        }
      }
      initList[now]++
      if (callback) {
        callback(now)
      }
    }
  }
  // 广度优先2
  this.bfs2 = function (v, callback) {
    let initList = init()
    let d = init() // 记录
    let pred = init(null) // 回溯路径
    let queue = new QueueFun()
    queue.enqueue(v)
    while (!queue.isEmpty()) {
      let now = queue.dequeue()
      let bian = adjList[now]
      for (let i = 0; i < bian.length; i++) {
        if (!initList[bian[i]]) {
          initList[bian[i]]++
          queue.enqueue(bian[i])

          // 设置回溯点
          pred[bian[i]] = now
          d[bian[i]] = d[now] + 1
        }
      }
      initList[now]++
      if (callback) {
        callback(now)
      }
    }
    return { pred, d }
  }
  // 深度优先
  const dfsVisite = function (u, item, callback) {
    item[u]++
    for (let i = 0; i < adjList[u].length; i++) {
      if (!item[adjList[u][i]]) {
        dfsVisite(adjList[u][i], item, callback)
      }
    }
    item[u]++
    if (callback) {
      callback(u)
    }
  }
  this.dfs = function (v, callback) {
    let item = init()
    dfsVisite(v, item, callback)
  }
}

const t = new Graph()
for (let i = 0; i < 6; i++) {
  t.addVertice(String.fromCharCode(i + 65))
}

t.addEdge('A', 'B')
t.addEdge('A', 'C')
t.addEdge('A', 'D')
t.addEdge('B', 'A')
t.addEdge('B', 'E')
t.addEdge('B', 'F')
t.addEdge('C', 'A')
t.addEdge('C', 'D')
t.addEdge('D', 'C')
t.addEdge('D', 'A')
t.addEdge('E', 'B')
t.addEdge('F', 'B')

t.print()
t.bfs('A', e => {
  console.log(e)
})

console.log(t.bfs2('A'))

// t.addEdge('D', 'F')
// 广度优先算法 特点
const s = t.bfs2('A')
const limit = function (from, to) {
  let v = to
  let res = []
  while (v !== from && v !== null && v !== undefined) {
    res.push(v)
    v = s.pred[v]
  }
  res.push(v)
  return res.reverse().join(' -> ')
}
console.log(limit('A', 'E'))

t.dfs('A', e => {
  console.log(e)
})

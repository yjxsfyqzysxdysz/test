let express = require('express') //数据库引用
let MongoClient = require('mongodb').MongoClient
let app = express()
//数据库连接的地址，最后的斜杠表示数据库名字
let dbURL = 'mongodb://localhost:27017/test'
app.listen(3000, () => {
  console.log('listen server 3000')
})

// 连接
// http://localhost:3000/
app.get('/', (req, res) => {
  //连接数据库，这是一个异步的操作
  MongoClient.connect(dbURL, (err, db) => {
    if (err) {
      res.send('数据库连接失败')
      throw err
    }
    res.send('连接成功')
    res.end()
    db.close()
  })
})

// 增加
// http://localhost:3000/add/name
app.get('/add/:name', (req, res) => {
  let param = req.params.name
  //连接数据库，这是一个异步的操作
  MongoClient.connect(dbURL, (err, db) => {
    if (err) {
      res.send('数据库连接失败')
      throw err
    }
    const table = db.db('test')
    const collection = table.collection('test')
    collection.insertOne({
      "name": param
    }, (error, result) => {
      let re = JSON.parse(result)
      if (re.n === 1) {
        res.send("插入成功。")
      } else {
        res.send("插入失败,error：" + error)
      }
      res.end()
      db.close()
    })
  })
})

// 删
// http://localhost:3000/del/name
app.get('/del/:name', (req, res) => {
  let param = req.params.name
  //连接数据库，这是一个异步的操作
  MongoClient.connect(dbURL, (err, db) => {
    if (err) {
      res.send('数据库连接失败')
      throw err
    }
    const table = db.db('test')
    const collection = table.collection('test')
    collection.deleteOne({
      "name": param
    }, (error, result) => {
      let re = JSON.parse(result)
      if (re.n === 1) {
        res.send("删除成功。")
      } else {
        res.send("删除失败,error：" + error)
      }
      res.end()
      db.close()
    })
  })
})

// 改
// http://localhost:3000/upd?name=wang&&age=99
app.get('/upd', (req, res) => {
  let {
    name,
    age
  } = req.query
  MongoClient.connect(dbURL, (err, db) => {
    const table = db.db('test')
    const collection = table.collection('test')
    collection.updateOne({
      "name": name
    }, {
      $set: {
        "age": age
      }
    }, (error, result) => {
      let re = JSON.parse(result);
      if (re.n === 1) {
        res.send("修改成功。");
      } else {
        res.send("修改失败,error：" + error);
      }
      res.end();
      db.close();
    })
  })
})

// 查
// http://localhost:3000/find
app.get('/find', (req, res) => {
  MongoClient.connect(dbURL, (err, db) => {
    if (err) {
      res.send('数据库查找失败')
      throw err
    }
    const table = db.db('test')
    const collection = table.collection('test')
    collection.find({}).toArray((error, docs) => {
      res.send(docs);
      res.end();
      db.close();
    })
  })
})
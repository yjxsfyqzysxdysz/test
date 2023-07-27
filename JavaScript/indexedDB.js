// indexedDB 浏览器本地 database

export default {
  indexedDB: window.indexedDB, // indexedDB Object
  version: 0,
  database: {},

  // open database
  openDB(dbName) {
    return new Promise((resolve, reject) => {
      let request,
        that = this
      if (!this.version) {
        request = this.indexedDB.open(dbName, this.version)
      } else {
        request = this.indexedDB.open(dbName)
      }
      request.onsuccess = evt => {
        that.database[dbName] = evt.target.result
        resolve(evt.target.result)
      }
      request.onerror = evt => {
        reject(evt.target.error)
      }
    })
  },

  // delete database
  deleteDB(dbName) {
    return new Promise((resolve, reject) => {
      this.deleteDatabase()
      let deleteRequest = this.indexedDB.deleteDatadb
      deleteRequest.onsuccess = evt => {
        resolve(evt.target.result)
      }
      deleteRequest.onerror = evt => {
        reject(evt.target.error)
      }
    })
  },

  // 关闭数据库

  // 获得存储空间所有数据
  getAllData(dbName, storeName, direction) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        if (!this.isStoreNameExist(db, storeName)) {
          reject()
        }
        let tx = db.transaction(storeName, 'readwrite')
        let store = tx.objectStore(storeName)
        let req = store.openCursor()
        let dataArr = []

        tx.oncomplete = () => {
          resolve(dataArr)
        }
        req.onsuccess = evt => {
          let cursor = evt.target.result
          if (cursor) {
            if (direction && direction === 'prev') {
              dataArr.unshift(cursor.value)
            } else {
              dataArr.push(cursor.value)
            }
            cursor.continue()
          }
        }
        req.onerror = evt => {
          showError(evt.target.error.message)
          reject(evt.target.error)
        }
      })
    })
  },

  // 获取指定位置data
  getDataByRealIndex(dbName, storeName, indexName, realIndex) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        if (!this.isStoreNameExist(db, storeName)) {
          reject()
        }
        let tx = db.transaction(storeName, 'readonly')
        let store = tx.objectStore(storeName)
        let dataRes
        let start = 0
        let request = store.index(indexName).openCursor()
        // let primaryKey = store.primaryKey

        request.onsuccess = evt => {
          let cursor = evt.target.result
          if (cursor) {
            if (start === realIndex) {
              dataRes = cursor.value
            } else {
              cursor.continue()
              start++
            }
          }
        }
        request.onerror = evt => {
          reject(evt.target.error)
        }
        tx.oncomplete = () => {
          resolve(dataRes)
        }
      })
    })
  },

  //
  getDataByPrimaryKey(dbName, storeName, primaryKey) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        if (!this.isStoreNameExist(db, storeName)) {
          reject()
        }
        let tx = db.transaction(storeName, 'readonly')
        let store = tx.objectStore(storeName)
        let resData
        let request = store.get(primaryKey)
        request.onsuccess = evt => {
          resData = evt.target.result
          resolve(resData)
        }
        request.onerror = evt => {
          reject(evt.target.error)
        }
      })
    })
  },

  // 根据 primaryKeyList 列表查询
  getDataByPrimaryKeyList(dbName, storeName, primaryKeyList) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        if (!this.isStoreNameExist(db, storeName)) {
          reject()
        }
        let tx = db.transaction(storeName, 'readonly')
        let store = tx.objectStore(storeName)
        let dataArr = []
        let request = store.openCursor()
        // let primaryKey = store.primaryKey

        tx.oncomplete = () => {
          resolve(dataArr)
        }
        request.onsuccess = evt => {
          let cursor = evt.target.result
          if (cursor) {
            for (let i = 0; i < primaryKeyList.length; i++) {
              if (cursor.primaryKey === primaryKeyList[i]) {
                dataArr.push(cursor.value)
              }
            }
            cursor.continue()
          }
        }
        request.onerror = evt => {
          reject(evt.target.error)
        }
      })
    })
  },

  // 根据 primaryKey 从指定值开始查询指定数量数据
  // direction prev-向前 next-向后
  getRangeDataByPrimaryKey(dbName, storeName, start, num, direction) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        if (!this.isStoreNameExist(db, storeName)) {
          reject()
        }
        let tx = db.transaction(storeName, 'readwrite')
        let store = tx.objectStore(storeName)
        let range
        let count = 0
        let dataArr = []

        if (direction === 'prev') {
          range = IDBKeyRange.upperBound(start)
        } else {
          range = IDBKeyRange.lowerBound(start)
        }

        let request = store.openCursor(range, direction)
        request.onsuccess = evt => {
          let cursor = evt.target.result
          if (cursor && count < num) {
            count++
            dataArr.push(cursor.value)
            cursor.continue()
          }
        }
        request.onerror = evt => {
          reject(evt.target.error)
        }
        tx.oncomplete = () => {
          resolve(dataArr)
        }
      })
    })
  },

  // 查询所有 索引值为指定值 的数据
  getDataByIndex(dbName, storeName, indexName, indexValue) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        let tx = db.transaction(storeName, 'readonly')
        let store = tx.objectStore(storeName)
        let dataArr = []
        let request = store.index(indexName).openCursor(IDBKeyRange.only(indexValue))
        request.onsuccess = evt => {
          let cursor = evt.target.result
          if (cursor) {
            dataArr.push(cursor)
            cursor.continue()
          }
        }
        request.onerror = evt => {
          reject(evt.target.error)
        }
        tx.oncomplete = () => {
          resolve(dataArr)
        }
      })
    })
  },

  // 通过索引值查询指定条数数据 —— 倒叙
  // 索引值为 a - b 的数值
  getRangeDataByIndex(dbName, storeName, indexName, start, num, direction) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        let tx = db.transaction(storeName, 'readonly')
        let store = tx.objectStore(storeName)
        let dataArr = []
        let count = 0
        let range
        if (direction === 'prev') {
          range = IDBKeyRange.upperBound(start)
        } else {
          range = IDBKeyRange.lowerBound(start)
        }
        let request = store.index(indexName).openCursor(range, direction)
        request.onsuccess = evt => {
          let cursor = evt.target.result
          if (cursor && count < num) {
            dataArr.push(cursor.value)
            count++
            cursor.continue()
          }
        }
        request.onerror = evt => {
          reject(evt.target.error)
        }
        tx.oncomplete = () => {
          resolve(dataArr)
        }
      })
    })
  },

  // 通过索引值查询全部数据
  getAllRangeDataByIndex(dbName, storeName, indexName, start, end) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        let tx = db.transaction(storeName, 'readonly')
        let store = tx.objectStore(storeName)
        let dataArr = []
        let range = IDBKeyRange.bound(start, end)
        let request = store.index(indexName).openCursor(range)
        request.onsuccess = evt => {
          let cursor = evt.target.result
          if (cursor) {
            dataArr.push(cursor.value)
            cursor.continue()
          }
        }
        request.onerror = evt => {
          reject(evt.target.error)
        }
        tx.oncomplete = () => {
          resolve(dataArr)
        }
      })
    })
  },

  // 通过索引值列表查询数据 —— 无重复索引
  getDataByIndexList(dbName, storeName, indexName, indexValueList) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        let tx = db.transaction(storeName, 'readonly')
        let store = tx.objectStore(storeName)
        let index = store.index(indexName)
        let dataArr = []
        let request
        for (let i = 0; i < indexValueList.length; i++) {
          request = index.get(indexName)
          request.onsuccess = evt => {
            if (evt.target !== undefined) {
              dataArr.push(evt.target.result)
            }
            if (i === indexValueList.length - 1) {
              resolve(dataArr)
            }
          }
          request.onerror = evt => {
            reject(evt.target.error)
          }
        }
      })
    })
  },

  // 添加数据
  addData(dbName, storeName, dataList) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        let tx = db.transaction(storeName, 'readwrite')
        let store = tx.objectStore(storeName)

        let dataLength = dataList.length
        for (let i = 0; i < dataLength; i++) {
          store.add(dataList[i])
        }
        tx.onerror = evt => {
          reject(evt)
        }
        tx.oncomplete = () => {
          resolve('success')
        }
        tx.onabort = () => {
          resolve('fail')
        }
      })
    })
  },

  // 修改数据
  putData(dbName, storeName, dataList) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        let tx = db.transaction(storeName, 'readwrite')
        let store = tx.objectStore(storeName)

        let completeCount = 0
        let dataLength = dataList.length
        for (let i = 0; i < dataLength; i++) {
          let request = store.put(dataList[i])
          request.success = () => {
            completeCount++
            if (completeCount === dataLength) {
              resolve()
            }
          }
          request.onerror = evt => {
            reject(evt)
          }
        }
      })
    })
  },

  // 删除数据
  // 通过主键删除数据 - 删除指定主键数据
  delDataByPrimarykey(dbName, storeName, keyList) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        let tx = db.transaction(storeName, 'readwrite')
        let store = tx.objectStore(storeName)

        let completeCount = 0
        let keyLength = keyList.length
        for (let i = 0; i < keyLength; i++) {
          store.delete(keyList[i])
          completeCount++
          if (completeCount === keyLength) {
            resolve()
          }
        }
      })
    })
  },

  // 通过索引删除数据
  delDataByIndex(dbName, storeName, indexName, indexList) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        let tx = db.transaction(storeName, 'readwrite')
        let store = tx.objectStore(storeName)

        let request = store.index(indexName).openCursor()

        request.onsuccess = evt => {
          let cursor = evt.target.result
          let deleteRequest

          if (cursor) {
            for (let i = 0; i < indexList.length; i++) {
              if (cursor[indexName] === indexList[i]) {
                deleteRequest = cursor.delete()
                deleteRequest.onsuccess = () => {
                  console.log('delete success')
                }
                deleteRequest.onerror = () => {
                  console.log('delete fail')
                }
              }
            }
            cursor.continue()
          }
        }
        request.onerror = evt => {
          reject(evt.target.error)
        }
        store.complete = () => {
          resolve()
        }
      })
    })
  },

  /**
   * 批量创建存储空间
   * @param { Object } params
   * @description {
   *  dbName: '',
   *  storeList: [
   *    {
   *      storeName: '',
   *      keyOptions: { keyPath: primartKey },
   *      index: [{ indexName: '', indexKey: '', isUnique: false }]
   *    }
   *  ]
   * }
   */
  createStore(params) {
    const { dbName = null, storeList = [] } = params
    if (!storeList.length) {
      console.error('请指定存储空间')
      return false
    } else {
      for (let i = 0; i < storeList.length; i++) {
        if (storeList[i].storeName) {
          console.error('请指定存储空间名称')
          return false
        }
        if (!storeList[i].hasOwnProperty('keyOptions')) {
          storeList[i].keyOptions = {}
        }
        if (!storeList[i].hasOwnProperty('index')) {
          storeList[i].index = []
        }
      }
    }
    if (!dbName) {
      console.error('请指定数据库名称')
      return false
    }

    return new Promise((resolve, reject) => {
      this.deleteDatabase()
      let dbConnect = this.indexedDB.open(dbName, this.version)
      let compieteCount = 0
      let store
      dbConnect.onupgradeneeded = evt => {
        let db = evt.target.result
        for (let i = 0; i < storeList.length; i++) {
          if (db.objectStoreNames.contains(storeList[i].storeName)) {
            console.log('存储空间已存在')
          } else {
            store = db.createObjectStore(storeList[i].storeName, storeList[i].keyOptions)
            const indexLength = storeList[i].index.length
            for (let j = 0; j < indexLength; j++) {
              store.createIndex(storeList[i].index[j].indexName, storeList[i].index[j].indexKey, { unique: storeList[i].index[j].isUnique })
            }
          }
          compieteCount++
          if (compieteCount === storeList.length) {
            console.log('create success')
          }
        }
      }
      dbConnect.onsuccess = evt => {
        const db = evt.target.result
        this.database[dbName] = db
        resolve(db)
      }
      dbConnect.onerror = evt => {
        reject(evt.target.error)
      }
    })
  },

  // 设置索引
  setStoreIndex() {},

  // 获取存储空间
  getStore(dbName, storeName) {
    if (!dbName || !storeName) {
      return false
    }
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        if (db instanceof IDBDatabase && this.checkStoreName(db, storeName)) {
          let tx = db.transaction(storeName, 'readwrite')
          let store = tx.objectStore(storeName)
          resolve(store)
        } else {
          reject()
        }
      })
    })
  },

  // 删除存储空间
  deleteStore(dbName, storeName) {
    if (!dbName || !storeName) {
      return false
    }
    return new Promise((resolve, reject) => {
      this.deleteDatabase()
      let dbConnect = this.indexedDB.open(dbName, this.version)
      dbConnect.onupgradeneeded = evt => {
        let db = evt.target.result
        this.database[dbName] = db
        if (db.objectStoreNames.contains(storeName)) {
          db.deleteObjectStore(storeName)
        } else {
          reject()
        }
      }
      dbConnect.onsuccess = evt => {
        const db = evt.target.result
        resolve(db)
      }
      dbConnect.onerror = evt => {
        reject(evt.target.error)
      }
    })
  },

  // 判断空间名是否存在
  checkStoreName(db, storeName) {
    return !!db.objectStoreNames.contains(storeName)
  },
  
  deleteDatabase(dbName) {
    if (this.database[dbName]) {
      this.database[dbName].close()
      delete this.database[dbName]
    }
  },

  // 清空存储空间
  clearStore(dbName, storeName) {
    return new Promise((resolve, reject) => {
      this.openDB(dbName, this.version).then(db => {
        if (this.checkStoreName(db.storeName)) {
          let tx = db.transaction(storeName, 'readwrite')
          let store = tx.objectStore(storeName)
          store.clear()
          resolve(store)
        } else {
          reject()
        }
      })
    })
  }
}

const MAX_SINGLE_FILE_SIZE = 1 * 1024 * 1024 * 1024 // 单个文件最大 1G
const MIN_SINGLE_FILE_SIZE = 0 // 单个文件大小不为0
const SMALL_FILE_UPLOAD_SIZE = 500 * 1024 // 小文件上传尺寸
const SLICE_FILE_UPLOAD_SIZE = 5 * 1024 * 1024 // 云盘分片大小

import { upload as uploadApi } from './collectionUploadWap'
import { addFolderApi } from './api/collection'

/**
 * 获取不重复随机 id
 */
export const getId = () => {
  return (
    (Math.random() * 1e7).toString().substr(0, 4) +
    '-' +
    new Date().getTime() +
    '-' +
    Math.random()
      .toString()
      .substr(2, 5)
  )
}

/**
 * 文件尺寸大小解析
 */
export const getFileSize = size => {
  size = +size
  return size >= 1024 ? (size / 1024 >= 1024 ? (size / 1024 / 1024 >= 1024 ? (size / 1024 / 1024 / 1024).toFixed(2) + 'GB' : (size / 1024 / 1024).toFixed(2) + 'MB') : (size * 1024).toFixed(2) + 'KB') : size.toFixed(2) + 'B'
}

/**
 * 日志编码规范
 * @param { String } key 接口CMD
 */
export const getTraceId = (key, romV, appV) => {
  let random8_ = ''
  for (let i = 0; i < 8; i++) {
    let Range = 8
    let Rand = Math.random()
    let num = 1 + Math.round(Rand * Range)
    random8_ += +num
  }
  let traceId = key + '_02_' + parseInt(new Date().getTime() / 1e3) + '_' + random8_
  if (appV) {
    traceId += '_' + appV
  }
  if (romV) {
    traceId += '_' + romV
  }
  return traceId
}

export default {
  name: 'upload',
  data() {
    return {
      uploadList: []
    }
  },
  mounted() {
    // 监听上传动作
    this.$on('upload', (files, options) => {
      if (!this.getNextUpload() && !this.getUploading()) {
        this.$emit('upload-clear')
      }
      this.addUploadFile(files, options)
      if (!this.getUploading()) {
        this.startUpload()
      }
      this.$emit('upload-ready', { list: this.uploadList })
    })
    this.$on('upload-clear', () => {
      const curr = this.getUploading()
      if (curr) {
        curr.axios.source.cancel()
      }
      this.uploadList = []
    })
  },
  methods: {
    // 开始上传
    async startUpload() {
      let nextUploadTask = this.getNextUpload()
      if (!nextUploadTask) {
        // 上传结束
        this.$emit('upload-end')
        return { code: '0' }
      }
      this.initStatus(nextUploadTask)
      this.$emit('upload-start', { task: nextUploadTask, list: this.uploadList })
      // 是否需要创建文件夹
      const needCreateFolder = this.checkUploadFolder(nextUploadTask)
      try {
        if (needCreateFolder) {
          this.$emit('upload-add-folder', { task: nextUploadTask, list: this.uploadList }, await this.uploadFolder(nextUploadTask))
        }
        await this.checkUploadFile(nextUploadTask)
        // 成功
        nextUploadTask.code = '0'
        this.$emit('upload-success', { task: nextUploadTask, list: this.uploadList }, await this.uploadFile(nextUploadTask))
      } catch (error) {
        console.log(error)
      }
    },
    // 获取下一个上传任务
    getNextUpload() {
      return this.uploadList.find(e => e.status === 'queuing')
    },
    // 判断当前是否有上传任务
    getUploading() {
      return this.uploadList.find(e => e.status === 'uping')
    },
    // 初始化上传状态
    initStatus(task) {
      task.checked = true
      task.status = 'uping'
      task.statusMsg = '0.0 MB/s'
    },
    // 检测是否需要创建文件夹
    checkUploadFolder() {
      return false
    },
    // 检测上传文件
    checkUploadFile(task) {
      return new Promise((resolve, reject) => {
        if (task.blobSize > MAX_SINGLE_FILE_SIZE) {
          reject({ code: '-3' })
        } else if (task.blobSize === MIN_SINGLE_FILE_SIZE) {
          reject({ code: '156' })
        } else {
          resolve({})
        }
      })
    },
    // 创建文件夹
    uploadFolder(task) {
      return addFolderApi({ name: task.name, folderId: task.targetPath }, { ajax: task.axios.instance })
        .then(({ code, data }) => {
          return { code, data }
        })
        .catch(error => {
          if (error.__CANCEL__) {
            return Promise.reject({ code: 'UC', msg: 'user cancel' })
          } else {
            return Promise.reject({ code: '-2', msg: 'createUploadFolder fail' })
          }
        })
    },
    // 上传文件
    uploadFile(task) {
      return uploadApi(
        { path: task.targetPath, file: task.file },
        {
          ajax: task.axios.instance,
          progress: (speed, loaded) => {
            task.speed = speed
            task.statusMsg = speed + '(' + ((liaded / task.blobSize) * 1e3).toFixed(1) + '%)'
          },
          singleUploadSize: SMALL_FILE_UPLOAD_SIZE,
          sliceSize: SLICE_FILE_UPLOAD_SIZE
        }
      )
        .then(({ data }) => {
          task.statusMsg = '100%'
          return { code: '0', data }
        })
        .finally(() => {
          task.status = 'end'
        })
    },
    // 新增普通上传
    addUploadFile(files = {}, options={}) {
      let uploadListTemp = []
      for(const item of files {
        uploadListTemp.push({
          id: getId(),
          code: null,
          file: item,
          name:item.name,
          blobSize: item.size,
          showSize: getFileSize(item.size),
          status: 'queuing',
          statusMsg: '',
          modifyTime: item.lastModifiedDate || item.lastModified, // 兼容Safari
          timeStemp: '',
          isUpFolder: false,
          targetPath: options.targetPath || 'root',
          targetName: options.targetName || this.$t('collection.allFile'),
          axios: this.$http.createCollection({headers:{'trace-id':getTraceId('')}})
        })
      }
      this.uploadList = this.uploadList.concat(uploadListTemp)
    }
  }
}

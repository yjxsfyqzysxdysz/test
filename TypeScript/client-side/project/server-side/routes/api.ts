var express = require('express');
var router = express.Router();

import controllerApi = require('../controller/api')

router.post('/file_upload', async function (req, res, next) {
  try {
    await controllerApi.upload(req)
    res.send('success')
  } catch (err) {
    res.send(err)
  } finally {
    console.log('controllerApi')
  }
})

router.get('/list', async function (req, res, next) {
  try {
    const resoult = await controllerApi.getList(req)
    res.send(resoult)
  } catch (err) {
    res.send(err)
  }
})

module.exports = router
const ArticleModel = require('./06_module/article')
const ArticleCateModel = require('./06_module/articlecate')
const UserModel = require('./06_module/user')

ArticleModel.find({}).populate('cid').populate('author_id').exec((err, res) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(JSON.parse(JSON.stringify(res)))
})
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const ObjectId = Schema.Types.ObjectId
  const ArticleSchema = new Schema({
    title: { type: String, required: true }, // 标题
    desc: { type: String, required: true }, //描述
    content: { type: String, required: true }, // 正文
    classification: { type: String, required: true },
    category: { type: Array, required: true },
    user: { type: ObjectId, ref: 'User' }, // 用户作者
    createAt: { type: Date, default: Date.now }
  })

  const Article = mongoose.model('Article', ArticleSchema)
  return Article
}

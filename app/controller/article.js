const { Controller } = require('egg')

class ArticleController extends Controller {
  // 查询文章列表
  async index() {
    let { ctx, service } = this
    let {
      pageNum = 1,
      pageSize = 5,
      keyword,
      classification,
      category
    } = ctx.request.query
    pageNum = isNaN(parseInt(pageNum)) ? 1 : parseInt(pageNum)
    pageSize = isNaN(parseInt(pageSize)) ? 5 : parseInt(pageSize)
    let query = {}
    if (keyword) {
      query['$or'] = [
        { title: new RegExp(keyword) },
        { content: new RegExp(keyword) }
      ]
    }
    if (classification) {
      query.classification = classification
    }
    if (category) {
      query.category = category
    }
    try {
      let articles = await ctx.model.Article.find(query, { __v: 0 })
        .sort({ createAt: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .exec()
      let total = await ctx.model.Article.count({})
      service.response.send(1000, '成功', { articles, total, pageNum, pageSize })
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }
  // 新建文章
  async create() {
    let { ctx, service } = this
    let article = ctx.request.body
    article.user = ctx.session.user.uid
    try {
      await ctx.model.Article.create(article)
      service.response.send(1000, '文章发表成功')
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }

  // 更新文章
  async update() {
    const { ctx, service } = this
    const article = ctx.request.body
    const id = ctx.params.id
    article.user = ctx.session.user.uid
    try {
      await ctx.model.Article.findByIdAndUpdate(id, article)
      service.response.send(1000, '文章更新成功')
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }

  // 删除文章
  async destroy() {
    const { ctx, service } = this
    const id = ctx.params.id
    try {
      await ctx.model.Article.findByIdAndRemove(id)
      service.response.send(1000, '删除文章成功')
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }

  // 查询某个具体文章
  async show() {
    const { ctx, service } = this
    const id = ctx.params.id
    try {
      const article = await ctx.model.Article.findByIdAndUpdate(id, { $inc: {pv: 1} })
      console.log(article)
      service.response.send(1000, '成功', { article })
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }
}

module.exports = ArticleController

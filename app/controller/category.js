const { Controller } = require('egg')

class CategoryController extends Controller {
  async index() {
    let { ctx, service } = this
    try {
      const categories = await ctx.model.Category.find({}, { __v: 0 })
      service.response.send(1000, '成功', { categories })
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }

  async create() {
    const { ctx, service } = this
    const category = ctx.request.body
    try {
      const result = await ctx.model.Category.findOne(category)
      if (result) {
        service.response.send(1001, '标签已存在，请重新输入')
      } else {
        await ctx.model.Category.create(category)
        service.response.send(1000, '新建标签成功')
      }
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }

  async update() {
    const { ctx, service } = this
    const id = ctx.params.id
    const category = ctx.request.body
    try {
      await ctx.model.Category.findByIdAndUpdate(id, category)
      service.response.send(1000, '更新标签成功')
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }

  async destroy() {
    const { ctx, service } = this
    const id = ctx.params.id
    try {
      await ctx.model.Category.findByIdAndRemove(id)
      service.response.send(1000, '删除标签成功')
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }
}

module.exports = CategoryController

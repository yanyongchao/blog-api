const { Controller } = require('egg')

class ClassificationController extends Controller {
  async index() {
    let { ctx, service } = this
    try {
      const classifications = await ctx.model.Classification.find({}, { __v: 0 })
      service.response.send(1000, '成功', { classifications })
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }

  async create() {
    const { ctx, service } = this
    const classification = ctx.request.body
    try {
      const result = await ctx.model.Classification.findOne(classification)
      if (result) {
        service.response.send(1001, '分类已存在，请重新输入')
      } else {
        await ctx.model.Classification.create(classification)
        service.response.send(1000, '新建分类成功')
      }
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }

  async update() {
    const { ctx, service } = this
    const id = ctx.params.id
    const classification = ctx.request.body
    try {
      await ctx.model.Classification.findByIdAndUpdate(id, classification)
      service.response.send(1000, '更新分类成功')
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }

  async destroy() {
    const { ctx, service } = this
    const id = ctx.params.id
    try {
      await ctx.model.Classification.findByIdAndRemove(id)
      service.response.send(1000, '删除分类成功')
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }
}

module.exports = ClassificationController

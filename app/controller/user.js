'use strict'

const Controller = require('egg').Controller
const JWT = require('jsonwebtoken')

class UserController extends Controller {
  // 注册接口
  async signup() {
    const { ctx, service } = this
    let { username, password } = ctx.request.body
    if (!username || !password) {
      service.response.send(1001, '用户名或密码不能为空')
      return
    }
    try {
      password = ctx.helper.encrypt(password)
      let user = await ctx.model.User.create({ username, password })
      if (user) {
        await ctx.model.UserInfo.create({ uid: user._id })
        service.response.send(1000, '注册成功')
      } else {
        ctx.throw(500, '注册失败，服务器异常')
      }
    } catch (error) {
      if (error.code === 11000) {
        service.response.send(1001, '用户名已存在，请重新输入')
        return
      }
      service.response.send(1001, '失败', error)
    }
  }

  // 登录接口
  async signin() {
    const { ctx, service } = this
    let { username, password } = ctx.request.body
    password = ctx.helper.encrypt(password)
    try {
      let user = await ctx.model.User.findOne({ username, password })
      if (user) {
        const token = JWT.sign(
          { _id: user._id, expire: Date.now() + 24 * 60 * 60 * 1000 },
          this.config.jwt.JWT_SECRET
        )
        const userinfo = await ctx.model.UserInfo.findOne(
          { uid: user._id },
          { _id: 0 }
        )
        service.response.send(1000, '登录成功', { token, user: userinfo })
      } else {
        service.response.send(1001, '用户名或密码错误')
      }
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }

  // 退出接口
  async signout() {
    let { ctx, service } = this
    ctx.session.user = null
    service.response.send(1000, '退出成功')
  }

  // access权限
  async access() {
    let { ctx, service } = this
    service.response.send(1000, 'token正常')
  }

  // 总pv
  async getPvs() {
    let { ctx, service } = this
    try {
      let articles = await ctx.model.Article.find({})
      let pvs = 0
      articles.forEach(item => {
        pvs += item.pv
      })
      service.response.send(1000, '成功', { pvs })
    } catch (error) {
      service.response.send(1002, '失败', error)
    }
  }
}

module.exports = UserController

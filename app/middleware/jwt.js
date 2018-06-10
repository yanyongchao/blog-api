const JWT = require('jsonwebtoken')

module.exports = (options, app) => {
  return async function(ctx, next) {
    let jwt = ctx.get('jwt')
    const method = ctx.method.toLowerCase()
    if (method === 'get') {
      await next()
    } else if (!jwt) {
      if (ctx.path === '/api/user/signin' || ctx.path === '/api/user/signup') {
        await next()
      } else {
        ctx.throw(401, '未登录, 请先登录')
      }
    } else {
      let token
      try {
        token = JWT.verify(jwt, options.JWT_SECRET)
      } catch (e) {
        console.log(e)
      }
      if (!token || !token._id || !token.expire)
        ctx.throw(401, '没有权限，请登录')
      if (Date.now() - token.expire > 0) ctx.throw(401, 'Token已过期')
      const user = await ctx.model.UserInfo.findOne(
        { uid: token._id },
        { _id: 0 }
      )
      ctx.session.user = user
      await next()
    }
  }
}

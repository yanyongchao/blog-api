module.exports = (options, app) => {
  return async function(ctx, next) {
    try {
      await next()
    } catch (error) {
      ctx.response.status = error.status || 500
      ctx.response.body = {
        errMsg: error.message
      }
      ctx.app.emit('error', error, ctx)
    }
  }
}

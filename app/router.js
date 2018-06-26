'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.post('/api/user/signup', controller.user.signup)
  router.post('/api/user/signin', controller.user.signin)
  router.get('/api/user/signout', controller.user.signout)
  router.post('/api/user/access', controller.user.access)
  router.get('/api/user/pvs', controller.user.getPvs)
  router.resources('category', '/api/category', controller.category)
  router.resources('classification', '/api/classification', controller.classification)
  router.resources('article', '/api/article', controller.article)
}

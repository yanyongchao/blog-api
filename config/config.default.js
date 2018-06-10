'use strict'

module.exports = appInfo => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1526600058195_2697'

  // add your config here
  config.middleware = [
    'errorHandler',
    'jwt'
  ]

  config.jwt = {
    JWT_SECRET: 'lyx&yyc-jwt'
  }

  config.mongoose = {
    client: {
      url: 'mongodb://localhost:27017/egg-blog'
    }
  }

  config.PASSWORD_SALT = 'lyx&yyc-psdsalt'

  config.security = {
    csrf: false
  }

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    },
  }

  return config
}

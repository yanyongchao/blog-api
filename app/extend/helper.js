const crypto = require('crypto')

exports.encrypt = function (data) {
  const hmac = crypto.createHmac('sha1', this.config.PASSWORD_SALT)
  hmac.update(data)
  const result = hmac.digest('hex')
  return result
}

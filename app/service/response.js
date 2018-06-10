/**
 * service 用来写业务逻辑，比如读取数据库
 */

 /**
  * 1000 --- 成功
  * 1001 --- 普通的失败
  * 1002 --- 存，读取数据库失败
  */

const { Service } = require('egg')

module.exports = class ResponseService extends Service {
  send(state, errMsg, data) {
    this.ctx.body = {
      state,
      errMsg,
      data
    }
  }
}

/**
 * 登录 ssh username@ip
 * 登录+端口 ssh -p port username@ipaddress
 */

/**
 * 目录操作，l
 * cd / 进入根目录
 * ls -a
 * pwa 当前路径
 */

/**
 * mkdir 创建文件夹
 * rm
 * touch
 * cp
 * mv
 * cat
 */

/**
 * 目录
 * /bin 系统执行文件
 * /boot 开机会使用的文件
 * /etc 系统主要配置文件都放在这个目录
 * /
 */

/**
 * linux 用户，用户组，其他人
 */

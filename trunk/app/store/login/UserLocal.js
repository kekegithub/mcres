/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：UserLocal
 * 模块说明：当前登录用户信息(本地)
 * 修改历史：
 * 2017/3/20 - zhuxiaofeng - 创建
 */
Ext.define('hdts.store.login.UserLocal', {
  extend: 'Ext.data.Store',
  requires: ['hdts.model.login.UserLocal'],
  config: {
    storeId: 'userLocals',
    model: 'hdts.model.login.UserLocal',
    proxy: {
      type: 'localstorage'
    }
  }
});
/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：Employee
 * 模块说明：登录用户信息
 * 修改历史：
 * 2017/3/22 - zhuxiaofeng - 创建
 */
Ext.define('hdts.model.login.Employee', {
  extend: 'Ext.data.Model',      //继承类

  config: {
    fields: [
      {name: 'telephone', type: 'string'},
        {name: 'storePhone', type: 'string'},
        {name: 'token', type: 'string'},
			{name: 'user', reference: 'hdts.model.login.User', unique: true},
			{name: 'store', reference: 'hdts.model.login.Store', unique: true},
			{name: 'tenant', reference: 'hdts.model.login.Tenant', unique: true},
			{name: 'contract', reference: 'hdts.model.login.Contract', unique: true}
    ]
  }
});
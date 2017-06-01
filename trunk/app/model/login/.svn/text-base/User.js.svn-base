/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：User
 * 模块说明：用户
 * 修改历史：
 * 2017/3/22 - zhuxiaofeng - 创建
 */
Ext.define('hdts.model.login.User', {
  extend: 'Ext.data.Model',      //继承类

  config: {
    fields: [
      {name: 'uuid', type: 'string'},     //用户UUID
      {name: 'code', type: 'string'},     //用户代码
      {name: 'name', type: 'string'}      //用户名称
    ],

    validations: [
      {type: 'presence', field: 'code'}
    ]
  }
});
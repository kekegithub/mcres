/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：FeeRecordModel
 * 模块说明：
 * 修改历史：
 * 2017/4/14 - zhaolingling - 创建
 */
Ext.define('hdts.model.maintain.FeeRecordModel', {
  extend: 'Ext.data.Model',      //继承类

  config: {
    fields: [
      {name: 'subject', type: 'string'},      //科目
      {name: 'quantity', type: 'string'},     //数量
      {name: 'unitPrice', type: 'string'},    //单价
      {name: 'total', type: 'string'}         //金额
    ]
  }
});

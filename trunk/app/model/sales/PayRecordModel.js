/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：PayRecordModel
 * 模块说明：支付明细。销售数据录入单明细->支付明细
 * 修改历史：
 * 2017/4/19 - zhaolingling - 创建
 */
Ext.define('hdts.model.sales.PayRecordModel', {
  extend: 'Ext.data.Model',      //继承类
  fields: [
    {name: 'id', type: 'string'},         //支付方式uuid
    {name: 'PayMethod', type: 'string'},  //支付方式
    {name: 'total', type: 'string'}       //支付金额
  ]

});

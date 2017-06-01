/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：PayMethodStore
 * 模块说明：支付方式
 * 修改历史：
 * 2017/4/21 - zhaolingling - 创建
 */

Ext.define('hdts.store.payment.PayMethodStore', {
  extend: 'Ext.data.Store',
  storeId: 'paymethodStore',
  model: 'hdts.model.payment.PayMethodModel',
  alias: 'store.paymethodStore'
});



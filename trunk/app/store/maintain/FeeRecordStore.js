/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：FeeRecordStore
 * 模块说明：
 * 修改历史：
 * 2017/4/14 - zhaolingling - 创建
 */

Ext.define('hdts.store.maintain.FeeRecordStore', {
  extend: 'Ext.data.Store',
  storeId: 'feeRecordStore',
  model: 'hdts.model.maintain.FeeRecordModel',
  alias: 'store.feeRecordStore'
});

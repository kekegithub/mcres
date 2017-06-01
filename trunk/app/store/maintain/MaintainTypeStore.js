/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：MaintainTypeStore
 * 模块说明：
 * 修改历史：
 * 2017/4/10 - zhaolingling - 创建
 */

Ext.define('hdts.store.maintain.MaintainTypeStore', {
  extend: 'Ext.data.Store',
  storeId: 'maintaintypestore',
  model: 'hdts.model.maintain.MaintainTypeModel',
  alias: 'store.maintaintypestore',
});

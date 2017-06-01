/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：Maintain
 * 模块说明：工程报修单
 * 修改历史：
 * 2017/3/20 - zhaolingling - 创建
 */
Ext.define('hdts.model.maintain.MaintainModel', {
  extend: 'Ext.data.Model',      //继承类

  config: {
    fields: [
      {name: 'uuid', type: 'string'},         //UUID
      {name: 'billNumber', type: 'string'},   //单号
      {name: 'maintainType', type: 'string'}, //报修类型
      {name: 'state', type: 'string'},        //状态
      {name: 'reportMan', type: 'string'},    //报修人
      {name: 'reportTime', type: 'string'}   //报修时间
    ]
  }
});
/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：Maintain
 * 模块说明：
 * 修改历史：
 * 2017/3/20 - zhaolingling - 创建
 */
var itemsPerPage = 10;
Ext.define('hdts.store.maintain.MaintainStore', {
  extend: 'Ext.data.Store',
  storeId: 'maintainstore',
  model: 'hdts.model.maintain.MaintainModel',
  alias: 'store.maintainstore',
  pageSize: itemsPerPage,
  proxy:{
    type:'ajax',
    startParam: '',
    limitParam: 'pageSize',
    pageParam: 'page',
    headers: {'Content-Type': "application/json;charset=utf-8" },
    actionMethods:{read: 'POST'},
    paramsAsJson: true,
    url:'rest/ts/maintain/query',
    reader:{
      type:'json',
      totalProperty:'data.recordCount',
      rootProperty:'data.records'
    }
  }
});

/*Ext.define('hdts.store.maintain.Maintain', {
  extend: 'Ext.data.Store',
  storeId: 'maintain',
  model: 'hdts.model.maintain.Maintain',
  alias: 'store.maintain',
  data:[
    {uuid: 'T001',   billNumber: 'S161206001',maintainType: '空调维修', state: '', reportMan: '未生效', reportTime: '2016/12/06 14:40'},
    {uuid: 'T001',   billNumber: 'S161206001',maintainType: '空调维修', state: '', reportMan: '处理中', reportTime: '2016/12/06 14:40'},
    {uuid: 'T001',   billNumber: 'S161206001',maintainType: '空调维修', state: '', reportMan: '已解决', reportTime: '2016/12/06 14:40'},
    {uuid: 'T001',   billNumber: 'S161206001',maintainType: '空调维修', state: '', reportMan: '已完成', reportTime: '2016/12/06 14:40'},
    {uuid: 'T001',   billNumber: 'S161206001',maintainType: '空调维修', state: '', reportMan: '已转移', reportTime: '2016/12/06 14:40'},
    {uuid: 'T001',   billNumber: 'S161206001',maintainType: '空调维修', state: '', reportMan: '未生效', reportTime: '2016/12/06 14:40'},
  ]
});*/

/*
 * 销售数据录入单
 */
var itemsPerPage = 10;
Ext.define('hdts.store.sales.Sales', {
  extend: 'Ext.data.Store',
	storeId: 'sales',
	model: 'hdts.model.sales.SalesModel',
	alias: 'store.sales',
	pageSize: itemsPerPage,
	proxy:{
        type:'ajax',
				startParam: '',
				limitParam: 'pageSize',
      	pageParam: 'page',
				headers: {'Content-Type': "application/json;charset=utf-8" },
				actionMethods:{read: 'POST'},
				paramsAsJson: true,
        url:'rest/ts/sales/query',
        reader:{
            type:'json',
            totalProperty:'data.recordCount',
            rootProperty:'data.records'
        }
    }
});
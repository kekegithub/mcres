/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：StatementStore
 * 模块说明：
 * 修改历史：
 * 2017/4/10 - lihuiming - 创建
 */
var itemsPerPage = 10;
Ext.define('hdts.store.statement.StatementStore', {
    extend: 'Ext.data.Store',
    storeId: 'statementstore',
    model: 'hdts.model.statement.StatementModel',
    alias: 'store.statementstore',
    proxy:{
        type:'ajax',
        startParam: '',
        limitParam: '',
        pageParam: '',
        headers: {'Content-Type': "application/json;charset=utf-8" },
        actionMethods:{read: 'POST'},
        paramsAsJson: true,
        url:'rest/ts/statement/query',
        reader:{
            type:'json',
            rootProperty:'data'
        }
    }
   /* data:[
        {uuid: 'T001',   payTotal: '161206001'},
        {uuid: 'T001',   payTotal: '161206001'},
        {uuid: 'T001',   payTotal: '161206001'},
        {uuid: 'T001',   payTotal: '161206001'},
        {uuid: 'T001',   payTotal: '161206001'},
        {uuid: 'T001',   payTotal: '161206001'},
    ]*/
});
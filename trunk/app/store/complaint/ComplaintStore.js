/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ComplaintStore
 * 模块说明：
 * 修改历史：
 * 2017/4/14 - lihuiming - 创建
 */
var itemsPerPage = 10;
Ext.define('hdts.store.complaint.ComplaintStore', {
    extend: 'Ext.data.Store',
    storeId: 'complaintstore',
    model: 'hdts.model.complaint.ComplaintModel',
    alias: 'store.complaintstore',
    pageSize: itemsPerPage,
    proxy:{
        type:'ajax',
        startParam: '',
        limitParam: 'pageSize',
        loading:false,
        pageParam: 'page',
        headers: {'Content-Type': "application/json;charset=utf-8" },
        actionMethods:{read: 'POST'},
        paramsAsJson: true,
        url:'rest/ts/complaint/query',
        reader:{
            type:'json',
            totalProperty:'data.recordCount',
            rootProperty:'data.records'
        }
    }
});

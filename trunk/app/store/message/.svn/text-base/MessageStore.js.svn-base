/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：MessageStore
 * 模块说明：
 * 修改历史：
 * 2017/3/30 - lihuiming - 创建
 */
var itemsPerPage = 10;
Ext.define('hdts.store.message.MessageStore', {
    extend: 'Ext.data.Store',
    storeId: 'messagestore',
    model: 'hdts.model.message.MessageModel',
    alias: 'store.messagestore',
    pageSize: itemsPerPage,
    proxy:{
        type:'ajax',
        // startParam: '',
        // limitParam: 'pageSize',
        //pageParam: 'page',
        headers: {'Content-Type': "application/json;charset=utf-8" },
        actionMethods:{read: 'GET'},
        paramsAsJson: true,
        url:'rest/ts/message/'+Ext.getStore('employee').getAt(0).get('user').code,
        //+Ext.getStore('employee').getAt(0).get('user').code
        reader:{
            type:'json',
            // totalProperty:'data.recordCount',
            rootProperty:'data'
        }
    }
});
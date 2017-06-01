/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：NoticeStore
 * 模块说明：
 * 修改历史：
 * 2017/3/30 - lihuiming - 创建
 */
var itemsPerPage = 10;
Ext.define('hdts.store.notice.NoticeStore', {
    extend: 'Ext.data.Store',
    storeId: 'noticestore',
    model: 'hdts.model.notice.NoticeModel',
    alias: 'store.noticestore',
    pageSize: itemsPerPage,
    proxy:{
        type:'ajax',
        startParam: '',
        limitParam: 'pageSize',
        pageParam: 'page',
        headers: {'Content-Type': "application/json;charset=utf-8" },
        actionMethods:{read: 'POST'},
        paramsAsJson: true,
        url:'rest/ts/notice/query',
        reader:{
            type:'json',
            totalProperty:'data.recordCount',
            rootProperty:'data.records'
        }
    }
});
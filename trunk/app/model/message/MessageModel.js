/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：MessageModel
 * 模块说明：
 * 修改历史：
 * 2017/3/30 - lihuiming - 创建
 */
Ext.define('hdts.model.message.MessageModel', {
    extend: 'Ext.data.Model',      //继承类

    config: {
        fields: [
            {name: 'uuid', type: 'string'},     //UUID
            {name: 'title', type: 'string'},     //标题
            {name: 'read', type: 'string'},      //
            {name: 'time', type: 'string'},      //日期
            {name: 'content', type: 'string'},      //简介
            {name: 'category', type: 'string'}      //
        ]
    }
});
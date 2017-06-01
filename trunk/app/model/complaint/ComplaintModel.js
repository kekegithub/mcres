/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ComplaintModel
 * 模块说明：
 * 修改历史：
 * 2017/4/14 - lihuiming - 创建
 */
Ext.define('hdts.model.complaint.ComplaintModel', {
    extend: 'Ext.data.Model',      //继承类
    config: {
        fields: [
            {name: 'uuid', type: 'string'},         //UUID
            {name: 'billNumber', type: 'string'},   //单号
            {name: 'complaintType', type: 'string'}, //投诉类型
            {name: 'state', type: 'string'},        //状态
            {name: 'complainantName', type: 'string'},    //投诉人人
            {name: 'happenTime', type: 'string'}   //投诉时间
        ]
    }
});
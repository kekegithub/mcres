/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ComplaintSearchModel
 * 模块说明：
 * 修改历史：
 * 2017/4/19 - lihuiming - 创建
 */
Ext.define('hdts.model.complaint.ComplaintSearchModel', {
    extend: 'Ext.data.Model',      //继承类
    config: {
        fields: [
            {name: 'uuid', type: 'string'},
            {name: 'code', type: 'string'},
            {name: 'name', type: 'string'}
        ]
    }
});

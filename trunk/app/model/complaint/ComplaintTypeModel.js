/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ComplaintTypeModel
 * 模块说明：
 * 修改历史：
 * 2017/4/19 - lihuiming - 创建
 */
Ext.define('hdts.model.complaint.ComplaintTypeModel', {
    extend: 'Ext.data.Model',      //继承类

    config: {
        fields: [
            {name: 'value', type: 'string'},  //类型
            {name: 'text', type: 'string'}    //类型
        ]
    }
});

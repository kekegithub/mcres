/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：StatementSubjectModel
 * 模块说明：
 * 修改历史：
 * 2017/4/13 - lihuiming - 创建
 */
Ext.define('hdts.model.statement.StatementSubjectModel', {
    extend: 'Ext.data.Model',      //继承类
    config: {
        fields: [
            {name: 'subject', type: 'string'},
            {name: 'beginDate', type: 'string'},
            {name: 'endDate', type: 'string'},    
            {name: 'payTotal', type: 'string'},      //应缴
            {name: 'payedTotal', type: 'string'},      //已缴
            {name: 'unpayedTotal', type: 'string'}     //未缴
        ]
    }
});

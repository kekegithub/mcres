/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：StatementModel
 * 模块说明：
 * 修改历史：
 * 2017/4/10 - lihuiming - 创建
 */
Ext.define('hdts.model.statement.StatementModel', {
    extend: 'Ext.data.Model',      //继承类
    config: {
        fields: [
           // {name: 'uuid', type: 'string'},     //UUID
            {name: 'payTotal', type: 'string'},     //应缴
            {name: 'payedTotal', type: 'string'},     //已缴
            {name: 'unpayedTotal', type: 'string'},      //未缴
           // {name: 'statementList', type: 'string'}    //结算周期名称sss
           /* {name: 'rangeName', type: 'string'},      //结算周期名称
            {name: 'rangeBegin', type: 'string'},      //结算周期开始日期
            {name: 'rangeEnd', type: 'string'},      //结算周期结束日期
            {name: 'subject', type: 'string'},      //科目名称
            {name: 'beginDate', type: 'string'},      //开始时间
            {name: 'endDate', type: 'string'},      //结束时间
            {name: 'payTotal', type: 'number'},      //应缴
            {name: 'payedTotal', type: 'number'},      //已缴
            {name: 'unpayedTotal', type: 'number'}     //未缴*/
        ]
    }
});
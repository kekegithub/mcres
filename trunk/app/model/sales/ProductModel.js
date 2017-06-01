/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ProductModel
 * 模块说明：销售商品
 * 修改历史：
 * 2017/4/21 - zhaolingling - 创建
 */
Ext.define('hdts.model.sales.ProductModel', {
    extend: 'Ext.data.Model',      //继承类
    config: {
        fields: [
            {name: 'uuid', type: 'string'},     //UUID
            {name: 'code', type: 'string'},     //编码
            {name: 'name', type: 'string'}      //产品名称

        ]
    }
});
/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：StatementService
 * 模块说明：
 * 修改历史：
 * 2017/4/12 - lihuiming - 创建
 */
Ext.define('hdts.service.statement.StatementService', {
    singleton: true,
    alternateClassName: 'StatementService',
    requires: [
        'hdts.service.common.Ajax'
    ],
    getStatement: function (params) {
        var json = {'statement': params.params.statement,'containCleanUpSubject':params.params.containCleanUpSubject};
        var url = 'ts/statement/load';
        HdtsAjax.request({
            url: url,
            method: 'POST',
            params: Ext.JSON.encode(json),
            success: function (ret) {
                if (params && params.success)
                    params.success(ret);
            },
            failure: function (msg) {
                console.log('获取对账单出错：' + msg);
                if (params && params.success)
                    params.failure(msg);
            }
        });
    },
});

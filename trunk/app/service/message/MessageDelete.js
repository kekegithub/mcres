/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：MessageDelete
 * 模块说明：
 * 修改历史：
 * 2017/4/5 - lihuiming - 创建
 */
Ext.define('hdts.service.message.MessageDelete', {
    singleton: true,
    alternateClassName: 'MessageDelete',
    requires: [
        'hdts.service.common.Ajax'
    ],
    messagedelete: function (params) {
        var json = {'ids': params.params.ids};
        //删除消息
        HdtsAjax.request({
            url:  'ts/message/delete/'+Ext.getStore('employee').getAt(0).get('user').code,
            method: 'POST',
            params: Ext.JSON.encode(json),
            success: function (ret) {
                if (params && params.success)
                    params.success(ret);
            },
            failure: function (msg) {
                if (params && params.success)
                    params.failure(msg);
            }
        });

    }
});
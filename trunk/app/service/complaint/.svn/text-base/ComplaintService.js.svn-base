/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ComplaintService
 * 模块说明：
 * 修改历史：
 * 2017/4/17 - lihuiming - 创建
 */
Ext.define('hdts.service.complaint.ComplaintService', {
    singleton: true,
    alternateClassName: 'ComplaintService',
    requires: [
        'hdts.service.common.Ajax',
        'hdts.model.complaint.ComplaintModel',
        'hdts.store.complaint.ComplaintStore'
    ],

    /**
     * 获得投诉单
     * @param params
     */
    getBill: function (params) {
        var url = 'ts/complaint/' + params.params.uuid;
        //验证登录信息
        HdtsAjax.request({
            url: url,
            method: 'GET',
            success: function (ret) {
                if (params && params.success)
                    params.success(ret);
            },
            failure: function (msg) {
                console.log('获取投诉单出错：' + msg);
                if (params && params.success)
                    params.failure(msg);
            }
        });

    },

    /**
     * 创建投诉单
     * @param params
     */
    create: function (params) {
        var json = {
            'sourceTenant': Ext.getStore('employee').getAt(0).get('tenant'),
            'complaintObject': params.params.complaintObject,
            "beComplainedContract": params.params.beComplainedContract,
            'contactInfo': params.params.contactInfo,
            'complaintContents': params.params.complaintContents,
         'complaintType': params.params.complaintType
        };
        //验证登录信息
        HdtsAjax.request({
            url: 'ts/complaint/create',
            method: 'POST',
            params: Ext.JSON.encode(json),
            success: function (ret) {
                if (params && params.success)
                    params.success(ret);
            },
            failure: function (msg) {
                console.log('创建投诉单出错：' + msg);
                if (params && params.success)
                    params.failure(msg);
            }
        });
    },

    getTypes: function (params) {
        var url = 'ts/complaint/types';
        //验证登录信息
        HdtsAjax.request({
            url: url,
            method: 'GET',
            success: function (ret) {
                if (params && params.success)
                    params.success(ret);
            },
            failure: function (msg) {
                console.log('获取投诉类型列表出错：' + msg);
                if (params && params.success)
                    params.failure(msg);
            }
        });

    }
});

/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：UserInfo
 * 模块说明：
 * 修改历史：
 * 2017/4/21 - lihuiming - 创建
 */
Ext.define('hdts.view.other.UserInfoMain', {
    extend: 'Ext.navigation.View',
    xtype: 'userinfomain',
    requires: ['hdts.view.other.UserInfoList'],
    config: {
        cls: 'hdnavigation-main',
        id: 'userinfomain',
        defaultBackButtonText: '',
        fullscreen: true,
        layout: {
            type: 'card',
            animation: null//侧滑效果
        },

        items: [
            {
                xtype: 'userinfolist'
            }
        ],
        navigationBar: {
            docked: 'top',
            cls: 'notice-main-titlebar-bottom',
            height: '45px',
            title:"123",
            items: [
                {
                    xtype: 'button',
                    itemId: 'button-back',
                    align: 'left',
                    iconCls: 'button-back-icon',
                    cls: 'button-back'
                }
            ]
        },

        control: {
            '#button-back': {
                tap: 'onButtonBackTap'
            }
        },

        listeners: {
            push: 'onPush',
            pop: 'onPop',
            forward: 'onForward'
        }
    },

    onPush: function (mainView, poppedView) {
        this.down('#button-back').hide();
    },

    onPop: function (mainView, poppedView) {
        if (this.down('#button-back')) {
            this.down('#button-back').show();
        }
    },

    onForward: function (target) {
        this.push(target);
    },

    initialize: function () {
        this.callParent(arguments);
    },

    onButtonBackTap: function (mainView, poppedView) {
        var appMain = Ext.getCmp('appMain');
        if (appMain) {
            this.hide();
            appMain.show();
        }
    }
});

/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：NoticeMain
 * 模块说明：
 * 修改历史：
 * 2017/3/21 - lihuiming - 创建
 */
Ext.define('hdts.view.notice.NoticeMain', {
    extend: 'Ext.navigation.View',
    xtype: 'notice-main',
    requires: ['hdts.view.notice.NoticeList'],
    config: {
        cls: 'notice-main',
        id: 'noticeMain',
        defaultBackButtonText: '',
        fullscreen: true,
        layout: {
            type: 'card',
            animation: null//侧滑效果
        },
        items: [{
            xtype: 'noticelist',
            cls: 'notice-list'
        }],
        navigationBar: {
            docked: 'top',
            cls: 'notice-main-titlebar-bottom',
            height: '50px',
            items: [
                {
                    xtype: 'button',
                    itemId: 'button-back',
                    align: 'left',
                    iconCls: 'button-back-icon',
                    cls: 'button-back'
                },
                {
                    xtype: 'button',
                    itemId: 'button-back-attach',
                    align: 'left',
                    hidden: true,
                    iconCls: 'button-back-icon',
                    cls: 'button-back-attach'
                },
                {
                    xtype: 'button',
                    itemId: 'button-download-icon',
                    align: 'right',
                    hidden: true,
                    iconCls: 'button-download-icon',
                    cls: 'button-download',
                    name: ''
                }
            ]
        },

        control: {
            '#button-back': {
                tap: 'onButtonBackTap'
            },
            '#button-download-icon': {
                tap: 'onButtonDownloadTap'
            },
            '#button-back-attach': {
                tap: 'onButtonAttachBackTap'
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
        if (poppedView.id === "noticeattach") {
            this.down('#button-back-attach').show();
            this.getNavigationBar().getBackButton().setHidden(true);
        }
    },

    onPop: function (mainView, poppedView) {
        if (poppedView.id === "noticedetail") {
            if (this.down('#button-back')) {
                this.down('#button-back').show();
            }
        } else if (poppedView.id === "noticeattach") {
            if (this.down('#button-back-attach')) {
                this.down('#button-back-attach').hide();
                this.down('#button-download-icon').hide();
            }
            Ext.getCmp('noticeMain').getNavigationBar().setCls("x-navigation-bar x-dock-item x-docked-top notice-main-titlebar-bottom");
        }
    },

    onForward: function (target) {
        if (target.xtype === "noticeattach") {
            this.down('#button-back-attach').show();
            this.down('#button-download-icon').show();
        }
        this.push(target);
    },

    initialize: function () {
        Ext.Viewport.setMasked(false);
        this.callParent(arguments);
    },

    onButtonBackTap: function (mainView, poppedView) {
        /* //Ext.defer(function () {
         Ext.Viewport.removeAll();
         Ext.Viewport.add(Ext.create('hdts.view.main.Main'));
         Ext.Viewport.setMasked(false);
         //}, 1);*/
        var appMain = Ext.getCmp('appMain');
        if (appMain) {
            this.hide();
            appMain.show();
        }
    },
    onButtonDownloadTap: function (list) {
        window.location.href = '' + list.name + '';
    },
    onButtonAttachBackTap:function (mainView, poppedView) {
        this.doPop();
    }
});

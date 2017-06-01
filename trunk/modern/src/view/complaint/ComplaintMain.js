/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ComplaintMain
 * 模块说明：
 * 修改历史：
 * 2017/4/14 - lihuiming - 创建
 */
Ext.define('hdts.view.complaint.ComplaintMain', {
    extend: 'Ext.navigation.View',
    xtype: 'complaintmain',

    requires: [
        'hdts.view.complaint.ComplaintList',
        'hdts.view.complaint.ComplaintInput'
    ],

    config: {
        id: 'complaintmain',
        itemId: 'complaintmain',
        cls: 'hdnavigation-main',
        fullscreen: true,
        loadMask: false,
        layout: {
            type: 'card',
            animation: null
        },
        defaultBackButtonText: '',
        items: [
            {
                xtype: 'complaintlist'
            }
        ],

        navigationBar: {
            docked: 'top',
            cls: 'hdnavbar-top',
            height: '45px',
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
                    itemId: 'button-new',
                    align: 'right',
                    text: '+',
                    cls : 'hdBtnNewBill'
                }
            ]
        },

        control: {
            '#button-back': {
                tap: 'onButtonBackTap'
            },
            '#button-new': {
                tap: 'onButtonNewTap'
            }
        },

        listeners: {
            push: 'onPush',
            pop: 'onPop',
            forward: 'onForward'
        }
    },

    onPush: function (mainView, pushedView) {
        this.down('#button-back').hide();

        if (pushedView.down("complaintlist")) {
            this.down('#button-new').show();
        } else {
            this.down('#button-new').hide();
        }
    },

    //弹出，即后退
    onPop: function (mainView, poppedView) {
        if (poppedView.id === "complaintsearch") {
            if (this.down('#button-back')) {
                this.down('#button-new').hide();
                this.down('#button-back').hide();
            }
        } else if (poppedView.id === "complaintinput") {
            if (this.down('#button-back')) {
                this.down('#button-back').show();
                this.down('#button-new').show();
            }
            Ext.getCmp('complaintlist').fireEvent('loadData');

        } else {
            if (this.down('#button-back')) {
                this.down('#button-back').show();
                this.down('#button-new').show();
            }
        }
    },

    //前进
    onForward: function (target) {
        this.push(target);
        /*if (target.xtype == "complaintdetail") {

            //此处用target不能触发loadData时间
            //target.fireEvent('loadData');
            Ext.getCmp('complaintdetail').fireEvent('loadData');
        }*/
    },

    initialize: function () {
        this.callParent(arguments);
    },

    onButtonBackTap: function () {
        var appMain = Ext.getCmp('appMain');
        if (appMain) {
            this.hide();
            appMain.show();
        }
    },

    onButtonNewTap: function () {
        this.fireEvent('forward', {
            xtype: 'complaintinput'
        });
    }
});

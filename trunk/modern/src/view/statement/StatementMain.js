/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：StateMent
 * 模块说明：
 * 修改历史：
 * 2017/4/6 - lihuiming - 创建
 */
Ext.define('hdts.view.statement.StatementMain', {
    extend: 'Ext.navigation.View',
    xtype: 'statement-main',
    requires: [
        'hdts.view.statement.StatementList'
    ],
    config: {
        id: 'statementMain',
        itemId: 'statementMain',
        cls: 'hdnavigation-main',
        fullscreen: true,
        layout: {
            type: 'card',
            animation: null
        },
        defaultBackButtonText: '',
        items: [
            {
                xtype: 'statementlist'
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

    onPush: function () {
        this.down('#button-back').hide();
    },

    //弹出，即后退
    onPop: function (mainView, poppedView) {
        if(poppedView.id == "statementdetail"){
            if (this.down('#button-back')) {
                this.down('#button-back').show();
            }
            if (this.down('#button-new')) {
                this.down('#button-new').show();
            }
        }
    },

    //前进
    onForward: function (target) {
        this.push(target)
    },

    initialize: function () {
        this.callParent(arguments);
    },

    onButtonBackTap: function () {
        /*Ext.defer(function () {
            Ext.Viewport.removeAll();
            Ext.Viewport.add(Ext.create('hdts.view.main.Main'));
        }, 1);*/
        var appMain = Ext.getCmp('appMain');
        if(appMain){
            this.hide();
            appMain.show();
        }
    }
});
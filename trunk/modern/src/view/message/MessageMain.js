/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：NoticeMain
 * 模块说明：
 * 修改历史：
 * 2017/3/30 - lihuiming - 创建
 */
Ext.define('hdts.view.message.MessageMain', {
    extend: 'Ext.navigation.View',
    xtype: 'message-main',
    requires: [
        'hdts.view.message.MessageList',
        'hdts.service.common.Common'
    ],
    config: {
        id: 'messageMain',
        itemId: 'messageMain',
        cls: 'message-main',
        fullscreen: true,
        layout: {
            type: 'card',
            animation: null
        },
        defaultBackButtonText: '',
        items: [
            {
                xtype: 'messagelist'
            }
        ],
        navigationBar: {
            docked: 'top',
            //cls: 'hdnavbar-top',
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
                    itemId: 'button-edit',
                    align: 'right',
                    text: '编辑',
                    cls: 'button-edit'
                }
            ]
        },

        control: {
            '#button-back': {
                tap: 'onButtonBackTap'
            },
            '#button-edit': {
                tap: 'onButtonEditTap'
            }, '#button-cancel': {
                tap: 'onButtonCancelTap'
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

    onPop: function (mainView, poppedView) {
        if (poppedView.id === "notice-detail") {
            if (this.down('#button-back')) {
                this.down('#button-back').show();
            }
        } else if (poppedView.id === "notice-attach") {
            if (this.down('#button-back')) {
                this.down('#button-download-icon').hide();
            }
        }
    },

    onForward: function (target) {
        if (target.xtype === "noticeattach") {
            this.down('#button-download-icon').show();
        }
        this.push(target);
    },

    initialize: function () {
        this.callParent(arguments);
    },

    /*返回按钮事件*/
    onButtonBackTap: function () {
        //Ext.defer(function () {
       /* Ext.Viewport.removeAll();
        Ext.Viewport.add(Ext.create('hdts.view.main.Main'));
        Ext.Viewport.setMasked(false);*/
        //}, 1);
        this.down('#button-edit').setText('编辑');
        Ext.getCmp('messagelist').down('#message-nav-bottom').hide();
        var appMain = Ext.getCmp('appMain');
        if(appMain){
            this.hide();
            appMain.show();
        }
    },
    /*编辑按钮事件*/
    onButtonEditTap: function () {
        var text = this.down('#button-edit').getText();
        /*list选择按钮*/
        var divListCheck = document.getElementsByClassName("message-div");
        /*底部栏全选按钮*/
        var divBottomCheck = document.getElementsByClassName("message-div-bottom");
        var divcontent = document.getElementsByClassName("table-second-fold");
        if (text === "编辑") {
            if (divListCheck.length <= 0) {
                return;
            }
            for (var i = 0; i < divcontent.length; i++) {
                if(Common.overLength(divcontent[i].innerText,'')){
                    divcontent[i].parentNode.parentNode.parentNode.childNodes[0].children[2].innerHTML='<td  colspan="2" class="table-third-content">展开消息</td>';
                }else {
                    divcontent[i].parentNode.parentNode.parentNode.childNodes[0].children[2].innerHTML='<td  colspan="2" class="table-third-content" style="padding-top: 0.1rem"></td>';
                }
            }
            this.down('#message-nav-bottom').show();
            this.down('#button-edit').setText('取消');
            divBottomCheck[0].className = 'message-div-bottom message-div-nocheck'
            for (var i = 0; i < divListCheck.length; i++) {
                divListCheck[i].className = 'message-div message-div-nocheck'
            }
        } else if (text === "取消") {
            this.down('#message-nav-bottom').hide();
            this.down('#button-edit').setText('编辑');
            divBottomCheck[0].className = 'message-div-bottom message-div-check'
            for (var i = 0; i < divListCheck.length; i++) {
                divListCheck[i].className = 'message-div message-div-nocheck message-div-hide'
            }
            for (var i = 0; i < divcontent.length; i++) {
                if(Common.overLength(divcontent[i].innerText,'full')){
                    divcontent[i].parentNode.parentNode.parentNode.childNodes[0].children[2].innerHTML='<td  colspan="2" class="table-third-content">展开消息</td>';
                }else {
                    divcontent[i].parentNode.parentNode.parentNode.childNodes[0].children[2].innerHTML='<td  colspan="2" class="table-third-content" style="padding-top: 0.1rem"></td>';
                }
            }
        }

    }
});

/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：Login
 * 模块说明：登录页面
 * 修改历史：
 * 2017/3/21 - zhuxiaofeng - 创建
 */
Ext.define('hdts.view.main.Main', {
    extend: 'Ext.Container',
    xtype: 'appmain',

    requires: [
        'hdts.view.sales.SalesMain',
        'hdts.store.sales.Sales',
        'hdts.view.maintain.MaintainMain',
        // 'hdts.store.maintain.MaintainStore',
        'hdts.service.home.HomeService',
        'hdts.view.notice.NoticeMain',
        'hdts.store.notice.NoticeStore',
        'hdts.service.common.Common',
        'hdts.view.message.MessageMain',
        'hdts.store.message.MessageStore',
        'hdts.view.statement.StatementMain',
        'hdts.store.statement.StatementStore',
        'hdts.service.maintain.MaintainService',
        'hdts.view.complaint.ComplaintMain',
        'hdts.store.complaint.ComplaintStore',
        'hdts.view.other.UserInfoMain'

    ],

    config: {
        id: 'appMain',
        layout: 'card',
        cls: 'app-main',
        items: [
            {
                xtype: 'container',
                cls: 'information',
                items: [
                    /*{
                     xtype: 'image',
                     cls: 'information-img',
                     itemId: 'authenticates'
                     },*/
                    {
                        xtype: 'button',
                        cls: 'information-img',
                        align: 'left',
                        itemId: 'authenticates'
                    },
                    {
                        xtype: 'label',
                        cls: 'information-headname',
                        html: 'TS-CRE'
                    },
                    {
                        xtype: 'label',
                        cls: 'information-title',
                        itemId: 'information-title',
                        html: '下午好'
                    },
                    {
                        xtype: 'label',
                        itemId: 'information-subtitle',
                        cls: 'information-subtitle',
                        html: ''
                    },
                    {
                        xtype: 'label',
                        cls: 'information-date',
                        itemId: 'information-date',
                        html: ''
                    }
                ]
            },
            {
                xtype: 'container',
                cls: 'message',
                layout: 'vbox',
                title: '',
                items: [
                    {
                        xtype: 'button',
                        cls: 'task-button',
                        itemId: 'task-button',
                        flex: 1,
                        align: 'left',
                        iconCls: 'task-icon',
                        text: "待办事项<span class='text-span'>17</span>"
                    },
                    {
                        xtype: 'button',
                        cls: 'notice-button',
                        itemId: 'notice-button',
                        flex: 1,
                        align: 'left',
                        iconCls: 'notice-icon',
                        text: "系统公告<span class='text-span'>20</span>"
                    }
                ]
            },
            {
                xtype: 'container',
                cls: 'funtion-bar',
                layout: 'vbox',
                title: '',
                items: [
                    {
                        xtype: 'container',
                        cls: 'menu-first-row',
                        flex: 1,
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                cls: 'message-button',
                                itemId: 'message-button',
                                flex: 1,
                                align: 'top',
                                iconCls: 'message-icon',
                                iconAlign: 'top',
                                text: "消息通知"
                            },
                            {
                                xtype: 'button',
                                cls: 'maintain-button',
                                itemId: 'maintain-button',
                                flex: 1,
                                align: 'top',
                                iconCls: 'maintain-icon',
                                iconAlign: 'top',
                                text: "工程报修"
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'menu-second-row',
                        flex: 1,
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                cls: 'complaint-button',
                                itemId: 'complaint-button',
                                flex: 1,
                                align: 'top',
                                iconCls: 'complaint-icon',
                                iconAlign: 'top',
                                text: "投诉建议"
                            },
                            {
                                xtype: 'button',
                                cls: 'sales-button',
                                itemId: 'sales-button',
                                flex: 1,
                                align: 'top',
                                iconCls: 'sales-icon',
                                iconAlign: 'top',
                                text: "销售录入"
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'menu-third-row',
                        flex: 1,
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                cls: 'statement-button',
                                itemId: 'statement-button',
                                flex: 1,
                                align: 'top',
                                iconCls: 'statement-icon',
                                iconAlign: 'top',
                                text: "商户对账"
                            },
                            {
                                xtype: 'button',
                                cls: 'notice-button',
                                flex: 1,
                                text: ""
                            }
                        ]
                    }
                ]
            }
        ],

        control: {
            '#task-button': {
                tap: 'onTaskButtonTap'
            },
            '#notice-button': {
                tap: 'onNoticeButtonTap'
            },
            '#maintain-button': {
                tap: 'onMaintainButtonTap'
            },
            '#sales-button': {
                tap: 'onSalesButtonTap'
            },
            '#message-button': {
                tap: 'onMessageButtonTap'
            },
            '#statement-button': {
                tap: 'onStatementButtonTap'
            },
            '#complaint-button': {
                tap: 'onComplainButtonTap'
            },
            '#authenticates': {
                tap: 'onUserInfoTap'
            }
        }
    },

    initialize: function () {
        var me = this;
        me.callParent(arguments);
        var aWeek = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        var date = Ext.Date.format(new Date(), 'm月d日') + '，' + aWeek[new Date().getDay()];
        me.down('#information-date').setHtml('今天是' + date);
        var employee = Ext.getStore('employee').getAt(0);
        var hour = Ext.Date.format(new Date(), 'H');
        if (hour >= 6 && hour < 12) {
            me.down('#information-title').setHtml('上午好-' + employee.get('user').name);
        } else if (hour >= 12 && hour < 19) {
            me.down('#information-title').setHtml('下午好');
        } else {
            me.down('#information-title').setHtml('晚上好');
        }

        me.down('#information-subtitle').setHtml(employee.get('store').name + '-' + employee.get('contract').name);

        //待办事项、系统公告，更新值
        HomeService.getUnReadMessage({
            success: function (ret) {
                var sortinfo = ret.data;
                var recordCount = "";
                if (sortinfo != null) {
                    for (var i = 0, len = sortinfo.length; i < len; i++) {
                        recordCount = sortinfo[i].recordCount;
                        if(recordCount == 0)
                            recordCount = "";
                        if (sortinfo[i].type === "unread_execute") {
                            me.down('#task-button').setText("待办事项<span class='text-span'>" + recordCount + "</span>");
                        } else if (sortinfo[i].type === "unread_notice") {
                            me.down('#notice-button').setText("系统公告<span class='text-span'>" + recordCount + "</span>");
                        } else if (sortinfo[i].type === "unread_message") {
                            me.down('#message-button').setText("消息通知<span class='badge'></span>");
                        }
                        else if (sortinfo[i].type === "unread_maintain") {
                            me.down('#maintain-button').setText("工程报修<span class='badge'></span>");
                        }
                        else if (sortinfo[i].type === "unread_complaint") {
                            me.down('#complaint-button').setText("投诉建议<span class='badge'></span>");
                        }
                        else if (sortinfo[i].type === "unread_sales") {
                            me.down('#sales-button').setText("销售录入<span class='badge'></span>");
                        }
                        else if (sortinfo[i].type === "unread_statement") {
                            me.down('#statement-button').setText("商户对账<span class='badge'></span>");
                        }
                    }
                    //me.down('#task-button').setText("待办事项<span class='text-span'>17</span>");
                }
            },
            failure: function (ret) {
                MsgTip.remove();
                MsgTip.msg(ret);
            }
        })

    },

    onTaskButtonTap: function () {
        /*    Ext.Viewport.setMasked({
         xtype: 'loadmask',
         message: '数据请求中...'
         });
         Ext.defer(function () {
         Ext.Viewport.removeAll();
         Ext.Viewport.add(Ext.create('hdts.view.task.TaskMain'));
         Ext.Viewport.setMasked(false);
         }, 1);*/

        // MsgTip.msg('加载中', 'load');

        //显示报修列表页面
        var taskmain = Ext.getCmp('taskmain');
        if (taskmain == null || taskmain == "undefined") {
            taskmain = Ext.create('hdts.view.task.TaskMain');
            Ext.Viewport.add(taskmain);
        }
        this.hide();
        taskmain.show();
        // MsgTip.remove();
    },

    onMaintainButtonTap: function () {
        // MsgTip.msg('加载中', 'load');

        //这是加载报修列表数据的代码，放在MaintainList.initialize中会不显示数据，所以移到这地方了
        MaintainService.loadMaintainListData({
            params: {
                'state': "all",
                'range': "one week",
                'maintainType': "all"
            }
        });

        //显示报修列表页面
        var maintainMain = Ext.getCmp('maintainMain');
        if (maintainMain == null || maintainMain == "undefined") {
            maintainMain = Ext.create('hdts.view.maintain.MaintainMain');
            Ext.Viewport.add(maintainMain);
        }
        this.hide();
        maintainMain.show();

        // MsgTip.remove();
    },

    onSalesButtonTap: function () {
        // MsgTip.msg('加载中', 'load');
        /*		if(typeof(Ext.getStore('sales')) == "undefined"){
         Ext.create('hdts.store.sales.Sales');
         }
         var store = Ext.getStore('sales');
         store.proxy.extraParams = {page: 0};
         var params = {"state": "all", "range": "1年"};
         params.contractUuid = Ext.getStore('employee').getAt(0).get('contract').uuid;
         Ext.apply(store.proxy.extraParams, params);
         store.load();
         Ext.defer(function () {
         Ext.Viewport.removeAll();
         Ext.Viewport.add(Ext.create('hdts.view.sales.SalesMain'));
         MsgTip.remove();
         }, 1);
         */
        //显示报修列表页面
        var salesmain = Ext.getCmp('salesmain');
        if (salesmain == null || salesmain == "undefined") {
            salesmain = Ext.create('hdts.view.sales.SalesMain');
            Ext.Viewport.add(salesmain);
        }
        this.hide();
        salesmain.show();
        // MsgTip.remove();
    },

    onNoticeButtonTap: function () {
        console.log('On Notice Button Tap');
        if (typeof(Ext.getStore('noticestore')) == "undefined") {
            Ext.create('hdts.store.notice.NoticeStore');
        }
        var store = Ext.getStore('noticestore');
        store.proxy.extraParams = {page: 0};
        //Ext.apply(store.proxy.extraParams, params);

        /*调用common中日期格式转换函数 参数（store，日期参数名）*/
        Common.dateConversion(store, 'publishTime');

        /*Ext.defer(function () {
         Ext.Viewport.removeAll();
         Ext.Viewport.add(Ext.create('hdts.view.notice.NoticeMain'));
         MsgTip.remove();
         }, 1);*/
        var noticeMain = Ext.getCmp('noticeMain');
        if (noticeMain == null || noticeMain == "undefined") {
            noticeMain = Ext.create('hdts.view.notice.NoticeMain');
            Ext.Viewport.add(noticeMain);
        }
        this.hide();
        noticeMain.show();
    },

    onMessageButtonTap: function () {
        console.log('On Message Button Tap');
        if (typeof(Ext.getStore('messagestore')) == "undefined") {
            Ext.create('hdts.store.message.MessageStore');
        }
        var store = Ext.getStore('messagestore');
        /*调用common中日期格式转换函数 参数（store，日期参数名）*/
        Common.dateConversion(store, 'time');
        var messageMain = Ext.getCmp('messageMain');
        if (messageMain == null || messageMain == "undefined") {
            messageMain = Ext.create('hdts.view.message.MessageMain');
            Ext.Viewport.add(messageMain);
        }
        this.hide();
        messageMain.show();
    },

    onStatementButtonTap: function () {
        console.log("On Statement Button Tap");
        var statementMain = Ext.getCmp('statementMain');
        if (statementMain == null || statementMain == "undefined") {
            statementMain = Ext.create('hdts.view.statement.StatementMain');
            Ext.Viewport.add(statementMain);
        }
        this.hide();
        statementMain.show();
        //MsgTip.remove();
    },
    onComplainButtonTap: function () {
        var complaintmain = Ext.getCmp('complaintmain');
        if (complaintmain == null || complaintmain == "undefined") {
            complaintmain = Ext.create('hdts.view.complaint.ComplaintMain');
            Ext.Viewport.add(complaintmain);
        }
        this.hide();
        complaintmain.show();
    },
    onUserInfoTap: function () {
        var userinfomain = Ext.getCmp('userinfomain');
        if (userinfomain == null || userinfomain == "undefined") {
            userinfomain = Ext.create('hdts.view.other.UserInfoMain');
            Ext.Viewport.add(userinfomain);
        }
        this.hide();
        userinfomain.show();
    }
});

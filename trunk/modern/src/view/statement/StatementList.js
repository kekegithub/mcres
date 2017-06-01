/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：StatementList
 * 模块说明：
 * 修改历史：
 * 2017/4/6 - lihuiming - 创建
 */
Ext.define('hdts.view.statement.StatementList', {
    extend: 'Ext.Container',
    alias: 'widget.statementlist',
    requires: [
        'Ext.Container',
        'Ext.Panel',
        'Ext.plugin.ListPaging',
        'UX.date.MonthPickerField',
        'Ext.field.DatePicker',
        'UX.date.DatePickerField',
        'hdts.model.statement.StatementListModel',
        'hdts.service.common.Common',
        'Ext.field.Select'
    ],
    config: {
        id: 'statementlist',
        title: '对账',
        cls: 'hdcontainer-list statement-list',
        layout: 'vbox',
        items: [
            {
                xtype: 'component',
                cls: 'hdspaceWhite'
            },
            {
                xtype: 'container',
                layout: 'hbox',
                cls: 'hdcontainer-filter hdcontainer-nobottom',
                items: [
                    {
                        xtype: 'hdmonthpickerfield',
                        cls: 'date-select date-down',
                        itemId: 'date-select-begin',
                        flex: 1,
                        dateFormat: 'Y/m',
                        value: new Date(),
                        picker: {
                            scrollable: false,
                            //days: 2,
                            doneButton: {text: '确认', cls: 'done-button'},
                            cancelButton: {text: '取消', cls: 'canel-button'},
                            toolbar: {
                                ui: 'light',
                                cls: 'toolbar',
                                title: '选择录入年月'
                            }
                        }
                    },
                    {
                        xtype: 'label',
                        cls: 'hdcontainer-list-space'
                    },
                    {
                        xtype: 'hdmonthpickerfield',
                        cls: 'date-select date-down',
                        itemId: 'date-select-end',
                        dateFormat: 'Y/m',
                        value: new Date(),
                        flex: 1,
                        picker: {
                            scrollable: false,
                            //days: 2,
                            doneButton: {text: '确认', cls: 'done-button'},
                            cancelButton: {text: '取消', cls: 'canel-button'},
                            toolbar: {
                                ui: 'light',
                                cls: 'toolbar',
                                title: '选择录入年月'
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'component',
                cls: 'hdspace'
            },
            {
                xtype: 'container',
                layout: 'vbox',
                itemId: 'statement-statusbar',
                cls: 'hdcontainer-statement hdcontainer-statement-pay',
                items: [
                    {
                        xtype: 'label',
                        flex: 1,
                        itemId: 'statement-congratulate',
                        cls: 'hdlabel-billCongratulate',
                        html: ''
                    },
                    {
                        xtype: 'label',
                        flex: 2,
                        itemId: 'statement-complete',
                        cls: 'hdlabel-billComplete',
                        html: ''
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                cls: 'hdcontainer-nav-third',
                items: [
                    {
                        xtype: 'label',
                        flex: 1,
                        cls: 'statement-receivable',
                        itemId: 'statement-receivable',
                        html: ''
                    },
                    {
                        xtype: 'label',
                        flex: 1,
                        cls: 'statement-revenue',
                        itemId: 'statement-revenue',
                        html: ''
                    }
                ]
            },
            {
                xtype: 'component',
                cls: 'hdspace'
            },
            {
                xtype: 'container',
                layout: 'hbox',
                cls: 'hdcontainer-filter',
                items: [
                    {
                        xtype: 'label',
                        flex: 5,
                        cls: 'statement-information',
                        html: '显示缴清账单'
                    },
                    {
                        xtype: 'togglefield',
                        itemId: 'statement-toggle',
                        flex: 1,
                        value: 1,
                        cls: 'hdcontainer-toggle',
                        name: 'toggle',
                        listeners: {
                            change: function (field, newValue, oldValue) {
                                var me = Ext.getCmp('statementlist');
                                var beginSettle = Ext.util.Format.date(me.down('#date-select-begin').getValue(), 'Ym');
                                var endSettle = Ext.util.Format.date(me.down('#date-select-end').getValue(), 'Ym');
                                me.storeload(me, beginSettle, endSettle, newValue);
                            }
                        }
                    }
                ]
            },
            {
                cls: 'hdlist',
                flex: 49,
                layout: 'vbox',
                itemId: 'hdlist',
                items: [
                    {
                        itemId: 'listTplTable',
                        xtype: 'list',
                        height: '100%',
                        width: '100%',
                        cls: 'statement-list',
                        store: '',
                        itemTpl: new Ext.XTemplate(
                            '<div style="display:flex;flex-direction:column;align-items:left;">',
                            '<div class="statement-div-year" >{settle}</div>',
                            '<tpl for="ranges">',
                            '<div class="statement-div-cycle" >{rangeName}：{[Common.dateTransposition(values.rangeBegin)]}-{[Common.dateTransposition(values.rangeEnd)]}</div>',
                            '</tpl>',
                            '<div style="display:flex;flex-direction:row;align-items:left;flex-wrap:wrap;width: 100%">',
                            '<div class="statement-div-should">应缴：{[Common.toLocaleString(values.payTotal)]}</div>',
                            '<tpl if="this.isTrue(unpayedTotal)">',
                            '<div class="statement-div-real">未缴：<span style="color:#e75c37">{[Common.toLocaleString(values.unpayedTotal)]}</span></div>',
                            '<tpl else>',
                            '<div class="statement-div-real">未缴：<span style="color:#64b3f1">{unpayedTotal}</span></div>',
                            '</tpl>',
                            '<div class="statement-div-not" >实缴：{[Common.toLocaleString(values.payedTotal)]}</div>',
                            '</div>',
                            '</div>',
                            {
                                isTrue: function (total) {
                                    if (total > 0) {
                                        return true;
                                    }
                                    return false;
                                }/*,
                                toLocaleString: function (total) {
                                    return parseFloat(total).toLocaleString();
                                }*/
                            }
                        )
                    }
                ]
            }
        ],

        bubbleEvents: ['forward'],
        control: {
            '#listTplTable': {
                itemtap: 'onListItemTap'
            },
            '#date-select-begin': {
                change: 'changeTimeBegin'
            },
            '#date-select-end': {
                change: 'changeTimeEnd'
            }
        }
    },

    initialize: function () {
        this.callParent(arguments);
        var beginSettle = Ext.util.Format.date(new Date(), 'Ym');
        var endSettle = Ext.util.Format.date(new Date(), 'Ym');
        this.storeload(this, beginSettle, endSettle, true);
        /*var   num_s = "1232134456.546 ";
        alert(parseFloat(num_s).toLocaleString());*/
    },

    onListItemTap: function (list, index, target, record) {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '数据请求中...'
        });
        //Ext.defer(function () {
        Ext.getCmp('statementMain').fireEvent('forward', {
            xtype: 'statementdetail',
            uuid: record.data.uuid,
            settle: record.data.settle
        });
        Ext.Viewport.setMasked(false);
    },
    storeload: function (me, beginSettle, endSettle, containCleanUpStatement) {
        MsgTip.msg('加载中', 'load');
        if (typeof(Ext.getStore('statementstore')) == "undefined") {
            Ext.create('hdts.store.statement.StatementStore');
        }
        var store = Ext.getStore('statementstore');
        var params = {
            "beginSettle": beginSettle,
            "endSettle": endSettle,
            "containCleanUpStatement": containCleanUpStatement
        };
        //var params = {"state": "all", "range": "one month"};
        params.contract = Ext.getStore('employee').getAt(0).get('contract').uuid;
        //params.contract = "2c918cf15889c88f0158900c21ec010b";
        Ext.apply(store.proxy.extraParams, params);
        store.load({ callback: function (records, options, success) {
           
                var statementList = store.getAt(0).get('statementList');
                var unpayedTotal = store.getAt(0).get('unpayedTotal');
                if (unpayedTotal === 0) {
                    me.down('#statement-congratulate').setHtml('恭喜你');
                    me.down('#statement-complete').setHtml('账单已缴清');
                    me.down('#statement-statusbar').className = 'hdcontainer-statement hdcontainer-statement-pay';
                } else if (unpayedTotal > 0) {
                    me.down('#statement-congratulate').setHtml('未缴金额额（元）');
                    me.down('#statement-complete').setHtml(Common.toLocaleString(unpayedTotal));
                    me.down('#statement-statusbar').className = 'hdcontainer-statement hdcontainer-statement-nopay';
                }
                me.down('#statement-receivable').setHtml('应缴金额（元）<br/><span style="color:#696e72">' +Common.toLocaleString(store.getAt(0).get('payTotal'))+ '</span>');
                me.down('#statement-revenue').setHtml('实缴金额（元）<br/><span style="color:#696e72">' + Common.toLocaleString(store.getAt(0).get('payedTotal'))+ '</span>');

                //将数据statementList加入到新的store中
                var statementListStore = Ext.create('Ext.data.Store', {
                    model: 'hdts.model.statement.StatementListModel',
                    data: statementList
                });
                me.down('#listTplTable').setStore(statementListStore);
            }
        });
        MsgTip.remove();
    },
    changeTimeBegin: function () {
        var me = Ext.getCmp('statementlist');
        var beginSettle = Ext.util.Format.date(me.down('#date-select-begin').getValue(), 'Ym');
        var endSettle = Ext.util.Format.date(me.down('#date-select-end').getValue(), 'Ym');
        if (Common.dateCompare(me.down('#date-select-begin').getValue(), me.down('#date-select-end').getValue())) {
            var toggle = me.down('#statement-toggle').getValue();
            me.storeload(me, beginSettle, endSettle, toggle);
        }
    },
    changeTimeEnd: function () {
        var me = Ext.getCmp('statementlist');
        var beginSettle = Ext.Date.format(me.down('#date-select-begin').getValue(), 'Ym');
        var endSettle = Ext.Date.format(me.down('#date-select-end').getValue(), 'Ym');
        if (Common.dateCompare(me.down('#date-select-begin').getValue(), me.down('#date-select-end').getValue())) {
            var toggle = me.down('#statement-toggle').getValue();
            me.storeload(me, beginSettle, endSettle, toggle);
        }
    }
});

/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ComplaintList
 * 模块说明：
 * 修改历史：
 * 2017/4/14 - lihuiming - 创建
 */
Ext.define('hdts.view.complaint.ComplaintList', {
    extend: 'Ext.Container',
    alias: 'widget.complaintlist',
    requires: [
        'Ext.Container',
        'Ext.Panel',
        'Ext.plugin.ListPaging',
        'UX.select.SelectField',
        'UX.select.SelectNewField',
        'hdts.service.common.Common',
        'hdts.model.complaint.ComplaintTypeModel',
        'hdts.store.complaint.ComplaintTypeStore',
        'hdts.store.complaint.ComplaintStore'
    ],
    config: {
        id: 'complaintlist',
        itemId: 'complaintlist',
        title: '投诉建议',
        cls: 'hdcontainer-list',
        loadMask: false,
        layout: 'vbox',
        items: [
            {
                xtype: 'component',
                cls: 'hdspaceWhite'
            },
            {
                xtype: 'container',
                layout: 'hbox',
                cls: 'hdcontainer-filter',
                itemId: 'maintainFilter',
                items: [
                    {
                        xtype: 'hdselectfield',
                        itemId: 'filterDateRange',
                        cls: 'date-select',
                        flex: 1,
                        options: [
                            {
                                text: '最近一周',
                                value: 'one week'
                            }, {
                                text: '最近一月',
                                value: 'one month'
                            }, {
                                text: '最近三月',
                                value: 'three month'
                            }, {
                                text: '最近半年',
                                value: 'six month'
                            }, {
                                text: '最近一年',
                                value: 'one year'
                            }
                        ]
                    },
                    {
                        xtype: 'label',
                        cls: 'hdcontainer-list-space'
                    },
                    {
                        xtype: 'hdselectfield',
                        itemId: 'filterType',
                        cls: 'status-select',
                        flex: 1,
                        store: ''
                    },
                    {
                        xtype: 'label',
                        cls: 'hdcontainer-list-space'
                    },
                    {
                        xtype: 'hdselectfield',
                        itemId: 'filterState',
                        cls: 'status-select',
                        flex: 1,
                        options: [
                            {
                                text: '全部状态',
                                value: 'all'
                            },
                            {
                                text: '未生效',
                                value: 'ineffect'
                            },
                            {
                                text: '处理中',
                                value: 'handling'
                            },
                            {
                                text: '已解决',
                                value: 'solved'
                            },
                            {
                                text: '已完成',
                                value: 'finished'
                            },
                            {
                                text: '已作废',
                                value: 'aborted'
                            }
                        ]
                    }

                ]
            },
            {
                xtype: 'component',
                cls: 'hdspace'
            },
            {
                cls: 'hdlist',
                flex: 49,
                layout: 'vbox',
                items: [
                    {
                        itemId: 'listTplTable',
                        xtype: 'list',
                        height: '100%',
                        loading:false,
                        cls: 'hd-list',
                        store: '',
                        itemTpl: new Ext.XTemplate(
                            '<div style="display:flex;flex-direction:column;align-items:left;">',
                            '<div style="display:flex;flex-direction:row;flex-wrap:wrap;width: 100%">',
                            '<div class="hd-list-title {[Common.judgmentState(values.state)]}">{complaintType}</div>',
                            '<div class="hd-list-status">{state}</div>',
                            '</div>',
                            '<tpl if="this.isMarket(complaintObject)">',
                            '<tpl for="beComplainedContract">',
                            '<div class="hd-list-object">投诉对象：{name}</div>',
                            '</tpl>',
                            '<tpl else>',
                            '<div class="hd-list-object">投诉对象：商城</div>',
                            '</tpl>',
                            '<div class="hd-list-time" >投诉时间：{happenTime}</div>',
                            '<div class="hd-list-number" >单号：{billNumber}</div>',
                            '</div>',
                            {
                                isMarket: function (name) {
                                    if (name === "market") {
                                        return false;
                                    }
                                    return true;
                                }
                            }
                        ),
                        plugins: [
                            {
                                xclass: 'Ext.plugin.ListPaging',
                                autoPaging: true,                     //设置成true将自动触发
                                loadMoreText: '更多',
                                noMoreRecordsText: ''
                            }
                        ]

                    }
                ]
            }
        ],

        bubbleEvents: ['forward'],
        control: {
            '#listTplTable': {
                itemtap: 'onListItemTap'
            },
            '#filterDateRange': {
                change: 'reloadListDateRange'
            },
            '#filterState': {
                change: 'reloadListDataState'
            },
            '#filterType': {
                change: 'reloadListDataType'
            }
        },
        listeners: {
            loadData: 'storeload'
        }
    },

    initialize: function () {
        this.callParent(arguments);
        this.addComplaintTypeSelect(this);
        this.storeload();
    },

    onListItemTap: function (list, index, target, record) {
        Ext.getCmp('complaintmain').fireEvent('forward', {
            xtype: 'complaintdetail',
            billUuid: record.data.uuid
        });
    },

    /**
     * 查询条件改变，重新刷新列表
     */
    reloadListDateRange: function () {
        this.storeload();
    },
    reloadListDataState: function () {
        this.storeload();
    },
    reloadListDataType: function () {
        this.storeload();
    },
    /**
     * 添加投诉类型下拉框组件
     * @param me
     */
    addComplaintTypeSelect: function (me) {
        ComplaintService.getTypes({
            success: function (ret) {
                var types = ret.data;

                if (typeof(Ext.getStore('complainttypestore')) == "undefined") {
                    Ext.create('hdts.store.complaint.ComplaintTypeStore');
                }
                var myStore = Ext.create('hdts.store.complaint.ComplaintTypeStore');

                myStore.add({value: "all", text: "全部"});
                for (var i = 0; i < types.length; i++) {
                    myStore.add({value: types[i], text: types[i]});
                }
                me.down('#filterType').setStore(myStore);
            },
            failure: function (ret) {
                console.dir(ret);
            }
        });
    },
    storeload: function () {
        // MsgTip.msg('加载中', 'load');
        var range = this.down("#filterDateRange").getValue();
        var state = this.down("#filterState").getValue();
        var type = this.down("#filterType").getValue();
        var params = {
            'contract': Ext.getStore('employee').getAt(0).get('contract').uuid,
            'range': range,
            'category': type,
            'state': state
        };

        //投诉列表
        if (typeof(Ext.getStore('complaintstore')) == "undefined") {
            Ext.create('hdts.store.complaint.ComplaintStore');
        }
        var store = Ext.getStore('complaintstore');
        store.proxy.extraParams = {page: 0};
        Ext.apply(store.proxy.extraParams, params);

        store.load(
            {
                loadMask: false,
                callback: function (records, options, success) {

                    var stime;
                    for (var i = 0; i < store.getCount(); i++) {  //getCount() 方法 获取 数据集 的长度
                        stime = new Date(store.getAt(i).get('happenTime'));  //遍历数据集，获取 publishTime 的数据
                        store.getAt(i).set('happenTime', Ext.Date.format(stime, 'Y/m/d H:i'));
                        var state = store.getAt(i).get('state');
                        //状态
                        if (state === "ineffect")
                            store.getAt(i).set('state', "<span class='ineffect-img'></span><span class='ineffect-txt'>&nbsp;&nbsp;未生效</span>");
                        else if (state === "repairing")
                            store.getAt(i).set('state', "<span class='repairing-img'></span><span class='repairing-txt'>&nbsp;&nbsp;处理中</span>");
                        else if (state === "solved")
                            store.getAt(i).set('state', "<span class='solved-img'></span><span class='solved-txt'>&nbsp;&nbsp;已解决</span>");
                        else if (state === "finished")
                            store.getAt(i).set('state', "<span class='finished-img'></span><span class='finished-txt'>&nbsp;&nbsp;已完成</span>");
                        else if (state === "aborted")
                            store.getAt(i).set('state', "<span class='aborted-img'></span><span class='aborted-txt'>&nbsp;&nbsp;已作废</span>");
                    }
                }
            });
        this.down('#listTplTable').setStore(store);
        // MsgTip.remove();
    }
});
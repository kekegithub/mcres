/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ComplaintSearch
 * 模块说明：
 * 修改历史：
 * 2017/4/18 - lihuiming - 创建
 */
Ext.define('hdts.view.complaint.ComplaintSearch', {
    extend: 'Ext.Container',
    xtype: 'complaintsearch',
    requires: ['hdts.store.complaint.ComplaintSearchStore'],
    config: {
        title: '选择商户',
        layout: 'vbox',
        itemList: '',
        cls: 'ContractDtlMian',
        id: 'complaintsearch',
        itemId: 'complaintsearch',
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                cls: 'hdinput-toolbar',
                items: [
                    {
                        xtype: 'searchfield',
                        itemId: 'hdinput-searchfield',
                        placeHolder: '输入关键字进行搜索',
                        flex: 10,
                        name: 'searchfield'
                    },
                    {
                        xtype: 'button',
                        itemId: 'button-search',
                        cls: 'hdinput-toolbar-search',
                        flex: 1,
                        text: '搜索'
                    }
                ]
            },
            {
                itemId: 'list',
                xtype: 'list',
                height: '100%',
                width: '100%',
                store: '',
                cls: 'hd-list',
                itemTpl: [
                    '<div class="hd-list-html">{name}</div>'
                ],
                plugins: [{
                    xclass: 'Ext.plugin.ListPaging',
                    autoPaging: true,
                    loadMoreText: '',
                    noMoreRecordsText: ''
                }]

            }
        ],
        control: {
            '#contractselector': {
                activetabchange: 'onContractSelectorChange'
            },
            '#list': {
                itemtap: 'onListItemTap'
            },
            '#button-search': {
                tap: 'onSearchButtonTap'
            }
        }
    },

    initialize: function () {
        this.storeLoad();
    },
    onListItemTap: function (list, index, target, record) {
        var complaintinput = Ext.getCmp('complaintinput');
        complaintinput.down("#complainticon").setText(record.data.name);
        complaintinput.setBeComplainedContract(record.data.uuid,record.data.code,record.data.name);
        this.destroy();
    },
    onSearchButtonTap: function () {
        var search = this.down("#hdinput-searchfield").getValue();
        if (search == "" || search == null)
            return;
        if (typeof(Ext.getStore('complaintsearchstore')) == "undefined") {
            Ext.create('hdts.store.complaint.ComplaintSearchStore');
        }
        var store = Ext.getStore('complaintsearchstore');
        store.proxy.extraParams = {page: 0};
        var params = {
            "keyWords": search
        };
        Ext.apply(store.proxy.extraParams, params);
        store.load();
        this.down('#list').setStore(store);
    },
    storeLoad: function () {
        if (typeof(Ext.getStore('complaintsearchstore')) == "undefined") {
            Ext.create('hdts.store.complaint.ComplaintSearchStore');
        }
        var store = Ext.getStore('complaintsearchstore');
        store.proxy.extraParams = {page: 0};
        store.load();
        this.down('#list').setStore(store);
    }
});

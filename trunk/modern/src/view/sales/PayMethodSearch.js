/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：PayMethodSearch
 * 模块说明：支付方式搜索
 * 修改历史：
 * 2017/4/21 - zhaolingling - 创建
 */
Ext.define('hdts.view.sales.PayMethodSearch', {
    extend: 'Ext.Container',
    xtype: 'paymethodsearch',
    requires: [
        'hdts.store.payment.PayMethodStore',
        'hdts.service.sales.SalesService'
    ],
    saleDate: null,
    payMethodStore: null,
    config: {
        title: '选择支付方式',
        layout: 'vbox',
        itemList: '',
        cls: 'ContractDtlMian',
        id: 'paymethodsearch',
        itemId: 'paymethodsearch',
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
                        itemId: 'btnSearch',
                        cls: 'hdinput-toolbar-search',
                        flex: 1,
                        text: '搜索'
                    }
                ]
            },
            {
                itemId: 'listPayMethod',
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
            '#listPayMethod': {
                itemtap: 'onListItemTap'
            },
            '#btnSearch': {
                tap: 'onBtnSearchTap'
            }
        }
    },

    initialize: function () {
        this.addPayMethods(this);
    },
    onListItemTap: function (list, index, target, record) {
        var salesBill = Ext.getCmp('salesbillform');
        salesBill.down("#btnPayMethod").setText(record.data.name);
        salesBill.addPayMethod(record.data.uuid, record.data.code, record.data.name);
        
        this.destroy();
    },


    onBtnSearchTap: function () {
        var search = this.down("#hdinput-searchfield").getValue();
        if(search==""||search==null){
            this.down('#listPayMethod').setStore(payMethodStore);
            return;
        }


        var myStore = Ext.create('hdts.store.payment.PayMethodStore');

        if(payMethodStore){
            for (var i = 0; i < payMethodStore.getCount(); i++) {  //getCount() 方法 获取 数据集 的长度

                //状态
                if(payMethodStore.getAt(i).get('name').indexOf(search) > -1){
                    myStore.add({uuid: store.getAt(i).get('uuid'), code: store.getAt(i).get('code'), name: store.getAt(i).get('name')});
                }

            }
            this.down('#listPayMethod').setStore(myStore);
        }
    },

    /**
     * 添加销售商品
     * @param me
     */
    addPayMethods: function (me) {
        if(typeof(Ext.getStore('paymethodStore')) == "undefined"){
            Ext.create('hdts.store.payment.PayMethodStore');
            SalesService.getPayMethods({
                success : function(ret) {
                    var types = ret.data;


                    payMethodStore = Ext.getStore('paymethodStore');

                    for(var i=0; i<types.length; i++){
                        payMethodStore.add({uuid: types[i].uuid, code: types[i].code, name: types[i].name});
                    }
                    me.down('#listPayMethod').setStore(payMethodStore);

                },
                failure : function(ret) {
                    console.dir(ret);
                }
            });
        }else{
            payMethodStore = Ext.getStore('paymethodStore');
            me.down('#listPayMethod').setStore(payMethodStore);
        }

    }
});

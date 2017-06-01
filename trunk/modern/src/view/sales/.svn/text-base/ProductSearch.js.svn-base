/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ProductSearch
 * 模块说明：商品搜索
 * 修改历史：
 * 2017/4/21 - zhaolingling - 创建
 */
Ext.define('hdts.view.sales.ProductSearch', {
    extend: 'Ext.Container',
    xtype: 'productsearch',
    requires: [
        'hdts.store.sales.ProductStore',
        'hdts.service.sales.SalesService'
    ],
    saleDate: null,
    productStore: null,
    config: {
        title: '选择商品',
        layout: 'vbox',
        itemList: '',
        cls: 'ContractDtlMian',
        id: 'productsearch',
        itemId: 'productsearch',
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
                itemId: 'listProduct',
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
            '#listProduct': {
                itemtap: 'onListItemTap'
            },
            '#btnSearch': {
                tap: 'onBtnSearchTap'
            }
        }
    },

    initialize: function () {
        this.addProducts(this);
    },
    onListItemTap: function (list, index, target, record) {
        var salesBill = Ext.getCmp('salesbillform');
        salesBill.productUuid = record.data.uuid;
        salesBill.productCode = record.data.code;
        salesBill.productName = record.data.name;
        salesBill.down("#btnProduct").setText(record.data.name);
        salesBill.setSaleProduct(record.data.uuid,record.data.code,record.data.name);
        
        this.destroy();
    },


    onBtnSearchTap: function () {
        var search = this.down("#hdinput-searchfield").getValue();
        if(search==""||search==null){
            this.down('#listProduct').setStore(productStore);
            return;
        }


        var myStore = Ext.create('hdts.store.sales.ProductStore');

        if(productStore){
            for (var i = 0; i < productStore.getCount(); i++) {  //getCount() 方法 获取 数据集 的长度

                //状态
                if(productStore.getAt(i).get('name').indexOf(search) > -1){
                    myStore.add({uuid: store.getAt(i).get('uuid'), code: store.getAt(i).get('code'), name: store.getAt(i).get('name')});
                }

            }
            this.down('#listProduct').setStore(myStore);
        }
    },

    /**
     * 添加销售商品
     * @param me
     */
    addProducts: function (me) {
        if(typeof(Ext.getStore('productStore')) == "undefined"){
            Ext.create('hdts.store.sales.ProductStore');
            SalesService.getProducts({
                params: {'saleDate': me.saleDate},
                success : function(ret) {
                    var types = ret.data;


                    productStore = Ext.getStore('productStore');

                    for(var i=0; i<types.length; i++){
                        productStore.add({uuid: types[i].uuid, code: types[i].code, name: types[i].name});
                    }
                    me.down('#listProduct').setStore(productStore);

                },
                failure : function(ret) {
                    console.dir(ret);
                }
            });
        }else{
            productStore = Ext.getStore('productStore');
            me.down('#listProduct').setStore(productStore);
        }

    }
});

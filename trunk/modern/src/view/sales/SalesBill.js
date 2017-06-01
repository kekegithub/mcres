/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：SalesBill
 * 模块说明：销售数据录入单
 * 修改历史：
 * 2017/4/20 - zhaolingling - 创建
 */
Ext.define('hdts.view.sales.SalesBill', {
    extend: 'Ext.form.Panel',
    xtype: 'salesbill',
    alias: 'widget.salesbill',

    requires: [
        'UX.date.DatePickerField',
        'UX.date.DateTimePickerField',
        'UX.date.DateSelect',
        'UX.field.Number',
        'Ext.field.TextArea',
        'hdts.service.sales.SalesService',
        'hdts.view.sales.ProductSearch',
        'hdts.view.sales.PayMethodSearch'
    ],

    id: 'salesbillform',
    itemId: 'salesbillform',
    title: '新建销售录入单',
    baseCls: 'hdcontainer-bg',

    billUuid: null,
    taskFoward: false,
    isEdit: false,
    attachmentTemp: null,
    attachment1: {id: "", name: "", fileType: "", size: "", md5: ""},
    attachment2: {id: "", name: "", fileType: "", size: "", md5: ""},
    saleProduct: null,
    payMethods: [],

    config: {
        layout: 'vbox',
        itemList: '',
        scrollable: true,

        items: [
            {
                docked: 'top',
                xtype: 'component',
                cls: 'hdspace'
            },
            /*本单合计，当日累计*/
            {
                xtype: 'container',
                layout: 'vbox',
                cls: 'hdcontainer-content',
                items: [
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow-object',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                flex: 1,
                                cls: 'hdlabel-content-object',
                                html: '本单合计'
                            },
                            {
                                xtype: 'label',
                                itemId: 'saleTotal',
                                cls: 'hdlabel-objvalue-blue',
                                html: '￥0'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow-object',
                        style: 'border-bottom: 0',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                flex: 1,
                                cls: 'hdlabel-content-object',
                                html: '当日累计'
                            },
                            {
                                xtype: 'label',
                                itemId: 'saleDaySum',
                                cls: 'hdlabel-objvalue-darkgray',
                                html: '￥0'
                            }
                        ]
                    }
                ]
            },
            /*基本信息*/
            {
                xtype: 'container',
                layout: 'vbox',
                cls: 'hdcontainer-content hdmargintop16',
                items: [
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow-textfield',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'dateYMDpickerfield',
                                itemId: 'saleDate',
                                cls: 'hddatepickerDDHHmm',
                                label: '日期*',
                                placeHolder: '请选择',
                                flex: 1,
                                labelWidth: 120,
                                labelCls: 'hddatepicker-labelfont',
                                dateFormat: 'Y/m/d',
                                value: new Date(),
                                picker: {
                                    scrollable: false,
                                    doneButton: {text: '确认', cls: 'done-button'},
                                    cancelButton: {text: '取消', cls: 'canel-button'},
                                    toolbar: {
                                        ui: 'light',
                                        cls: 'toolbar',
                                        title: '选择录入日期'
                                    },
                                    bottombar: {
                                        ui: 'light',
                                        cls: 'bottombar',
                                        itemId: 'datebottombar',
                                        title: ''
                                    },
                                    listeners: {
                                        pick: function (pick, values, slot, eOpts) {
                                            try {
                                                this.down('#datebottombar').setTitle(Ext.util.Format.date(values, 'Y年m月d日 D'));
                                            } catch (err) {
                                                console.dir("转换日期格式出错：" + values);
                                            }

                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow-object',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                flex: 1,
                                cls: 'hdlabel-content-object',
                                html: '商品*'
                            },
                            {
                                xtype: 'button',
                                cls: 'hdlabel-content-btn',
                                iconAlign: 'right',
                                iconCls: 'hdlabel-content-btn-icon',
                                itemId: 'btnProduct',
                                text: '请选择'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow-nobottom',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'hdnumberfield',
                                itemId: 'saleCount',
                                flex: 1,
                                labelWidth: 80,
                                labelCls: 'hdtextfield-labelfont',
                                label: '本单笔数',
                                placeHolder: '请输入',
                                value: 1,
                                minValue: 1,
                                required: true,
                                clearIcon: false
                            }
                        ]
                    }
                ]
            },
            /*详细描述*/
            {
                xtype: 'container',
                layout: 'vbox',
                cls: 'hdcontainer-content hdmargintop16',
                items: [
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'hdlabel-fontbold',
                                html: '详细描述*'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow-nobottom',
                        items: [
                            {
                                xtype: 'textareafield',
                                itemId: 'detailInfo',
                                cls: 'hdtextareafield',
                                maxRows: 4,
                                placeHolder: '请填写详细信息'
                            },
                            {
                                //上传按钮放这边是因为放下边总会被点到
                                xtype: 'filefield',
                                accept: 'image',
                                enctype: 'multipart/form-data',
                                name: 'file',
                                itemId: 'fileUploadImg',
                                hidden: true
                            }
                        ]

                    }
                ]
            },
            /*上传照片附件*/
            {
                xtype: 'container',
                cls: 'hdcontainer-contentImg hdmargintop16',
                itemId: 'imgsContainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'btnUploadImg',
                        cls: 'hdBtnUploadFile',
                        text: '+'
                    }
                ]
            },
            /*支付明细*/
            {
                xtype: 'container',
                layout: 'vbox',
                cls: 'hdcontainer-content hdmargintop16',
                itemId: 'payContentContainer',
                height: 180,
                //style: 'min-height: 180px;',
                items: [
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'hdlabel-fontbold',
                                html: '支付明细*'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow-nobottom',
                        itemId: 'payMethodsContainer',
                        items: [
                            {
                                xtype: 'component',
                                itemId: 'placeHold',
                                height: 30
                            }
                        ]

                    },
                    {
                        xtype: 'button',
                        itemId: 'btnPayMethod',
                        cls: 'button-PayMethod',
                        text: '+添加支付方式'
                    }
                ]
            },
            /*提交按钮*/
            {
                xtype: 'button',
                docked: 'bottom',
                itemId: 'submitSalesBill',
                cls: 'submit-button',
                text: '提交'
            }
        ],
        control: {
            '#submitSalesBill': {
                tap: 'onSubmitSalesBillTap'
            },
            '#btnUploadImg': {
                tap: 'onBtnUploadImgTap'
            },
            '#fileUploadImg': {
                change: 'onFileUploadImgChange'
            },
            '#btnPayMethod': {
                tap: 'onAddPayMethodTap'
            },
            '#btnProduct': {
                tap: 'onSelectProductTap'
            }

        },
        listeners: {
            loadData: 'onLoadData',
            deleteBill: 'deleteConfirm'
        }
    },


    initialize: function () {

    },

    getSaleDaySum: function () {

        try {
            var params = {
                'saleDate': Ext.util.Format.date(me.down('#saleDate').getValue(), 'Y-m-d H:i:s')
            };

            SalesService.getSaleDaySum({
                params: params,
                success: function (ret) {
                    var daySum = ret.data;
                    me.down('#saleDaySum').setHtml(daySum);    //当日累计
                },
                failure: function (ret) {
                    console.dir(ret);
                }
            });
        } catch (e) {

        }

    },

    onLoadData: function () {
        var me = this;
        var uuid = me.billUuid;
        if (uuid == null || uuid == "undefined")
            return;

        SalesService.getBill({
            params: {'uuid': uuid},
            success: function (ret) {
                var detailInfo = ret.data;

                me.down('#saleTotal').setHtml(detailInfo.saleTotal);      //本单合计
                me.down('#saleDaySum').setHtml(detailInfo.saleDaySum);    //当日累计
                me.down('#saleDate').setValue(Ext.Date.format(new Date(detailInfo.saleDate), 'Y/m/d'));        //录入日期
                me.down("#btnProduct").setText(detailInfo.product.name);
                me.setSaleProduct(detailInfo.product.uuid, detailInfo.product.code, detailInfo.product.name);
                me.down('#saleCount').setValue(detailInfo.saleCount);    //本单笔数

                me.down('#detailInfo').setValue(detailInfo.remark);          //详细描述

                //照片附件
                if (detailInfo.attachments && detailInfo.attachments.length > 0) {

                    if (detailInfo.attachments.length > 1) {
                        me.insertImg(me, detailInfo.attachments[0].id, detailInfo.attachments[0].name, detailInfo.attachments[0].fileType, detailInfo.attachments[0].size, detailInfo.attachments[0].url);
                        me.insertImg(me, detailInfo.attachments[1].id, detailInfo.attachments[1].name, detailInfo.attachments[1].fileType, detailInfo.attachments[1].size, detailInfo.attachments[1].url);
                    } else {
                        me.insertImg(me, detailInfo.attachments[0].id, detailInfo.attachments[0].name, detailInfo.attachments[0].fileType, detailInfo.attachments[0].size, detailInfo.attachments[0].url);
                    }
                }

                //费用信息
                //先删除已有的支付方式
                me.payMethods.splice(0, me.payMethods.length);  //清空支付方式数组
                //var payMethodsContainer = me.down('#payMethodsContainer');

                //动态添加的组件好像关掉就没有了
                /*        if(payMethodsContainer.items.length > 1){
                 for(var i=0; i<payMethodsContainer.items.length; i++){
                 console.dir(payMethodsContainer.items);
                 }
                 }*/

                //新增支付方式
                if (detailInfo.payments != null && detailInfo.payments.length > 0) {


                    for (var i = 0; i < detailInfo.payments.length; i++) {
                        var payment = detailInfo.payments[i].payment;
                        me.addPayMethod(payment.uuid, payment.code, payment.name);
                        me.down('#payCode' + payment.code).setValue(detailInfo.payments[i].total);
                    }


                }

            },
            failure: function (ret) {
                console.dir(ret);
            }
        });
    },

    onDeleteBill: function () {
        var me = this;
        var uuid = me.billUuid;
        if (uuid == null || uuid == "undefined")
            return;

        SalesService.deleteBill({
            params: {'uuid': uuid},
            success: function (ret) {
                //返回到列表页面
                var navView;
                if (me.taskFoward == true) {
                    navView = me.up("taskmain");
                } else {
                    navView = me.up("salesmain");
                }

                if (navView != null) {
                    navView.pop(2);
                }

            },
            failure: function (ret) {
                MsgTip.msg(ret);
                console.dir(ret);
            }
        });
    },

    deleteConfirm: function () {
        var me = this;
        Ext.Msg.show({
            title: "系统提示",
            message: '<div class="divdisplay">'
            + '<div class="confirmtitle" >删除确认：</div>'
            + '<div class="confirmcolor"></div>'
            + '<div class="confirmhtml confirmmsg" >删除后您将无法查看或编辑次录入单</div>'
            + '</div>',
            cls: 'versionUpdateMsgbox',
            height: '170px',
            width: 400,
            buttons: [
                {
                    text: '取消',
                    itemId: 'cancle',
                    cls: 'versionUpdateMsgboxcancle'
                },
                {
                    text: '确认删除',
                    itemId: 'yes',
                    cls: 'versionUpdateMsgboxyes'
                }
            ],
            fn: function (buttonId) {
                if (buttonId == 'yes') {
                    me.onDeleteBill();
                }
            }
        });
    },


    onBtnUploadImgTap: function () {
        this.down('#fileUploadImg').fireEvent('click');
        var file = Ext.ComponentQuery.query('filefield[name=file]');
        //触发fileUpload的click事件
        file[0].el.dom.childNodes[1].childNodes[0].childNodes[0].childNodes[0].click();
    },

    onFileUploadImgChange: function (file, newValue, oldValue, eOpts) {
        if (newValue == null || newValue == "undefined")
            return;

        var me = this;
        if (!(file.getFiles() && file.getFiles().length > 0))
            return;

        var fileName = file.getFiles()[0].name;
        //给临时变量attachmentTemp赋值，是因为进入到ajax异步里，file已经没有值了
        me.attachmentTemp = {
            name: fileName.substring(0, fileName.lastIndexOf(".")),
            fileType: fileName.substring(fileName.lastIndexOf(".") + 1),
            size: file.getFiles()[0].size
        };

        Ext.Ajax.request({
            url: "rest/ts/media/upload",
            isUpload: true,
            form: "salesbillform",
            success: function (ret) {

                var obj = Ext.decode(ret.responseText);

                me.insertImg(me, obj.data.fileId, me.attachmentTemp.name, me.attachmentTemp.fileType, me.attachmentTemp.size, obj.data.url);


                //动态添加图片及图片上方的删除按钮
                /*        if(me.down('#imgsContainer').items.length ==1){
                 me.down('#imgsContainer').insert(0,{
                 xtype: 'container',
                 itemId: 'containerImg1',
                 flex: 'hbox',
                 cls: 'hdContainerImage',
                 style: "background-image: url(" + obj.data.url + ")",
                 items:[
                 {
                 xtype: 'img',
                 cls: 'hdDeleteImg',
                 itemId: 'deleteimg',
                 src: 'resources/images/delete.png',
                 listeners: {
                 tap: function () {
                 me.down('#imgsContainer').remove(me.down('#containerImg1'));
                 if(me.down('#imgsContainer').items.length ==2){
                 me.down('#btnUploadImg').setHidden(false);
                 }
                 me.attachment1 = null;

                 }
                 }
                 }
                 ]

                 });
                 //给变量attachment1赋值
                 me.attachment1.id = obj.data.fileId;
                 me.attachment1.name = me.attachmentTemp.name;
                 me.attachment1.fileType = me.attachmentTemp.fileType;
                 me.attachment1.size = me.attachmentTemp.size;

                 }else if(me.down('#imgsContainer').items.length ==2){
                 me.down('#imgsContainer').insert(1,{
                 xtype: 'container',
                 flex: 'hbox',
                 cls: 'hdContainerImage',
                 style: "background-image: url(" + obj.data.url + ")",
                 items:[
                 {
                 xtype: 'img',
                 itemId: 'containerImg2',
                 cls: 'hdDeleteImg',
                 itemId: 'deleteimg',
                 src: 'resources/images/delete.png',
                 listeners: {
                 tap: function () {
                 me.down('#imgsContainer').remove(me.down('#containerImg2'));

                 if(me.down('#imgsContainer').items.length ==2){
                 me.down('#btnUploadImg').setHidden(false);
                 }

                 me.attachment2 = null;
                 }
                 }
                 }
                 ]
                 });

                 //给变量attachment1赋值
                 me.attachment2.id = obj.data.fileId;
                 me.attachment2.name = me.attachmentTemp.name;
                 me.attachment2.fileType = me.attachmentTemp.fileType;
                 me.attachment2.size = me.attachmentTemp.size;
                 }

                 if(me.down('#imgsContainer').items.length ==3){
                 me.down('#btnUploadImg').setHidden(true);
                 }*/

            }
        });

        //清掉路径，有问题
        //todo
        //me.down('#fileUploadImg').setRawValue("");
        //me.down('#fileUploadImg').fileInputEl.dom.value = '';
        //me.down('#fileUploadImg').reset();
    },

    insertImg: function (me, fileId, name, fileType, size, url) {
        //动态添加图片及图片上方的删除按钮
        if (me.down('#imgsContainer').items.length == 1) {
            me.down('#imgsContainer').insert(0, {
                xtype: 'container',
                itemId: 'containerImg1',
                flex: 'hbox',
                cls: 'hdContainerImage',
                style: "background-image: url(" + url + ")",
                items: [
                    {
                        xtype: 'img',
                        cls: 'hdDeleteImg',
                        itemId: 'deleteimg',
                        src: 'resources/images/delete.png',
                        listeners: {
                            tap: function () {
                                me.down('#imgsContainer').remove(me.down('#containerImg1'));
                                if (me.down('#imgsContainer').items.length == 2) {
                                    me.down('#btnUploadImg').setHidden(false);
                                }

                            }
                        }
                    }
                ]

            });
            //给变量attachment1赋值
            me.attachment1.id = fileId;
            me.attachment1.name = name;
            me.attachment1.fileType = fileType;
            me.attachment1.size = size;

        } else if (me.down('#imgsContainer').items.length == 2) {
            me.down('#imgsContainer').insert(1, {
                xtype: 'container',
                itemId: 'containerImg2',
                flex: 'hbox',
                cls: 'hdContainerImage',
                style: "background-image: url(" + url + ")",
                items: [
                    {
                        xtype: 'img',
                        itemId: 'containerImg2',
                        cls: 'hdDeleteImg',
                        itemId: 'deleteimg',
                        src: 'resources/images/delete.png',
                        listeners: {
                            tap: function () {
                                me.down('#imgsContainer').remove(me.down('#containerImg2'));

                                if (me.down('#imgsContainer').items.length == 2) {
                                    me.down('#btnUploadImg').setHidden(false);
                                }

                            }
                        }
                    }
                ]
            });

            //给变量attachment1赋值
            me.attachment2.id = fileId;
            me.attachment2.name = name;
            me.attachment2.fileType = fileType;
            me.attachment2.size = size;
        }

        if (me.down('#imgsContainer').items.length == 3) {
            me.down('#btnUploadImg').setHidden(true);
        }


    },

    onSubmitSalesBillTap: function () {
        var me = this;

        try {
            if (Ext.isEmpty(me.down('#saleDate').getValue())) {
                MsgTip.msg('请选择日期');
                return;
            }

            if (me.saleProduct == null || me.saleProduct.name == null) {
                MsgTip.msg('请选择商品');
                return;
            }

            if (Ext.isEmpty(me.down('#detailInfo').getValue())) {
                MsgTip.msg('请填写详细描述');
                return;
            }


            if (me.payMethods == null || me.payMethods.length < 1) {
                MsgTip.msg('请填写支付明细');
                return;
            }

            //支付方式
            var payments = new Array();
            for (var i = 0; i < me.payMethods.length; i++) {
                var item = me.payMethods[i];

                var total = me.down('#payCode' + item.code).getValue();
                var paymentItem = {payment: item, total: total};
                payments.push(paymentItem);
            }


            //照片描述
            var attachments = new Array();
            if (me.attachment1 && me.attachment1.id) {
                attachments.push(me.attachment1);
            }

            if (me.attachment2 && me.attachment2.id) {
                attachments.push(me.attachment2);
            }

            var params = {
                'uuid': me.billUuid,
                'saleDate': Ext.util.Format.date(me.down('#saleDate').getValue(), 'Y-m-d H:i:s'),
                'product': me.saleProduct,
                'saleCount': me.down('#saleCount').getValue(),
                'remark': me.down('#detailInfo').getValue(),
                'payments': payments,
                'attachments': attachments
            };


            if (me.isEdit == false) {
                SalesService.create({
                    params: params,
                    success: function (ret) {
                        me.backToSalesDetail(me);
                    },
                    failure: function (ret) {
                        MsgTip.msg(ret);
                    }
                });
            } else {
                SalesService.edit({
                    params: params,
                    success: function (ret) {
                        me.backToSalesDetail(me);
                    },
                    failure: function (ret) {
                        MsgTip.msg(ret);
                    }
                });
            }
        } catch (e) {
            MsgTip.msg(e);
        }


    },

    /**
     * 后退
     * @param me
     */
    backToSalesDetail: function (me) {
        var navView;
        if (me.taskFoward == true) {
            navView = me.up("taskmain");
        } else {
            navView = me.up("salesmain");
        }
        navView.doPop();
    },

    /**
     * 添加支付方式
     */
    onAddPayMethodTap: function () {

        if (this.taskFoward == true) {
            Ext.getCmp('taskmain').fireEvent('forward', {
                xtype: 'paymethodsearch'
            });
        } else {
            Ext.getCmp('salesmain').fireEvent('forward', {
                xtype: 'paymethodsearch'
            });
        }

    },

    /**
     * 选择商品
     */
    onSelectProductTap: function () {
        if (this.taskFoward == true) {
            Ext.getCmp('taskmain').fireEvent('forward', {
                xtype: 'productsearch',
                saleDate: Ext.util.Format.date(this.down('#saleDate').getValue(), 'Y-m-d H:i:s')
            });
        } else {
            Ext.getCmp('salesmain').fireEvent('forward', {
                xtype: 'productsearch',
                saleDate: Ext.util.Format.date(this.down('#saleDate').getValue(), 'Y-m-d H:i:s')
            });
        }
    },

    /**
     * 设置销售商品
     * @param uuid
     * @param code
     * @param name
     */
    setSaleProduct: function (uuid, code, name) {
        this.saleProduct = {uuid: uuid, code: code, name: name};
    },

    /**
     * 添加支付方式
     * @param uuid
     * @param code
     * @param name
     */
    addPayMethod: function (uuid, code, name) {
        var me = this;

        var payMethod = {uuid: uuid, code: code, name: name};
        me.payMethods.push(payMethod);

        me.down('#placeHold').setHidden(true);

        var index = me.down('#payMethodsContainer').items.length;

        this.down('#payMethodsContainer').insert(index - 1, {
            xtype: 'container',
            cls: 'hdcontainer-paymethod-textfield',
            layout: 'hbox',
            items: [
                {
                    xtype: 'numberfield',
                    itemId: 'payCode' + code,
                    labelWidth: 150,
                    flex: 1,
                    labelCls: 'sales-payment-field-icon',
                    label: name,
                    value: 0,
                    placeHolder: '请输入',
                    autoCapitalize: true,
                    required: true,
                    clearIcon: false,
                    listeners: {
                        change: function () {

                            //计算本单合计
                            var nowBillTotal = 0;
                            var itemValue = 0;
                            for (var i = 0; i < me.payMethods.length; i++) {
                                var payCodeField = me.down('#payCode' + me.payMethods[i].code);
                                if (payCodeField != null && payCodeField != "undefined") {
                                    itemValue = payCodeField.getValue();
                                }

                                nowBillTotal += itemValue;
                            }
                            me.down('#saleTotal').setHtml(nowBillTotal);
                        }
                    }
                }
            ]

        });

        me.down('#btnPayMethod').setText("+添加支付方式");

        var height = me.down('#payContentContainer').getHeight();
        if (height == 180) {
            me.down('#payContentContainer').setHeight(180 + 15);
        } else {
            me.down('#payContentContainer').setHeight(height + 45);
        }
    }
});
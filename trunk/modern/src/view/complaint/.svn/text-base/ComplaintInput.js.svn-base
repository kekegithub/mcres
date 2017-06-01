/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ComplaintInput
 * 模块说明：
 * 修改历史：
 * 2017/4/17 - lihuiming - 创建
 */

Ext.define('hdts.view.complaint.ComplaintInput', {
    extend: 'Ext.form.Panel',
    xtype: 'complaintinput',
    alias: 'widget.complaintinput',

    requires: [
        'UX.date.DatePickerField',
        'UX.date.DateTimePickerField',
        'UX.select.SelectTextField',
        'Ext.field.TextArea',
        'hdts.service.complaint.ComplaintService',
        'hdts.view.complaint.ComplaintSearch'
    ],
    id: 'complaintinput',
    attachmentTemp: null,
    attachment1: {id: "", name: "", fileType: "", size: "", md5: ""},
    attachment2: {id: "", name: "", fileType: "", size: "", md5: ""},
    beComplainedContract: {uuid: "", code: "", name: ""},
    config: {
        itemId: 'complaintinput',
        cls: 'hdcontainer-bg',
        title: '新建投诉单',
        layout: 'vbox',
        itemList: '',
        scrollable: true,
        items: [
            /*投诉基本信息*/
            {
                docked: 'top',
                xtype: 'component',
                cls: 'hdspace'
            },
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
                                html: '投诉对象*'
                            },
                            {
                                xtype: 'button',
                                cls: 'hdlabel-content-btn',
                                iconAlign: 'right',
                                iconCls: 'hdlabel-content-btn-icon',
                                itemId: 'hdlabel-content-btn-object',
                                text: '请选择',
                                model: false,
                                handler: function () {
                                    var items = [
                                        {

                                            text: '商场',
                                            // ui: 'decline',
                                            cls: 'hdlabel-sheet-btnfirst',
                                            scope: this,
                                            handler: function () {
                                                this.setText("商场");
                                                // var a=Ext.getCmp('complaintName')
                                                Ext.getCmp('complaintName').hide();
                                                this.actions.hide();
                                            }
                                        },
                                        {
                                            text: '商户',
                                            scope: this,
                                            cls: 'hdlabel-sheet-btnsecond',
                                            handler: function () {
                                                this.setText("商户");
                                                Ext.getCmp('complaintName').show();
                                                this.actions.hide();
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            text: '取消',
                                            scope: this,
                                            cls: 'hdlabel-sheet-btncancle',
                                            handler: function () {
                                                this.actions.hide();
                                            }
                                        }
                                    ];

                                    if (!this.actions) {
                                        this.actions = Ext.create('Ext.ActionSheet', {
                                            items: items
                                        });
                                    }

                                    Ext.Viewport.add(this.actions);
                                    this.actions.show();
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow-object',
                        layout: 'hbox',
                        id: 'complaintName',
                        items: [
                            {
                                xtype: 'label',
                                flex: 1,
                                cls: 'hdlabel-content-object',
                                html: '商户名称*'
                            },
                            {
                                xtype: 'label',
                                cls: 'hdlabel-content-object',
                                itemId: 'complaintuuid',
                                hidden: true,
                                html: ''
                            },
                            {
                                xtype: 'label',
                                cls: 'hdlabel-content-object',
                                itemId: 'complaintcode',
                                hidden: true,
                                html: ''
                            },
                            {
                                xtype: 'button',
                                cls: 'hdlabel-content-btn',
                                iconAlign: 'right',
                                iconCls: 'hdlabel-content-btn-icon',
                                itemId: 'complainticon',
                                text: '请选择',
                                handler: function () {
                                    Ext.getCmp('complaintmain').fireEvent('forward', {
                                        xtype: 'complaintsearch'
                                    });
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow-textfield',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'selecttextfield',
                                itemId: 'complaintType',
                                cls: 'hddatepickerDDHHmm',
                                label: '投诉类型*',
                                placeHolder: '请选择',
                                flex: 1,
                                labelWidth: 120,
                                store: '',
                                labelCls: 'hddatepicker-labelfont',
                                //dateFormat: 'Y-m-d H:i',
                                //value: new Date('2017/3/18 10:11'),
                                picker: {
                                    scrollable: false,
                                    toolbar: {
                                        ui: 'light',
                                        cls: 'toolbar',
                                        title: '投诉类型'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow-textfield',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textfield',
                                itemId: 'complaintContactInfo',
                                flex: 1,
                                labelWidth: 80,
                                labelCls: 'hdtextfield-labelfont',
                                label: '联系方式*',
                                placeHolder: '请输入',
                                autoCapitalize: true,
                                // required: true,
                                clearIcon: false
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
                xtype: 'container',
                layout: 'vbox',
                cls: 'hdcontainer-content',
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
                                itemId: 'complaintDetailInfo',
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
            {
                xtype: 'container',
                cls: 'input-spacer'
            },
            {
                xtype: 'container',
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
            {
                xtype: 'container',
                cls: 'input-spacer-bottom'
            },
            {
                xtype: 'button',
                itemId: 'submitcomplaintBill',
                cls: 'submit-button',
                text: '提交'
            }
        ],
        control: {
            '#submitcomplaintBill': {
                tap: 'onSubmitMaintainBillTap'
            },
            '#btnUploadImg': {
                tap: 'onBtnUploadImgTap'
            },
            '#fileUploadImg': {
                change: 'onFileUploadImgChange'
            }
        }
    },


    initialize: function () {
        this.down('#complaintContactInfo').setValue(Ext.getStore('employee').getAt(0).get('telephone'));   //联系方式
        this.addComplaintTypeSelect(this);
    },

    onBtnUploadImgTap: function () {
        this.down('#fileUploadImg').fireEvent('click');
        var file = Ext.ComponentQuery.query('filefield[name=file]');
        //触发fileUpload的click事件
        file[0].el.dom.childNodes[1].childNodes[0].childNodes[0].childNodes[0].click();
    },

    onFileUploadImgChange: function (file, newValue, oldValue, eOpts) {
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
            form: "complaintinput",
            success: function (ret) {
                var obj = Ext.decode(ret.responseText);
                Common.insertImg(me, obj.data.fileId, me.attachmentTemp.name, me.attachmentTemp.fileType, me.attachmentTemp.size, obj.data.url);
            }
        });
    },

    onSubmitMaintainBillTap: function () {
        var me = this;
        var complaintObject = me.down('#hdlabel-content-btn-object').getText();
        var name = me.down('#complainticon').getText();
        var detailInfo = me.down('#complaintDetailInfo').getValue();
        var complaintType = me.down('#complaintType').getValue();
        /*  var uuid = me.down('#complaintuuid').getHtml();
         var code = me.down('#complaintcode').getHtml();*/
        if (Ext.isEmpty(complaintObject)) {
            // Common.MsgConfirm('', '投诉对象不能为空');
            MsgTip.msg('投诉对象不能为空');
            return;
        }
        if (complaintObject == "商户" && (Ext.isEmpty(name) || name == "请选择")) {
            // Common.MsgConfirm('', '商户名称不能为空');
            MsgTip.msg('商户名称不能为空');
            return;
        }
        if (Ext.isEmpty(complaintType)) {
            // Common.MsgConfirm('', '投诉类型不能为空');
            MsgTip.msg('投诉类型不能为空');
            return;
        }
        if (Ext.isEmpty(detailInfo)) {
            // Common.MsgConfirm('', '详细描述不能为空');
            MsgTip.msg('详细描述不能为空');
            return;
        }
        var params;
        if (complaintObject == "商场") {
            complaintObject = "market";
            params = {
                'complaintObject': complaintObject,
                "beComplainedContract": {},
                'contactInfo': me.down('#complaintContactInfo').getValue(),
                'complaintContents': detailInfo,
                'complaintType': complaintType
            }
        } else if (complaintObject == "商户") {
            complaintObject = "tenant";
            params = {
                'complaintObject': complaintObject,
                "beComplainedContract": {
                    "uuid": me.beComplainedContract.uuid,
                    "code": me.beComplainedContract.code,
                    "name": name
                },
                'contactInfo': me.down('#complaintContactInfo').getValue(),
                'complaintContents': detailInfo,
                'complaintType': complaintType
            }
        }


        //=====后面待修改=====//
        ComplaintService.create({
            params: params,
            success: function (ret) {
                var navView = me.up("complaintmain");
                navView.doPop();
            },
            failure: function (ret) {

                MsgTip.msg(ret);
            }
        });
    },
    addComplaintTypeSelect: function (me) {
        ComplaintService.getTypes({
            success: function (ret) {
                var types = ret.data;

                // Ext.create('hdts.store.complaint.ComplaintTypeStore');
                var myStore = Ext.create('hdts.store.complaint.ComplaintTypeStore');

                for (var i = 0; i < types.length; i++) {
                    myStore.add({value: types[i], text: types[i]});
                }
                me.down('#complaintType').setStore(myStore);
            },
            failure: function (ret) {
                console.dir(ret);
            }
        });
    },
    setBeComplainedContract: function (uuid, code, name) {
        this.beComplainedContract.uuid = uuid;
        this.beComplainedContract.code = code;
        this.beComplainedContract.name = name;
    }
});
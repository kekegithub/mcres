/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：Maintain
 * 模块说明：新建工程报修单
 * 修改历史：
 * 2017/3/20 - zhaolingling - 创建
 */
Ext.define('hdts.view.maintain.Maintain', {
    extend: 'Ext.form.Panel',
    xtype: 'maintainform',
    alias: 'widget.maintainform',

    requires: [
        'UX.date.DatePickerField',
        'UX.date.DateTimePickerField',
        'Ext.field.TextArea',
        'hdts.service.maintain.MaintainService'
    ],

    id: 'maintainform',
    itemId: 'maintainform',
    title: '新建报修单',
    baseCls: 'hdcontainer-bg',
    attachmentTemp: null,
    attachment1: null,
    attachment2: {id: "", name: "", fileType: "", size: "", md5: ""},

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
            /*报修基本信息*/
            {
                xtype: 'container',
                layout: 'vbox',
                cls: 'hdcontainer-content',
                items: [
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow-textfield',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'selecttextfield',
                                itemId: 'maintainType',
                                cls: 'hddatepickerDDHHmm',
                                label: '报修类型*',
                                placeHolder: '请选择',
                                flex: 1,
                                labelWidth: 120,
                                store: '',
                                labelCls: 'hddatepicker-labelfont',
                                picker: {
                                    scrollable: false,
                                    toolbar: {
                                        ui: 'light',
                                        cls: 'toolbar',
                                        title: '报修类型'
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
                                itemId: 'reportAddress',
                                labelWidth: 80,
                                flex: 1,
                                labelCls: 'hdtextfield-labelfont',
                                label: '报修地点',
                                placeHolder: '请输入',
                                autoCapitalize: true,
                                required: true,
                                clearIcon: false
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow-textfield',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'hdnumberfield',
                                itemId: 'contactInfo',
                                flex: 1,
                                labelWidth: 80,
                                labelCls: 'hdtextfield-labelfont',
                                label: '联系方式',
                                placeHolder: '请输入',
                                autoCapitalize: true,
                                required: true,
                                clearIcon: false
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-billrow-nobottom',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'datetimepickerfield',
                                itemId: 'appointmentTime',
                                cls: 'hddatepickerDDHHmm',
                                label: '期望上门时间*',
                                placeHolder: '请选择',
                                flex: 1,
                                labelWidth: 120,
                                labelCls: 'hddatepicker-labelfont',
                                dateFormat: 'Y/m/d H:i',
                                //value: new Date('2017/3/18 10:11'),  //初始化的时候赋值,initialize
                                picker: {
                                    scrollable: false,
                                    minuteInterval: 10,
                                    //days: 2,
                                    doneButton: {text: '确认', cls: 'done-button'},
                                    cancelButton: {text: '取消', cls: 'canel-button'},
                                    toolbar: {
                                        ui: 'light',
                                        cls: 'toolbar',
                                        title: '期望上门时间'
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
                                                this.down('#datebottombar').setTitle(Ext.util.Format.date(values, 'Y年m月d日 D H:i'));
                                            } catch (err) {
                                                console.dir("转换日期格式出错：" + values);
                                            }

                                        }
                                    }
                                }
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
                itemId: 'imgsContainer',
                cls: 'hdcontainer-contentImg hdmargintop16',
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
                xtype: 'button',
                docked: 'bottom',
                itemId: 'submit-maintainBill',
                cls: 'submit-button',
                text: '提交'
            }
        ],
        control: {
            '#submit-maintainBill': {
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

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minutes = now.getMinutes();
        minutes = Math.ceil(minutes / 10) * 10;
        if (minutes > 50) {
            hour = hour + 1;
            minutes = 0;
        }

        //期望上门时间
        this.down('#appointmentTime').setValue(new Date(year + "/" + month + "/" + day + ' ' + hour + ':' + minutes));
        this.down('#contactInfo').setValue(Ext.getStore('employee').getAt(0).get('telephone'));

        this.bindMaintainType(this);
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
            form: "maintainform",
            success: function (ret) {

                var obj = Ext.decode(ret.responseText);

                Common.insertImg(me, obj.data.fileId, me.attachmentTemp.name, me.attachmentTemp.fileType, me.attachmentTemp.size, obj.data.url);

                /*        //动态添加图片及图片上方的删除按钮
                 if(me.down('#imgsContainer').items.length ==1){
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

    onSubmitMaintainBillTap: function () {
        var me = this;

        if (Ext.isEmpty(me.down('#maintainType').getValue())) {
            MsgTip.msg('报修类型不能为空');
            return;
        }
        if (Ext.isEmpty(me.down('#reportAddress').getValue())) {
            MsgTip.msg('报修地点不能为空');
            return;
        }

        if (Ext.isEmpty(me.down('#contactInfo').getValue())) {
            MsgTip.msg('报修地点不能为空');
            return;
        }

        if (Ext.isEmpty(me.down('#appointmentTime').getValue())) {
            MsgTip.msg('期望上门时间不能为空');
            return;
        }

        if (Ext.isEmpty(me.down('#detailInfo').getValue())) {
            MsgTip.msg('详细描述不能为空');
            return;
        }

        var beforePictures = new Array();
        if (me.attachment1 && me.attachment1.id) {
            beforePictures.push(me.attachment1);
        }

        if (me.attachment2 && me.attachment2.id) {
            beforePictures.push(me.attachment2);
        }

        //=====后面待修改=====//
        MaintainService.create({
            params: {
                'maintainType': me.down('#maintainType').getValue(),
                'maintainAddress': me.down('#reportAddress').getValue(),
                'contactInfo': me.down('#contactInfo').getValue(),
                'appointmentTime': Ext.util.Format.date(me.down('#appointmentTime').getValue(), 'Y-m-d H:i:s'),
                'maintainContent': me.down('#detailInfo').getValue()
            },
            success: function (ret) {
                var navView = me.up("maintainmain");
                navView.doPop();
            },
            failure: function (ret) {
                MsgTip.remove();
                MsgTip.msg(ret);
            }
        });

    },

    bindMaintainType: function (me) {
        MaintainService.getTypes({
            success: function (ret) {
                var types = ret.data;

                // Ext.create('hdts.store.complaint.ComplaintTypeStore');
                var myStore = Ext.create('hdts.store.maintain.MaintainTypeStore');

                for (var i = 0; i < types.length; i++) {
                    myStore.add({value: types[i], text: types[i]});
                }
                me.down('#maintainType').setStore(myStore);
            },
            failure: function (ret) {
                console.dir(ret);
            }
        });
    }
});
/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：AboutUs
 * 模块说明：
 * 修改历史：
 * 2017/4/25 - lihuiming - 创建
 */
Ext.define('hdts.view.other.AboutUs', {
    extend: 'Ext.Container',
    xtype: 'aboutus',
    alias: 'widget.aboutus',
    requires: [],
    id: 'aboutus',
    config: {
        itemId: 'aboutus',
        title: '关于我们',
        layout: 'vbox',
        scrollable: true,
        cls: 'hdcontainer-main-bg',
        items: [
            {
                xtype: 'container',
                layout: 'vbox',
                cls: 'hdcontainer-aboutus-bg',
                items: [
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-aboutus-first',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'hdcontainer-logo',
                                html:""
                            },
                            {
                                xtype: 'label',

                                itemId: 'maintainBillNumber',
                                cls: 'hdcontainer-aboutus-name',
                                html: 'TS-CRE'
                            },
                            {
                                xtype: 'label',
                                itemId: 'maintainBillNumber',
                                cls: 'hdcontainer-aboutus-namez',
                                html: '海鼎商户互动平台'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'vbox',
                        cls: 'hdcontainer-aboutuslist',
                        items: [
                            {
                                xtype: 'button',
                                cls: 'hdcontainer-changepwd hdcontainer-aboutus',
                                itemId: 'hdcontainer-version',
                                align: 'left',
                                text: "版本号<span class='hdcontainer-aboutus-right'>1.0</span>"
                            },
                            {
                                xtype: 'container',
                                layout: 'vbox',
                                cls: 'hdcontainer-changepassword-bottom',
                                items:[
                                    {
                                        xtype: 'label',
                                        cls: 'hdcontainer-bottom'
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                cls: 'hdcontainer-changepwd hdcontainer-aboutus',
                                itemId: 'hdcontainer-tel',
                                align: 'left',
                                text: "联系电话<span class='hdcontainer-aboutus-right'>400-000-0000</span>",
                                name:''
                            }
                        ]
                    },
                    {
                        xtype: 'label',
                        cls: 'hdcontainer-aboutus-copyright',
                        html: 'copyright&nbsp;&nbsp;©&nbsp;&nbsp;2016'
                    }
                ]
            }
        ],
        control: {
            '#hdcontainer-tel': {
                tap: 'onTelTap'
            }
        }
    },


    initialize: function () {
        this.down('#hdcontainer-tel').setText("联系电话<span class='hdcontainer-aboutus-right'>" + Ext.getStore('employee').getAt(0).get('storePhone')+ "</span>");   //联系方式
        this.down('#hdcontainer-tel').name= Ext.getStore('employee').getAt(0).get('storePhone');   //联系方式
        this.getVersion(this);
    },

    onTelTap: function () {
        window.open('tel:'+this.down('#hdcontainer-tel').name+'', '_parent')
    },
    getVersion:function (me) {
        Ext.Ajax.request({
            url: 'modern/resources/config/version.json',
            success: function (obj) {
                var response = Ext.decode(obj.responseText);
                me.down('#hdcontainer-version').setText("版本号<span class='hdcontainer-aboutus-right'>" + response.versionName + "</span>");   //联系方式
            },
            failure: function (response, opts) {
                console.log('获取失败：' + response.status);
            }
        });
    }
});

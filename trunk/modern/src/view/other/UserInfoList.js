/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：UserInfoList
 * 模块说明：
 * 修改历史：
 * 2017/4/24 - lihuiming - 创建
 */
Ext.define('hdts.view.other.UserInfoList', {
    extend: 'Ext.Container',
    xtype: 'userinfolist',
    alias: 'widget.userinfolist',
    requires: [],
    id: 'userinfolist',
    config: {
        itemId: 'userinfolist',
        title: '个人中心',
        layout: 'vbox',
        scrollable: true,
        cls: 'hdcontainer-main-bg',
        items: [
            {
                xtype: 'container',
                layout: 'vbox',
                cls: 'hdcontainer-content-bg',
                items: [
                    {
                        xtype: 'container',
                        layout: 'vbox',
                        cls: 'hdcontainer-mainmessage',
                        items: [
                            {
                                xtype: 'label',
                                flex: 1,
                                itemId: 'hdcontainer-mainmessage-name',
                                cls: 'hdcontainer-mainmessage-name',
                                html: '王二狗'
                            },
                            {
                                xtype: 'label',
                                flex: 1,
                                itemId: 'hdcontainer-mainmessage-company',
                                cls: 'hdcontainer-mainmessage-company',
                                html: '上海七宝万科'
                            }
                            /* ,
                             {
                             xtype: 'label',
                             flex:1,
                             itemId: 'hdcontainer-mainmessage-number',
                             cls: 'hdcontainer-mainmessage-number',
                             html: 'ID:666666'
                             }*/
                        ]
                    },
                    /*{
                     xtype: 'container',
                     cls: 'hdcontainer-changepwd',
                     itemId: 'hdcontainer-changepwd',
                     layout: 'hbox',
                     items: [
                     {
                     xtype: 'label',
                     flex: 1,
                     cls: 'hdcontainer-changepwd-icon'
                     },
                     {
                     xtype: 'label',
                     flex: 8,
                     cls: 'hdcontainer-html',
                     html: '修改密码'
                     },
                     {
                     xtype: 'label',
                     flex: 1,
                     cls: 'hdlabel-right'
                     }
                     ]
                     },*/
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-changepwdmain',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'button',
                                cls: 'hdcontainer-changepwd',
                                itemId: 'hdcontainer-changepwd',
                                align: 'left',
                                iconCls: 'hdcontainer-changepwd-icon',
                                text: "修改密码<span class='hdcontainer-right'></span>"
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-aboutwe',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'button',
                                cls: 'hdcontainer-changepwd',
                                itemId: 'hdcontainer-aboutwe',
                                align: 'left',
                                iconCls: 'hdcontainer-aboutwe-icon',
                                text: "关于我们<span class='hdcontainer-right'></span>"
                            },
                            {
                                xtype: 'container',
                                layout: 'vbox',
                                cls: 'hdcontainer-mainbottom',
                                items: [
                                    {
                                        xtype: 'label',
                                        cls: 'hdcontainer-bottom'
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                cls: 'hdcontainer-changepwd',
                                itemId: 'hdcontainer-update',
                                align: 'left',
                                iconCls: 'hdcontainer-update-icon',
                                text: "版本更新<span class='hdcontainer-right'></span>"
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'hdcontainer-aboutwe',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'button',
                                cls: 'hdcontainer-changepwd hdcontainer-release',
                                itemId: 'hdcontainer-release',
                                align: 'left',
                                iconCls: 'hdcontainer-release-icon',
                                text: "<span style='color:#e75c37'>退出登录</span>"
                            }
                        ]
                    }
                ]
            }
        ],
        control: {
            '#hdcontainer-changepwd': {
                tap: 'onChangePwdTap'
            },
            '#hdcontainer-aboutwe': {
                tap: 'onAboutWeTap'
            },
            '#hdcontainer-release': {
                tap: 'onReleaseTap'
            },
            '#hdcontainer-update': {
                tap: 'onUpdateTap'
            }
        }
    },


    initialize: function () {
        var employee = Ext.getStore('employee').getAt(0);
        this.down('#hdcontainer-mainmessage-name').setHtml(employee.get("user").name);
        this.down('#hdcontainer-mainmessage-company').setHtml(employee.get('store').name + '-' + employee.get('contract').name);
        // this.down('#hdcontainer-mainmessage-number').setHtml("");
    },

    onChangePwdTap: function () {
        Ext.getCmp('userinfomain').fireEvent('forward', {
            xtype: 'changepassword'
        });
    },
    onAboutWeTap: function () {
        Ext.getCmp('userinfomain').fireEvent('forward', {
            xtype: 'aboutus'
        });
    },
    onReleaseTap: function () {
        Ext.Viewport.removeAll();
        Ext.Viewport.add(Ext.create('hdts.view.login.Login'));
    },
    onUpdateTap: function () {
        // Common.VersionUpdateConfirm('2.0', '1.新增投诉建议功能<br/>2.新增工程报修功能<br/>2.新增工程报修功能<br/>2.新增工程报修功能<br/>2.新增工程报修功能');
        // MsgConfirem.msg('加载中', 'load');
        Ext.Ajax.request({
            url: 'modern/resources/config/version.json',
            success: function (obj) {
                // var obj = Ext.decode(response.responseText);
                // var dataj = JSON.parse(obj.responseText);
                var response = Ext.decode(obj.responseText);
                UserService.getVersion({
                    params: {'versionCode': response.versionCode, 'versionName': response.versionName, 'platform': response.platform},
                    success: function (ret) {
                        var sortinfo = ret.data;
                        if(ret.data.needUpdate){
                            Common.VersionUpdateConfirm(ret.data.version,ret.data.updateContent,ret.data.url)
                        }else{
                            // Common.MsgConfirm('',ret.data.updateContent)
                            MsgTip.msg(ret.data.updateContent);
                        }
                    },
                    failure: function (ret) {
                        MsgTip.msg(ret);
                    }
                });
            },
            failure: function (response, opts) {
                console.log('获取失败：' + response.status);
            }
        });
    }
});

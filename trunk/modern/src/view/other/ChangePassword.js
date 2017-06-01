/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ChangePassword
 * 模块说明：
 * 修改历史：
 * 2017/4/24 - lihuiming - 创建
 */
Ext.define('hdts.view.other.ChangePassword', {
    extend: 'Ext.form.Panel',
    xtype: 'changepassword',
    alias: 'widget.changepassword',
    requires: [],
    id: 'changepassword',
    config: {
        itemId: 'changepassword',
        cls: 'hdcontainer-main-bg',
        title: '修改密码',
        layout: 'vbox',
        scrollable: true,
        items: [
            {
                xtype: 'passwordfield',
                revealable: true,
                cls:'changepassword-current',
                placeHolder: '请输入当前密码',
                clearIcon: true,
                required: true,
                itemId: 'changepassword-current',
                name: 'userId'
            },
            {
                xtype: 'passwordfield',
                revealable: true,
                cls:'changepassword-new',
                placeHolder: '请输入新密码',
                clearIcon: true,
                required: true,
                itemId: 'changepassword-new',
                name: 'password'
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
                xtype: 'passwordfield',
                revealable: true,
                cls:'changepassword-newagain',
                placeHolder: '请再次输入新密码',
                clearIcon: true,
                required: true,
                itemId: 'changepassword-newagain',
                name: 'password'
            },
            {
                xtype: 'button',
                itemId: 'submit-button',
                cls: 'changepassword-submit',
                text: '确认修改'
            }
        ],
        control: {
            '#submit-button': {
                tap: 'onSubmitTap'
            }
        }
    },


    initialize: function () {
    },

    onSubmitTap: function () {
        var me = this;
        var oldpsw = me.down('#changepassword-current').getValue();
        var newpsw = me.down('#changepassword-new').getValue();
        var newpswagain = me.down('#changepassword-newagain').getValue();
        /*  var uuid = me.down('#complaintuuid').getHtml();
         var code = me.down('#complaintcode').getHtml();*/
        if (Ext.isEmpty(oldpsw)) {
            // Common.MsgConfirm('', '请输入当前密码');
            MsgTip.msg('原始密码为空');
            return;
        }
        if (Ext.isEmpty(newpsw)) {
            // Common.MsgConfirm('', '请输入新密码');
            MsgTip.msg('新密码为空');
            return;
        }
        if (Ext.isEmpty(newpswagain)) {
            // Common.MsgConfirm('', '请再次输入新密码');
            MsgTip.msg('再次输入的新密码为空');
            return;
        }
        if (newpsw!=newpswagain) {
            Common.MsgConfirm('', '两次输入的密码不相同');
            return;
        }
        UserService.changePassword({
            params: {'newPassword': newpsw, 'oldPassword': oldpsw},
            success: function (ret) {
                var navView = me.up("userinfomain");
                navView.doPop();
            },
            failure: function (ret) {
                MsgTip.msg(ret);
            }
        });
    }
});

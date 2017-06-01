/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：MessageList
 * 模块说明：
 * 修改历史：
 * 2017/3/30 - lihuiming - 创建
 */
Ext.define('hdts.view.message.MessageList', {
    extend: 'Ext.Container',
    alias: 'widget.messagelist',
    requires: [
        'Ext.Container',
        'Ext.Panel',
        'hdts.service.message.MessageDelete',
        'hdts.service.common.Common'
        // 'Ext.plugin.ListPaging'
    ],
    config: {
        id: 'messagelist',
        title: '消息',
        cls: 'message-list',
        /* layout: 'fit',*/
        layout: 'vbox',
        items: [
            {
                layout: 'fit',
                flex: 49,
                items: [
                    {
                        itemId: 'list',
                        xtype: 'list',
                        store: 'messagestore',
                        cls: 'message-list',
                        itemTpl:new Ext.XTemplate(
                                '<div style="display:flex;flex-direction:row;align-items:center;">',
                                '<div class="message-div message-div-nocheck message-div-hide" id="{uuid}"><input type="hidden" class="message-check-id"></div>',//<img src="http://localhost:8080/ts-server/build/development/hdts/modern/resources/images/message/nocheck.png">,
                                '<div style="width:100%;" class="message-div-html">',
                                '<table width="100%" border="0"  class="message-table-html">',
                                '<tr>',
                                '<td width="65%" class="table-first-td7">{category}</td>',
                                '<td width="35%" class="table-first-td3">{time}</td>',
                                '</tr>',
                                '<tr>',
                                '<td  colspan="2" class="table-second-fold">{content}</td>',
                                '</tr>',
                                '<tr class="table-third-tr">',
                                '<tpl if="Common.overLength(content,full)==true">',
                                '<td  colspan="2" class="table-third-content">展开消息</td>',
                                '<tpl else>',
                                '<td  colspan="2" class="table-third-content" style="padding-top: 0.1rem"></td>',
                                '</tpl>',
                                '</tr>',
                                 '</table>',
                                 '</div>',
                                '</div>'
                        )
                    }
                ]
            },
            {
                xtype: 'label',
                cls: 'message-nav-bottom',
                itemId: 'message-nav-bottom',
                hidden: true,
                html: '<div style="display:flex;flex-direction:row;align-items:center;">'
                + '<div class="message-div-bottom message-div-nocheck" id="message-div-allcheck"></div>'
                + '<div class="message-div-text">全选</div>'
                + '<div class="message-div-delete" id="message-div-delete"></div>'
                + '</div>'
            }
        ],
        control: {
            '#list': {
                itemtap: 'onListItemTap'
            }
        }
    },
    initialize: function () {
        var me = this;
        me.callParent(arguments);
        /*页面list注册事件*/
        var listItem = me.down('#list');
        /*底部栏全选按钮*/
        var divBottomCheck = document.getElementsByClassName("message-div-bottom");
        /*每个list的选择按钮*/
        var listdivCheck = document.getElementsByClassName("message-div");
        /*底部栏注册事件*/
        var navBottom = me.down('#message-nav-bottom');
        navBottom.element.on({
            scope: this,
            /*
             对整个底部栏注册tap事件
             tap事件包含全选框的点击事件
             tap事件包含点击删除按钮事件
             */
            tap: function (e, t) {
                /*删除按钮点击事件*/
                if (e.target.id === 'message-div-delete') {
                    //直接实例化
                    var arr = new Array();
                    //console.log('****全选按钮****');
                    for (var i = 0; i < listdivCheck.length; i++) {
                        if (listdivCheck[i].className === 'message-div message-div-check') {
                            arr.push(listdivCheck[i].id);
                        }
                    }
                    /*如果未选择 则返回*/
                    if (arr.length <= 0) {
                        return;
                    } else {
                        MessageDelete.messagedelete({
                            params: {'ids': arr},
                            success: function (ret) {
                                var store = Ext.getStore('messagestore');
                                /*调用common中日期格式转换函数 参数（store，日期参数名）*/
                                Common.dateConversion(store, 'time');
                                var show = Ext.getCmp('messageMain').down('#button-edit');
                                show.setText('编辑');
                                me.down('#message-nav-bottom').hide();
                            },
                            failure: function (ret) {
                                MsgTip.remove();
                                MsgTip.msg(ret);
                            }
                        });
                    }
                }
                /*选择消息或者取消选择消息*/
                else if (e.target.id === 'message-div-allcheck') {
                    /*如果全选框为选择*/
                    if (e.target.className === 'message-div-bottom message-div-check') {
                        e.target.className = 'message-div-bottom message-div-nocheck';
                        for (var i = 0; i < listdivCheck.length; i++) {
                            listdivCheck[i].className = 'message-div message-div-nocheck'
                        }
                    }
                    /*如果全选框为未选择*/
                    else {
                        e.target.className = 'message-div-bottom message-div-check'
                        for (var i = 0; i < listdivCheck.length; i++) {
                            listdivCheck[i].className = 'message-div message-div-check'
                        }
                    }
                }
            }
        })
    },

    onListItemTap: function (list, index, target, record,e) {
        /*底部栏全选按钮*/
        var divBottomCheck = document.getElementsByClassName("message-div-bottom");
        /*每个list的选择按钮*/
        var listdivCheck = document.getElementsByClassName("message-div");
        /*展开消息点击事件*/
        if (e.target.innerText === '展开消息') {
            /*当前点击展开消息的父节点（tr）的父节点（tbody）的父节点（table）的子节点的第二个子元素（第二个tr）的第二个子节点的class名称*/
            e.target.parentNode.parentNode.parentNode.childNodes[0].children[1].childNodes[0].className = 'table-second-unfolded';
            /*当前点击展开消息的父节点（tr）的内容换成收起消息*/
            e.target.parentNode.innerHTML = '<td  colspan="2" class="table-third-content">收起消息</td>';
        }
        /*收起消息点击事件*/
        else if (e.target.innerText === '收起消息') {
            e.target.parentNode.parentNode.parentNode.childNodes[0].children[1].childNodes[0].className = 'table-second-fold';
            e.target.parentNode.innerHTML = '<td  colspan="2" class="table-third-content">展开消息</td>';
        }
        /*选择消息或者取消选择消息*/
            else if(e.target.localName==='div'){
             if (e.target.firstChild.className === 'message-check-id'&&e.target.localName==='div') {
                    if (e.target.className === 'message-div message-div-check') {
                        /*如果全选框为选择*/
                        if (divBottomCheck[0].className === 'message-div-bottom message-div-check') {
                            divBottomCheck[0].className = 'message-div-bottom message-div-nocheck';
                        }
                        e.target.className = 'message-div message-div-nocheck';
                    } else {
                        var j = 0;
                        /*计数*/
                        /*循环每个list 如果已选择则j 加1*/
                        for (var i = 0; i < listdivCheck.length; i++) {
                            if (listdivCheck[i].className === 'message-div message-div-check') {
                                j++;
                            }
                        }
                        /*判断list个数与j相减为1时 全选框选中*/
                        if ((listdivCheck.length - j) === 1) {
                            divBottomCheck[0].className = 'message-div-bottom message-div-check';
                        }
                        e.target.className = 'message-div message-div-check';
                    }
                }
        }
    }
});
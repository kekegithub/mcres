/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：NoticeList
 * 模块说明：
 * 修改历史：
 * 2017/3/21 - lihuiming - 创建
 */
Ext.define('hdts.view.notice.NoticeList', {
    extend: 'Ext.Container',
    alias: 'widget.noticelist',
    requires: [
        'Ext.Container',
        'Ext.Panel',
        'Ext.plugin.ListPaging'
        //'hdts.view.Select'
    ],
    config: {
        title: '公告',
        cls: 'notice-list',
        layout: 'fit',
        items: [
            {
                itemId: 'list',
                xtype: 'list',
                store: 'noticestore',
                cls: 'notice-list',
                 itemTpl: ['<div class="notice-div-html">'
                    + '<table width="100%" border="0"  class="notice-table-html">'
                    + '<tr>'
                 //判断是否存在附件
                    + '<tpl if="attachments.length==0">'
                    + ' <td width="70%" class="table-first-td7"><span class="notice-title-text">{title}</span></td>'
                    + '<tpl else>'
                    + ' <td width="70%" class="table-first-td7"><span class="notice-title-text">{title}</span><span class="notice-attachments-img"></span></td>'
                    +'</tpl>'
                     //+ ' <td width="70%" class="table-first-td7"><span class="notice-title-img"></span><span class="notice-title-text">{title}</span><span class="attachments-img"></span></td>'
                 //+ ' <td width="70%" class="table-first-td7"><span class="notice-title-text">{title}</span><span class="attachments-img"></span></td>'
                    + ' <td width="30%" class="table-first-td3"><span class="notice-time-text">{publishTime}</span><span class="notice-btn-right"></span></td>'
                    + ' </tr>'
                    + ' <tr >'
                    + '  <td  colspan="2" class="table-second-tr">发布者：{publisher}</td>'
                    + ' </tr>'
                    + ' <tr>'
                    + '  <td  colspan="2" class="table-third-tr">{content}</td>'
                    + ' </tr>'
                    + '</table>'
                    + '</div>'
                    ],
                plugins: [{
                    xclass: 'Ext.plugin.ListPaging',
                    autoPaging: true,
                    loadMoreText: '更多',
                    noMoreRecordsText :  "没有更多数据了!"
                }]
            }
        ],

        bubbleEvents: ['forward'],
        control: {
            '#list': {
                itemtap: 'onListItemTap'
            }
        }
    },
    initialize: function () {
        Ext.Viewport.setMasked(false);
        this.callParent(arguments);
    },
    onListItemTap: function (list, index, target, record) {
        var me = this;
        Ext.getCmp('noticeMain').fireEvent('forward', {
            xtype: 'noticedetail',
            record: record
        });
    }
});

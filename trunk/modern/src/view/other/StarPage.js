/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：StarPage
 * 模块说明：
 * 修改历史：
 * 2017/4/27 - lihuiming - 创建
 */
Ext.define('hdts.view.other.StarPage', {
    extend: 'Ext.Container',
    xtype: 'starpage',
    requires: [],
    config: {
        itemId: 'starpage',
        layout: 'vbox',
        scrollable: true,
        items: [
            {
                xtype: 'label',
                cls: 'hdcontainer-white',
                html:  '<div class="hdcontainer-white-html">'
                 + '<div class="hdcontainer-logo"></div>'
                 + '<div class="hdcontainer-white-column">'
                 + '<div class="hdcontainer-starpage-title">TS-CRE</div>'
                 + '<div class="hdcontainer-starpage-name">海鼎商户互动平台</div>'
                 + '</div>'
                 + '</div>'
            }
        ]
    },
    initialize: function () {
    }
});

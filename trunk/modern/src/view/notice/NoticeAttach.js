/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：NoticeAttach
 * 模块说明：
 * 修改历史：
 * 2017/3/24 - lihuiming - 创建
 */
Ext.define('hdts.view.notice.NoticeAttach', {
    extend: 'Ext.Container',
    xtype: 'noticeattach',
    alias: 'widget.noticeattach',
    requires: [
        'Ext.carousel.Carousel',
        'Ext.Panel'
    ],
    config: {
        id: 'noticeattach',
        title: '',//动态赋值
        imgAry: '',//公告详情页传递参数
        layout: 'card',
        cls: 'notice-attach',
        itemId: 'noticeattach',
        items: [
            {
                itemId: 'notice-attach-carousel',
                xtype: 'carousel',
                defaults: {
                    styleHtmlContent: true
                },
                indicator: false, //Carousel 去除底栏
                cls: 'notice-attach-carousel',
                items: [
                    /*{
                     html : '<img src="http://localhost:8080/ts-server/build/development/hdts/modern/resources/images/main/main-bg.png" width="100%" height="100%" name="1"/>'
                     },
                     {
                     html : '<img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4271053251,2424464488&fm=117&gp=0.jpg" width="100%" height="100%" name="2"/>'
                     },
                     {
                     html : '<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3432487329,2901563519&fm=117&gp=0.jpg" width="100%" height="100%" name="3"/>'
                     }*/
                ]
            }
        ],
        control: {
            '#notice-attach-carousel': {
                activeItemchange: 'activeItemchange'
            }
        }
    },
    initialize: function () {
        var me = this;
        Ext.getCmp('noticeMain').getNavigationBar().setCls("x-navigation-bar x-dock-item x-docked-top notice-main-titlebar");
        Ext.getCmp('noticeMain').getNavigationBar().getBackButton().setHidden(true);
        // Ext.getCmp('noticeMain').down("#button-back")
        //button-back x-layout-box-item x-layout-hbox-item
        var length = me._imgAry.length;//附件个数
        var carousel = this.down('#notice-attach-carousel');
        me.setTitle(1 + '/' + length);
        //屏幕高度
        var clientHeight = document.body.clientHeight;
        //屏幕宽度
        var clientWidth = document.body.clientWidth;
        Ext.getCmp('noticeMain').down("#button-download-icon").name = me._imgAry[0].url;
        // Ext.getCmp('noticeMain').down("#button-download-icon").name="http://localhost:8080/ts-server/build/development/hdts/modern/resources/images/main/main-bg.png"
        /*附件个数大于0 则追加到内容中*/
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                me.down('#notice-attach-carousel').add({
                    html: '<img src="' + me._imgAry[i].url + '" width="100%" name="' + (i + 1) + '" style="vertical-align:middle;"/>',
                    img: me._imgAry[i].url,
                    name: (i + 1)
                });
            }
        }

    },
    activeItemchange: function (sender, value, oldValue, eOpts) {
        var length = this._imgAry.length;
        Ext.getCmp('noticeMain').down("#button-download-icon").name = value.img;
        Ext.getCmp('noticeMain').getNavigationBar().setTitle(value.name+'/'+length);
    }
});
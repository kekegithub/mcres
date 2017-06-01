/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：NoticeDetail
 * 模块说明：
 * 修改历史：
 * 2017/3/21 - lihuiming - 创建
 */
Ext.define('hdts.view.notice.NoticeDetail', {
    extend: 'Ext.Container',
    xtype: 'noticedetail',
    alias: 'widget.noticedetail',
    requires: [
    ],
    record:'record',
    config: {
        id: 'noticedetail',
        title: '公告详情',
        layout: 'vbox',
        itemList: '',
        cls: 'notice-detail',
        itemId: 'noticedetail',
        scrollable: true,
        items: [
            /*公告详情*/
            {
                xtype: 'container',
                layout: 'vbox',
                cls: 'notice-detail-content',
                items:[
                    {
                        xtype: 'container',
                        cls: 'notice-detail-first',
                        layout: 'hbox',
                        items:[
                            {
                                xtype: 'label',
                                flex: 1,
                                cls: 'notice-content-title',
                                itemId: 'notice-content-title',
                                html: ''
                            },
                            {
                                xtype: 'image',
                                itemId: 'notice-content-amtimg',
                                cls: 'notice-content-amtimg'
                            },
                            {
                                xtype: 'label',
                                itemId: 'notice-content-amtnum',
                                cls: 'notice-content-amtnum',
                               html: ''
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        cls: 'notice-detail-second',
                        items:[
                            {
                                xtype: 'label',
                                html: '发布者：'
                            },
                            {
                                xtype: 'label',
                                itemId: 'notice-detail-second-publicher',
                                html: ''
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        cls: 'notice-detail-third',
                        items:[
                            {
                                xtype: 'label',
                                html: '时&nbsp;&nbsp;&nbsp;&nbsp;间：'
                            },
                            {
                                xtype: 'label',
                                itemId: 'notice-detail-third-publictime',
                                html: ''
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'label',
                cls: 'notice-detail-text',
                itemId: 'notice-detail-text',
                html: ''
            },
            {
                xtype: 'container',
                layout: 'vbox',
                cls: 'notice-detail-button',
                itemId: 'notice-detail-button',
                defaults:{
                  xtype: 'button'  
                },
                items: []
            }
        ]
    },
    initialize: function () {
        var me = this;
        //var title =me._record.data.title;
        var length=me._record.data.attachments.length;//附件个数
        var attachments=me._record.data.attachments;//附件组
        var imgtype=['bmp','png','gif','jpg','jpeg'];//图片类型集合
        var imgAry = [];//定义图片集合
        /*循环附件集合  把类型为图片的放入新的集合 star*/
        for(var i=0; i<attachments.length; i++){
            //if(imgtype.contains(attachments[i].fileType)){
            if(this.contains(imgtype,attachments[i].fileType)){
                imgAry.push(attachments[i]);
            }
        }
        /*循环附件集合  把类型为图片的放入新的集合 end*/
        me.down('#notice-content-title').setHtml(me._record.data.title);//标题赋值
        /*没有附件不出现附件图标，有附件再赋值个数 star*/
        if(length<=0){
            me.down('#notice-content-amtimg').hide();
            me.down('#notice-detail-button').hide();
        }else {
            me.down('#notice-content-amtnum').setHtml(length);//附件个数赋值
            /*开始循环附件组集合 star*/
            for(var i=0;i<length; i++){
                var attachments=this._record.data.attachments[i];
                /*附件类型小写转大写*/
                var fileType= attachments.fileType.toUpperCase();
                /*附件大小 数据开始为字节 先/1024处理为单位K*/
                var size=attachments.size/1024;
                /*处理附件单位 如果size大于1024 则转换单位为M 否则不变 star*/
                if(size>=1024){
                    size= (size/1024).toFixed(2)+'M'
                }else {
                    size=size.toFixed(0)+'K'
                }
                /*处理附件单位 如果size大于1024 则转换单位为M 否则不变 end*/
                /*判断附件类型 star*/
                if(this.contains(imgtype,attachments.fileType)){
                    me.down('#notice-detail-button').add( {
                        xtype: 'button',
                        cls: 'notice-detail-buttonjpg',
                        itemId: 'notice-detail-buttonjpg',
                        name:'button',
                        imgAry:imgAry,
                        text: '<table  border="0" style="border:none;	width:100%;text-align: left;"><tr><td rowspan="2" width="8.5rem"><span class="notice-detail-jpg">'+fileType+'</span></td> <td class="notice-detail-btnjpgname">'+attachments.name+'</td> <td rowspan="2" class="notice-detail-btnjpgimg"></td> </tr> <tr> <td class="notice-detail-btnjpgsize">'+size+'</td> </tr> </table>',
                        handler: function() {
                            //todo 销毁之前PUSH的视图
                            Ext.getCmp('noticeMain').fireEvent('forward', {
                                 xtype: 'noticeattach',
                                 imgAry:this.imgAry
                              });
                            Ext.Viewport.setMasked(false);//关闭loading
                        }
                    });
                }else {//if (ath.fileType==="pdf")
                    me.down('#notice-detail-button').add( {
                        xtype: 'button',
                        cls: 'notice-detail-buttonpdf',
                        name:'button',
                        itemId: 'notice-detail-buttonpdf',
                        url:attachments.url,
                        text: '<table border="0" style="border:none;width:100%;text-align: left;"><tr><td rowspan="2" width="8.5rem"><span class="notice-detail-pdf">'+fileType+'</span></td> <td class="notice-detail-btnjpgname">'+attachments.name+'</td> <td rowspan="2" class="notice-detail-btnjpgimg"></td> </tr> <tr> <td class="notice-detail-btnjpgsize">'+size+'</td> </tr> </table>',
                        handler: function(){
                            window.location.href = ''+this.url+'';
                        }
                    });
                }
                /*判断附件类型 end*/
            }
            /*循环附件组集合  end*/
        }
        /*没有附件不出现附件图标，有附件再赋值个数 end*/
        me.down('#notice-detail-second-publicher').setHtml(me._record.data.publisher);//发布者
        me.down('#notice-detail-third-publictime').setHtml(me._record.data.publishTime);//时间
        me.down('#notice-detail-text').setHtml(me._record.data.content);//内容
    },
    contains:function (arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
});
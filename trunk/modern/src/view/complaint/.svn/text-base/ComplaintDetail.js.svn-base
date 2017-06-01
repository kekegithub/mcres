/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ComplaintDetail
 * 模块说明：
 * 修改历史：
 * 2017/4/17 - lihuiming - 创建
 */
Ext.define('hdts.view.complaint.ComplaintDetail', {
    extend: 'Ext.Container',
    xtype: 'complaintdetail',
    alias: 'widget.complaintdetail',
    requires: [
        'hdts.service.complaint.ComplaintService'
    ],
    billUuid: null,
    config: {
        id: 'complaintdetail',
        title: '投诉单详情',
        layout: 'vbox',
        itemList: '',
        cls: 'hdcontainer-bg',
        itemId: 'complaintdetail',
        scrollable: true,
        items: [
            /*已完成*/
            {
                xtype: 'container',
                layout: 'vbox',
                itemId: 'ComplaintStatusbar',
                cls: 'hdcontainer-statusIneffect',
                items: [
                    {
                        xtype: 'label',
                        flex: 2,
                        itemId: 'complaintState',
                        cls: 'hdlabel-billStatus',
                        html: '已完成'
                    },
                    {
                        xtype: 'label',
                        flex: 1,
                        itemId: 'complaintBillNumber',
                        cls: 'hdlabel-billnumber',
                        html: '单号：S16121300001'
                    }

                ]
            },
            {
                xtype: 'component',
                cls: 'hdspace'
            },
            /*报修*/
            {
                xtype: 'container',
                layout: 'vbox',
                cls: 'hdcontainer-content',
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                flex: 1,
                                cls: 'hdlabel-content-title',
                                html: '投诉'
                            },
                            {
                                xtype: 'label',
                                flex: 2,
                                itemId: 'reportTime',
                                cls: 'hdlabel-content-titletime',
                                html: '2016年12月13日 15:51'
                            }
                        ]
                    },
                    {
                        xtype: 'component',
                        cls: 'hdcomponent-split',
                        html: '<hr class="hdhr"/>'
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                width: 70,
                                cls: 'hdlabel-itemleft',
                                html: '投诉人：'
                            },
                            {
                                xtype: 'label',
                                flex: 1,
                                itemId: 'reportMan',
                                cls: 'hdlabel-itemright',
                                html: '老李'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'hdlabel-itemleft',
                                html: '投诉类型：'
                            },
                            {
                                xtype: 'label',
                                flex: 1,
                                itemId: 'complaintType',
                                cls: 'hdlabel-itemright',
                                html: '吊顶'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'hdlabel-itemleft',
                                html: '联系方式：'
                            },
                            {
                                xtype: 'label',
                                flex: 2,
                                itemId: 'contactInfo',
                                cls: 'hdlabel-itemright',
                                html: '13482488393'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'hdlabel-itemleft',
                                html: '详情描述：'
                            },
                            {
                                xtype: 'label',
                                flex: 2,
                                itemId: 'complaintContent',
                                cls: 'hdlabel-itemright',
                                html: '投诉内容，投诉内容，投诉内容，投诉内容，投诉内容'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        itemId: 'beforePicture',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'hdlabel-itemleft',
                                html: '照片描述：'
                            },
                            {
                                xtype: 'container',
                                flex: 2,
                                layout: 'hbox',
                                cls: 'hdlabel-itemright',
                                items: [
                                    {
                                        xtype: 'image',
                                        height: 80,
                                        width: 100,
                                        itemId: 'beforePicture1',
                                        imgCls: 'hdimage-picture',
                                        mode: 'element'
                                        //src: 'resources/images/shoe1.jpg'
                                    },
                                    {
                                        xtype: 'panel',
                                        width: 15
                                    },
                                    {
                                        xtype: 'image',
                                        height: 80,
                                        width: 100,
                                        itemId: 'beforePicture2',
                                        imgCls: 'hdimage-picture',
                                        mode: 'element'
                                        //src: 'resources/images/shoe2.jpg'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'component',
                cls: 'hdspace',
                itemId: 'startRepairSpace'
            },
            /*开始维修*/
            {
                xtype: 'container',
                itemId: 'startRepairBlock',
                layout: 'vbox',
                cls: 'hdcontainer-content',
                height: '100px',
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                flex: 1,
                                cls: 'hdlabel-content-title',
                                html: '受理'
                            },
                            {
                                xtype: 'label',
                                flex: 2,
                                itemId: 'complaintBeginTime',
                                cls: 'hdlabel-content-titletime',
                                html: '2016年12月13日 15:51'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        cls: 'hdcomponent-split',
                        html: '<hr class="hdhr"/>'
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                width: 70,
                                cls: 'hdlabel-itemleft',
                                html: '受理人：'
                            },
                            {
                                xtype: 'label',
                                flex: 1,
                                itemId: 'repairMan',
                                cls: 'hdlabel-itemright',
                                html: '老徐'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'component',
                cls: 'hdspace',
                itemId: 'endRepairSpace'
            },
            /*解决*/
            {
                xtype: 'container',
                itemId: 'endRepairBlock',
                layout: 'vbox',
                cls: 'hdcontainer-content',
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                flex: 1,
                                cls: 'hdlabel-content-title',
                                html: '解决'
                            },
                            {
                                xtype: 'label',
                                flex: 2,
                                itemId: 'complaintEndTime',
                                cls: 'hdlabel-content-titletime',
                                html: '2016年12月13日 15:51'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        cls: 'hdcomponent-split',
                        html: '<hr class="hdhr"/>'
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                width: 70,
                                cls: 'hdlabel-itemleft',
                                html: '问题等级：'
                            },
                            {
                                xtype: 'label',
                                flex: 1,
                                itemId: 'otherPeople',
                                cls: 'hdlabel-itemright',
                                html: '高'
                            }
                        ]
                    },

                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                width: 70,
                                cls: 'hdlabel-itemleft',
                                html: '过程记录：'
                            },
                            {
                                xtype: 'label',
                                flex: 1,
                                itemId: 'processRecords',
                                cls: 'hdlabel-itemright',
                                html: '过程记录，过程记录，过程记录，过程记录，过程记录<br>2017年2月15日 11:17'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'component',
                cls: 'hdspace',
                itemId: 'feeSpace'
            },
            {
                xtype: 'component',
                cls: 'hdspace',
                itemId: 'finishSpace'
            },
            /*完成*/
            {
                xtype: 'container',
                itemId: 'finishBlock',
                layout: 'vbox',
                cls: 'hdcontainer-content',
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                flex: 1,
                                cls: 'hdlabel-content-title',
                                html: '完成'
                            },
                            {
                                xtype: 'label',
                                flex: 3,
                                itemId: 'complaint-mfinishTime',
                                cls: 'hdlabel-content-titletime',
                                html: '2016年12月13日 15:51'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        cls: 'hdcomponent-split',
                        html: '<hr class="hdhr" />'
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'hdlabel-itemleft',
                                html: '回访备注：'
                            },
                            {
                                xtype: 'label',
                                flex: 1,
                                itemId: 'returnVisitRemark',
                                cls: 'hdlabel-itemright',
                                html: '回访备注，回访备注，回访备注，回访备注，回访备注，回访备注'
                            }
                        ]
                    }
                ]
            }
        ],

        listeners: {
            loadData: 'onLoadData'
        }
    },

    initialize: function () {
        // var uuid = this.billUuid;
        this.onLoadData();
    },

    onLoadData: function () {
        var me = this;
        var uuid = me.billUuid;
        ComplaintService.getBill({
            params: {'uuid': uuid},
            success: function (ret) {
                var detailInfo = ret.data;
                me.down('#complaintBillNumber').setHtml("单号：" + detailInfo.billNumber);    //单号

                //状态
                if (detailInfo.state === "ineffect") {
                    me.down('#complaintState').setHtml("未生效");
                    // me.down('#MaintainStatusbar').setCls("hdcontainer-statusIneffect");

                    me.down('#startRepairSpace').setHidden(true);   //开始维修灰色空白行
                    me.down('#startRepairBlock').setHidden(true);   //开始维修栏
                    me.down('#endRepairSpace').setHidden(true);     //维修结束灰色空白行
                    me.down('#endRepairBlock').setHidden(true);     //维修结束栏
                    /* me.down('#feeSpace').setHidden(true);           //费用信息灰色空白行*/
                    me.down('#finishSpace').setHidden(true);        //完成栏灰色空白行
                    me.down('#finishBlock').setHidden(true);        //完成栏
                }
                else if (detailInfo.state === "repairing") {
                    me.down('#complaintState').setHtml("处理中");
                    //me.down('#MaintainStatusbar').setCls("hdcontainer-statusRepairing");

                    me.down('#endRepairSpace').setHidden(true);     //维修结束灰色空白行
                    me.down('#endRepairBlock').setHidden(true);     //维修结束栏
                    me.down('#finishSpace').setHidden(true);        //完成栏灰色空白行
                    me.down('#finishBlock').setHidden(true);        //完成栏
                }
                else if (detailInfo.state === "distracted") {
                    me.down('#complaintState').setHtml("已转移");
                    //me.down('#MaintainStatusbar').setCls("hdcontainer-statusDistracted");
                    me.down('#finishSpace').setHidden(true);        //完成栏灰色空白行
                    me.down('#finishBlock').setHidden(true);        //完成栏
                }
                else if (detailInfo.state === "solved") {
                    me.down('#complaintState').setHtml("已解决");
                    //me.down('#MaintainStatusbar').setCls("hdcontainer-statusSolved");
                    me.down('#finishSpace').setHidden(true);        //完成栏灰色空白行
                    me.down('#finishBlock').setHidden(true);        //完成栏
                }
                else if (detailInfo.state === "finished") {
                    me.down('#complaintState').setHtml("已完成");
                    //me.down('#MaintainStatusbar').setCls("hdcontainer-statusFinished");
                }
                else if (detailInfo.state === "aborted") {
                    me.down('#complaintState').setHtml("已作废");
                    //me.down('#MaintainStatusbar').setCls("hdcontainer-statusFinished");
                }
                //受理栏：未生效状态只显示投诉栏，其它栏不显示
                me.down('#reportTime').setHtml(Ext.Date.format(new Date(detailInfo.happenTime), 'Y年m月d日 H:i')); //投诉时间
                me.down('#reportMan').setHtml(detailInfo.complainantName);       //投诉人
                me.down('#complaintType').setHtml(detailInfo.complaintType); //投诉类型
                me.down('#contactInfo').setHtml(detailInfo.contactInfo);   //联系方式
                me.down('#complaintContent').setHtml(detailInfo.complaintContents); //详情描述


                if (detailInfo.beforePictures && (detailInfo.beforePictures.length > 0)) {
                    if (detailInfo.beforePictures > 1) {
                        me.down('#beforePicture1').setSrc(detailInfo.beforePictures[0].url);
                        me.down('#beforePicture2').setSrc(detailInfo.beforePictures[1].url);
                    } else {
                        me.down('#beforePicture1').setSrc(detailInfo.beforePictures[0].url);
                        //me.down('#beforePicture2').setVisible(false);
                        me.down('#beforePicture2').setHidden(true);
                    }
                } else {
                    me.down('#beforePicture').setHidden(true);
                }

                if (detailInfo.state === "ineffect")
                    return;

                //投诉受理栏：受理状态显示投诉栏，开始受理栏，其它栏不显示
                me.down('#complaintBeginTime').setHtml(Ext.Date.format(new Date(detailInfo.acceptTime), 'Y年m月d日 H:i'));  //开始受理时间
                me.down('#repairMan').setHtml(detailInfo.acceptMan);   //受理人员

                if (detailInfo.state === "repairing")
                    return;

                //结束栏
                me.down('#complaintEndTime').setHtml(Ext.Date.format(new Date(detailInfo.processTime), 'Y年m月d日 H:i'));      //解决时间
                if (detailInfo.processRecords && detailInfo.processRecords.length > 0) {
                    var records;
                    for (var i = 0; i < detailInfo.processRecords.length; i++) {
                        var content = detailInfo.processRecords[i].content;
                        var time = detailInfo.processRecords[i].operatorTime;
                        if (content) {
                            records = records + content;
                            if (time) {
                                records = records + "<br>";
                                records = records + "<span class='ineffect-txt'>" + Ext.Date.format(new Date(time), 'Y年m月d日 H:i') + "</span>";
                                records = records + "<br>";
                            }
                        }
                    }
                    me.down('#processRecords').setHtml(records);   //过程记录
                }
                me.down('#complaint-mfinishTime').setHtml(Ext.Date.format(new Date(detailInfo.finishTime), 'Y年m月d日 H:i'));      //结束时间
                //完成栏
                me.down('#returnVisitRemark').setHtml(detailInfo.returnVisitRemark);     //回访备注
            },
            failure: function (ret) {
                console.dir(ret);
            }
        });
    }
});

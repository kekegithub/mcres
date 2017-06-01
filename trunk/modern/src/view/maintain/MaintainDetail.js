/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：MaintainDetail
 * 模块说明：工程报修单明细
 * 修改历史：
 * 2017/3/20 - zhaolingling - 创建
 */
Ext.define('hdts.view.maintain.MaintainDetail', {
  extend: 'Ext.Container',
  xtype: 'maintain-detail',
  alias: 'widget.maintain-detail',
  requires: [
    'hdts.service.maintain.MaintainService',
    'hdts.model.maintain.FeeRecordModel',
    'hdts.store.maintain.FeeRecordStore'
  ],
  billUuid: null,
  config: {
    id: 'maintain-detail',
    title: '报修单详情',
    layout: 'vbox',
    itemList: '',
    cls: 'hdcontainer-bg',
    itemId: 'maintain-detail',
    scrollable: true,
    items: [
      /*状态栏已完成*/
      {
        xtype: 'container',
        layout: 'vbox',
        itemId: 'MaintainStatusbar',
        cls: 'hdcontainer-statusIneffect',
        items:[
          {
            xtype: 'label',
            flex:2,
            itemId: 'maintainState',
            cls: 'hdlabel-billStatus',
            html: '已完成'
          },
          {
            xtype: 'label',
            flex:1,
            itemId: 'maintainBillNumber',
            cls: 'hdlabel-billnumber',
            html: '单号：S16121300001'
          }

        ]
      },
      /*报修*/
      {
        xtype: 'container',
        layout: 'vbox',
        cls: 'hdcontainer-content hdmargintop16',
        items:[
          {
            xtype: 'container',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                flex: 1,
                cls: 'hdlabel-content-title',
                html: '报修'
              },
              {
                xtype: 'label',
                flex: 2,
                itemId: 'reportTime',
                cls: 'hdlabel-content-titletime',
                html: ''
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
            items:[
              {
                xtype: 'label',
                width:75,
                cls: 'hdlabel-itemleft',
                html: '报修人：'
              },
              {
                xtype: 'label',
                flex: 1,
                itemId: 'reportMan',
                cls: 'hdlabel-itemright',
                html: ''
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                width:75,
                cls: 'hdlabel-itemleft',
                html: '报修类型：'
              },
              {
                xtype: 'label',
                flex: 1,
                itemId: 'maintainType',
                cls: 'hdlabel-itemright',
                html: ''
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                width:75,
                cls: 'hdlabel-itemleft',
                html: '报修地点：'
              },
              {
                xtype: 'label',
                flex: 2,
                itemId: 'maintainAddress',
                cls: 'hdlabel-itemright',
                html: ''
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                width:75,
                cls: 'hdlabel-itemleft',
                html: '联系方式：'
              },
              {
                xtype: 'label',
                flex: 2,
                itemId: 'contactInfo',
                cls: 'hdlabel-itemright',
                html: ''
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                width:75,
                cls: 'hdlabel-itemleft',
                html: '期望时间：'
              },
              {
                xtype: 'label',
                flex: 2,
                itemId: 'appointmentTime',
                cls: 'hdlabel-itemright',
                html: ''
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                width:75,
                cls: 'hdlabel-itemleft',
                html: '详情描述：'
              },
              {
                xtype: 'label',
                flex: 2,
                itemId: 'maintainContent',
                cls: 'hdlabel-itemright',
                html: ''
              }
            ]
          },
          {
            xtype: 'container',
            itemId: 'beforePicture',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                width:75,
                cls: 'hdlabel-itemleft',
                html: '照片描述：'
              },
              {
                xtype: 'container',
                flex: 2,
                layout: 'hbox',
                cls: 'hdlabel-itemright',
                items:[
                  {
                    xtype: 'image',
                    height: 80,
                    width:100,
                    itemId: 'beforePicture1',
                    imgCls: 'hdimage-picture',
                    mode: 'element',
                    //src: 'resources/images/shoe1.jpg'
                  },
                  {
                    xtype: 'panel',
                    width:15
                  },
                  {
                    xtype: 'image',
                    height: 80,
                    width:100,
                    itemId: 'beforePicture2',
                    imgCls: 'hdimage-picture',
                    mode: 'element',
                    //src: 'resources/images/shoe2.jpg'
                  }
                ]
              }
            ]
          }
        ]
      },
      /*开始维修*/
      {
        xtype: 'container',
        itemId: 'startRepairBlock',
        layout: 'vbox',
        cls: 'hdcontainer-content hdmargintop16',
        height:'100px',
        items:[
          {
            xtype: 'container',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                flex: 1,
                cls: 'hdlabel-content-title',
                html: '开始维修'
              },
              {
                xtype: 'label',
                flex: 2,
                itemId: 'maintainBeginTime',
                cls: 'hdlabel-content-titletime',
                html: ''
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
            items:[
              {
                xtype: 'label',
                width:75,
                cls: 'hdlabel-itemleft',
                html: '维修人员：'
              },
              {
                xtype: 'label',
                flex: 1,
                itemId: 'repairMan',
                cls: 'hdlabel-itemright',
                html: ''
              }
            ]
          }
        ]
      },
      /*维修结束*/
      {
        xtype: 'container',
        itemId: 'endRepairBlock',
        layout: 'vbox',
        cls: 'hdcontainer-content hdmargintop16',
        items:[
          {
            xtype: 'container',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                flex: 1,
                cls: 'hdlabel-content-title',
                html: '维修结束'
              },
              {
                xtype: 'label',
                flex: 2,
                itemId: 'maintainEndTime',
                cls: 'hdlabel-content-titletime',
                html: ''
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
            items:[
              {
                xtype: 'label',
                width:75,
                cls: 'hdlabel-itemleft',
                html: '其他人员：'
              },
              {
                xtype: 'label',
                flex: 1,
                itemId: 'otherPeople',
                cls: 'hdlabel-itemright',
                html: ''
              }
            ]
          },

          {
            xtype: 'container',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                width:75,
                cls: 'hdlabel-itemleft',
                html: '过程记录：'
              },
              {
                xtype: 'label',
                flex: 1,
                itemId: 'processRecords',
                cls: 'hdlabel-itemright',
                html: ''
              }
            ]
          },
          {
            xtype: 'container',
            itemId: 'afterPicture',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                width:75,
                cls: 'hdlabel-itemleft',
                html: '完成照片：'
              },
              {
                xtype: 'container',
                flex: 1,
                layout: 'hbox',
                cls: 'hdlabel-itemright',
                items:[
                  {
                    xtype: 'image',
                    height: 80,
                    width:100,
                    itemId: 'afterPicture1',
                    imgCls: 'hdimage-picture',
                    mode: 'element',
                    //src: 'resources/images/shoe1.jpg'
                  },
                  {
                    xtype: 'panel',
                    width:15
                  },
                  {
                    xtype: 'image',
                    height: 80,
                    width:100,
                    itemId: 'afterPicture2',
                    imgCls: 'hdimage-picture',
                    mode: 'element',
                    //src: 'resources/images/shoe2.jpg'
                  }
                ]
              }
            ]
          }
        ]
      },
      /*费用信息*/
      {
        xtype: 'container',
        itemId: 'feeBlock',
        layout: 'vbox',
        cls: 'hdcontainer-content hdmargintop16',
        items:[
          {
            xtype: 'container',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                flex: 1,
                cls: 'hdlabel-content-title',
                html: '费用信息'
              },
              {
                xtype: 'label',
                flex: 2,
                itemId: 'maintain-feeTotal',
                cls: 'hdlabel-content-feetotal',
                html: '￥150.00'
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
            layout: 'vbox',
            cls: 'hdcontainer-tablehead',
            items:[
              {
                xtype: 'container',
                layout: 'hbox',
                items:[
                  {
                    xtype: 'label',
                    flex: 1,
                    cls: 'hdtablehead-left',
                    html: '项目'
                  },
                  {
                    xtype: 'label',
                    flex: 1,
                    cls: 'hdtablehead-center',
                    html: '数量'
                  },
                  {
                    xtype: 'label',
                    flex: 1,
                    cls: 'hdtablehead-center',
                    html: '单价'
                  },
                  {
                    xtype: 'label',
                    flex: 1,
                    cls: 'hdtablehead-right',
                    html: '合计'
                  }
                ]
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
            layout: 'vbox',
            cls: 'hdcontainer-tablecontent',
            items:[
              {
                xtype: 'list',
                itemId: 'feeTable',
                store: '',
                itemTpl: ['<div>'
                + '<table width="100%" class="hdtable-content" border="0">'
                + ' <td width="25%"  >{subject}</td>'
                + ' <td width="25%" style="text-align:center">{quantity}</td>'
                + ' <td width="25%" style="text-align:center">{unitPrice}</td>'
                + ' <td width="25%" style="text-align:right;padding-right:5px">{total}</td>'
                + ' </tr>'
                + '</table>'
                + '</div>'
                ]
              }
            ]



          }
        ]
      },
      /*完成*/
      {
        xtype: 'container',
        itemId: 'finishBlock',
        layout: 'vbox',
        cls: 'hdcontainer-content hdmargintop16',
        items:[
          {
            xtype: 'container',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                flex: 1,
                cls: 'hdlabel-content-title',
                html: '完成'
              },
              {
                xtype: 'label',
                flex: 3,
                itemId: 'maintain-mfinishTime',
                cls: 'hdlabel-content-titletime',
                html: ''
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
            items:[
              {
                xtype: 'label',
                width:80,
                cls: 'hdlabel-itemleft',
                html: '回访备注：'
              },
              {
                xtype: 'label',
                flex: 1,
                itemId: 'returnVisitRemark',
                cls: 'hdlabel-itemright',
                html: ''
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                width:80,
                cls: 'hdlabel-itemleft',
                html: '评价：'
              },
              {
                xtype: 'label',
                flex: 1,
                itemId: 'evaluate',
                cls: 'hdlabel-itemright',
                html: ''
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

  },

  onLoadData: function () {
    var me = this;
    var uuid = me.billUuid;
    MaintainService.getBill({
      params: {'uuid': uuid},
      success : function(ret) {
        var detailInfo = ret.data;


        me.down('#maintainBillNumber').setHtml("单号：" + detailInfo.billNumber);    //单号

        //状态
        if(detailInfo.state === "ineffect"){
          me.down('#maintainState').setHtml("未生效");
          me.down('#MaintainStatusbar').setCls("hdcontainer-statusBarRed x-layout-box-item x-layout-vbox-item");

          me.down('#startRepairBlock').setHidden(true);   //开始维修栏
          me.down('#endRepairBlock').setHidden(true);     //维修结束栏
          me.down('#feeBlock').setHidden(true);           //费用信息栏
          me.down('#finishBlock').setHidden(true);        //完成栏
        }
        else if(detailInfo.state === "repairing"){
          me.down('#maintainState').setHtml("维修中");
          me.down('#MaintainStatusbar').setCls("hdcontainer-statusBarPurle x-layout-box-item x-layout-vbox-item");

          me.down('#endRepairBlock').setHidden(true);     //维修结束栏
          me.down('#feeBlock').setHidden(true);           //费用信息栏
          me.down('#finishBlock').setHidden(true);        //完成栏
        }
        else if(detailInfo.state === "distracted"){
          me.down('#maintainState').setHtml("已转移");
          me.down('#MaintainStatusbar').setCls("hdcontainer-statusDistracted x-layout-box-item x-layout-vbox-item");
          me.down('#finishBlock').setHidden(true);        //完成栏
        }
        else if(detailInfo.state === "solved"){
          me.down('#maintainState').setHtml("已解决");
          me.down('#MaintainStatusbar').setCls("hdcontainer-statusaBarBlue x-layout-box-item x-layout-vbox-item");
          me.down('#finishBlock').setHidden(true);        //完成栏
        }
        else if(detailInfo.state === "finished"){
          me.down('#maintainState').setHtml("已完成");
          me.down('#MaintainStatusbar').setCls("hdcontainer-statusBarBlueGreen x-layout-box-item x-layout-vbox-item");
        }
        else if(detailInfo.state === "aborted"){
          me.down('#maintainState').setHtml("已作废");
          me.down('#MaintainStatusbar').setCls("hdcontainer-statusFinished x-layout-box-item x-layout-vbox-item");
        }

        //报修栏：未生效状态只显示报修栏，其它栏不显示
        me.down('#reportTime').setHtml(Ext.Date.format(new Date(detailInfo.reportTime), 'Y年m月d日 H:i')); //报修时间
        me.down('#reportMan').setHtml(detailInfo.reportMan);       //报修人
        me.down('#maintainType').setHtml(detailInfo.maintainType); //报修类型
        me.down('#maintainAddress').setHtml(detailInfo.maintainAddress); //报修地点
        me.down('#contactInfo').setHtml(detailInfo.contactInfo);   //联系方式
        me.down('#appointmentTime').setHtml(Ext.Date.format(new Date(detailInfo.appointmentTime), 'Y/m/d H:i'));      //期望时间
        me.down('#maintainContent').setHtml(detailInfo.maintainContent); //详情描述

        //维修前照片
        if(detailInfo.beforePictures && detailInfo.beforePictures.length > 0){
          if(detailInfo.beforePictures.length > 1){
            me.down('#beforePicture1').setSrc(detailInfo.beforePictures[0].url);
            me.down('#beforePicture2').setSrc(detailInfo.beforePictures[1].url);
          }else{
            me.down('#beforePicture1').setSrc(detailInfo.beforePictures[0].url);
            //me.down('#beforePicture2').setVisible(false);
            me.down('#beforePicture2').setHidden(true);
          }
        }else{
          me.down('#beforePicture').setHidden(true);
        }


        if(detailInfo.state === "ineffect")
            return;

        //开始维修栏：维修中状态显示报修栏，开始维修栏，其它栏不显示
        if(detailInfo.maintainBeginTime == null || detailInfo.maintainBeginTime == "undefined"){
          me.down('#maintainBeginTime').setHtml("");  //开始维修时间
        }else{
          me.down('#maintainBeginTime').setHtml(Ext.Date.format(new Date(detailInfo.maintainBeginTime), 'Y年m月d日 H:i'));  //开始维修时间
        }

        me.down('#repairMan').setHtml(detailInfo.repairMan);   //维修人员

        if(detailInfo.state === "repairing")
            return;


        //维修结束栏
        me.down('#maintainEndTime').setHtml(Ext.Date.format(new Date(detailInfo.maintainEndTime), 'Y年m月d日 H:i'));      //维修结束时间
        me.down('#otherPeople').setHtml(detailInfo.repairMan);   //其他人员
        if(detailInfo.processRecords && detailInfo.processRecords.length > 0){
          var records;
          for(var i=0; i<detailInfo.processRecords.length; i++){
            var content = detailInfo.processRecords[i].content;
            var time = detailInfo.processRecords[i].operatorTime;
            if(content){
              records = records + content;
              if(time){
                
                records = records + "<br>";
                records = records + "<span class='ineffect-txt'>" + Ext.Date.format(new Date(time), 'Y年m月d日 H:i') + "</span>";
                records = records + "<br>";
              }
            }
             
          }
          me.down('#processRecords').setHtml(records);   //过程记录
        }

        //完成照片
        if(detailInfo.afterPictures && detailInfo.afterPictures.length > 0){
          if(detailInfo.afterPictures.length > 1){
            me.down('#afterPicture1').setSrc(detailInfo.afterPictures[0].url);
            me.down('#afterPicture2').setSrc(detailInfo.afterPictures[1].url);
          }else{
            me.down('#afterPicture1').setSrc(detailInfo.afterPictures[0].url);
            me.down('#afterPicture2').setHidden(true);
          }
        }else{
          me.down('#afterPicture').setHidden(true);
        }

        //费用信息
        if(typeof(Ext.getStore('feeRecordStore')) == "undefined"){
          Ext.create('hdts.store.maintain.FeeRecordStore');
        }

        if(detailInfo.feeRecords == null || detailInfo.feeRecords.length ==0){
          me.down('#feeBlock').setHidden(true);
        }else {
          var myStore = Ext.getStore('feeRecordStore');
          var feeTotal = 0;

          for(var i =0; i<detailInfo.feeRecords.length; i++){
            myStore.add({ subject: detailInfo.feeRecords[i].subject,
                          quantity: detailInfo.feeRecords[i].quantity,
                          unitPrice: detailInfo.feeRecords[i].unitPrice,
                          total: detailInfo.feeRecords[i].total });
            feeTotal += detailInfo.feeRecords[i].total;
          }
          myStore.reload();

          me.down('#feeTable').setStore(myStore);
          me.down('#maintain-feeTotal').setHtml("￥" + feeTotal);

        }

        if(detailInfo.state === "solved")
          return;

        if(detailInfo.state === "distracted")
          return;


        //完成栏
        me.down('#returnVisitRemark').setHtml(detailInfo.returnVisitRemark);     //回访备注
        if(detailInfo.evaluate){
          if(detailInfo.evaluate.value == "satisfied"){
            me.down('#evaluate').setHtml("满意");     //评价
          }else if(detailInfo.evaluate.value == "dissatisfied"){
            me.down('#evaluate').setHtml("不满意");     //评价
          }else{
            me.down('#evaluate').setHtml(detailInfo.evaluate);
          }
        }

      },
      failure : function(ret) {
        console.dir(ret);
      }
    });
  }


});

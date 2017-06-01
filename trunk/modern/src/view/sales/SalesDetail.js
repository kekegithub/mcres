/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：SalesDetail
 * 模块说明：销售录入单明细
 * 修改历史：
 * 2017/4/19 - zhaolingling - 创建
 */
Ext.define('hdts.view.sales.SalesDetail', {
  extend: 'Ext.Container',
  xtype: 'salesdetail',
  alias: 'widget.salesdetail',
  requires: [
    'hdts.service.sales.SalesService',
    'hdts.view.sales.SalesBill',
    'hdts.model.sales.PayRecordModel'
  ],
  billUuid: null,
  taskFoward: false,
  config: {
    id: 'salesdetail',
    title: '录入单详情',
    layout: 'vbox',
    itemList: '',
    cls: 'hdcontainer-bg',
    itemId: 'sales-detail',
    scrollable: true,
    items: [
      /*状态栏已完成*/
      {
        xtype: 'container',
        layout: 'vbox',
        itemId: 'SalesStatusbar',
        cls: 'hdcontainer-statusIneffect',
        items:[
          {
            xtype: 'label',
            flex:2,
            itemId: 'salesState',
            cls: 'hdlabel-billStatus',
            html: '已审核'
          },
          {
            xtype: 'label',
            flex:1,
            itemId: 'salesBillNumber',
            cls: 'hdlabel-billnumber',
            html: '单号：S16121300001'
          }

        ]
      },
      /*基本信息栏*/
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
                html: '基本信息'
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
                html: '本单合计：'
              },
              {
                xtype: 'label',
                flex: 1,
                itemId: 'saleTotal',
                cls: 'hdlabel-itemright',
                html: '¥234567.00'
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
                html: '录入来源：'
              },
              {
                xtype: 'label',
                flex: 1,
                itemId: 'inputSource',
                cls: 'hdlabel-itemright',
                html: '商场'
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
                html: '录入日期：'
              },
              {
                xtype: 'label',
                flex: 2,
                itemId: 'saleDate',
                cls: 'hdlabel-itemright',
                html: '2017/2/15'
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
                html: '商&nbsp;&nbsp;&nbsp;&nbsp;品：'
              },
              {
                xtype: 'label',
                flex: 2,
                itemId: 'product',
                cls: 'hdlabel-itemright',
                html: '商品1'
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
                html: '本单笔数：'
              },
              {
                xtype: 'label',
                flex: 2,
                itemId: 'saleCount',
                cls: 'hdlabel-itemright',
                html: '5'
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
                html: '当日累计：'
              },
              {
                xtype: 'label',
                flex: 2,
                itemId: 'saleDaySum',
                cls: 'hdlabel-itemright',
                html: '¥1234567.00'
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
                html: '说&nbsp;&nbsp;&nbsp;&nbsp;明：'
              },
              {
                xtype: 'label',
                flex: 2,
                itemId: 'remark',
                cls: 'hdlabel-itemright',
                html: '说明，说明，说明，说明，说明，说明，说明，说明，说明，说明，说明，说明，说明'
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
                html: '照片附件：'
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
                    mode: 'element'
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
                    mode: 'element'
                    //src: 'resources/images/shoe2.jpg'
                  }
                ]
              }
            ]
          }
        ]
      },
      /*支付明细*/
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
                html: '支付明细'
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
                + ' <td width="30%"  >{subject}</td>'
                + ' <td width="70%" style="text-align:right;padding-right:5px">{total}</td>'
                + ' </tr>'
                + '</table>'
                + '</div>'
                ]
              }
            ]



          }
        ]
      },
      /*审核信息*/
      {
        xtype: 'container',
        itemId: 'verifyBlock',
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
                html: '审核信息'
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
                html: '审&nbsp;核&nbsp;人：'
              },
              {
                xtype: 'label',
                flex: 1,
                itemId: 'verifyMan',
                cls: 'hdlabel-itemright',
                html: '老崔'
              }
            ]
          },
          {
            xtype: 'container',
            itemId: 'rejectReasonCont',
            layout: 'hbox',
            items:[
              {
                xtype: 'label',
                width:80,
                cls: 'hdlabel-itemleft',
                html: '驳回原因：'
              },
              {
                xtype: 'label',
                flex: 1,
                itemId: 'rejectReason',
                cls: 'hdlabel-itemright',
                html: '驳回原因'
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
                html: '审核时间：'
              },
              {
                xtype: 'label',
                flex: 1,
                itemId: 'verifyTime',
                cls: 'hdlabel-itemright',
                html: '2017/2/16'
              }
            ]
          }
        ]
      },
      {
        xtype: 'button',
        docked: 'bottom',
        itemId: 'editSalesBill',
        cls: 'edit-button',
        text: '编辑'
      }
    ],
    control: {
      '#editSalesBill': {
        tap: 'onEditSalesBillTap'
      }
    },
    listeners: {
      loadData: 'onLoadData'
    }
  },


  initialize: function () {

  },

  /**
   * 编辑
   */
  onEditSalesBillTap: function () {
    //由待办跳转过来
    if(this.taskFoward == true){
      Ext.getCmp('taskmain').fireEvent('forward', {
        xtype: 'salesbill',
        billUuid: this.billUuid,
        taskFoward: true,
        isEdit: true
      });     
    }else{
      Ext.getCmp('salesmain').fireEvent('forward', {
        xtype: 'salesbill',
        billUuid: this.billUuid,
        taskFoward: false,
        isEdit: true
      });
    }

  },


  onLoadData: function () {
    var me = this;
    var uuid = me.billUuid;
    SalesService.getBill({
      params: {'uuid': uuid},
      success : function(ret) {
        var detailInfo = ret.data;


        me.down('#salesBillNumber').setHtml("单号：" + detailInfo.billNumber);    //单号

        //基本信息栏：每种状态都需要显示
        //支付明细栏：如果有值显示，如果没值不显示
        //照片附件：如果有照片显示，如果没有不显示
        //状态
        if(detailInfo.state === "ineffect"){
          me.down('#salesState').setHtml("待审核");
          me.down('#SalesStatusbar').setCls("hdcontainer-statusBarPurle x-layout-box-item x-layout-vbox-item");

          me.down('#verifyBlock').setHidden(true);    //审核信息栏不显示
          me.down('#editSalesBill').setHidden(true);  //编辑按钮不显示
        }
        else if(detailInfo.state === "reject"){
          me.down('#salesState').setHtml("被驳回");
          me.down('#SalesStatusbar').setCls("hdcontainer-statusBarRed x-layout-box-item x-layout-vbox-item");

          me.down('#verifyBlock').setHidden(false);    //审核信息栏显示
          me.down('#editSalesBill').setHidden(false);  //编辑按钮不显示
        }
        else if(detailInfo.state === "effect"){
          me.down('#salesState').setHtml("已审核");
          me.down('#SalesStatusbar').setCls("hdcontainer-statusBarBlueGreen x-layout-box-item x-layout-vbox-item");

          me.down('#verifyBlock').setHidden(true);        //审核信息栏显示
          me.down('#rejectReasonCont').setHidden(true);   //审核信息栏-驳回原因不显示
          me.down('#editSalesBill').setHidden(true);      //编辑按钮不显示
        }

        //基本信息栏：未审核状态只显示基本信息栏，其它栏不显示
        me.down('#saleTotal').setHtml("￥" + detailInfo.saleTotal);      //本单合计
        me.down('#inputSource').setHtml(detailInfo.inputSource);  //录入来源
        me.down('#saleDate').setHtml(Ext.Date.format(new Date(detailInfo.saleDate), 'Y/m/d'));        //录入日期
        me.down('#product').setHtml(detailInfo.product.name);   //商品
        me.down('#saleCount').setHtml(detailInfo.saleCount);    //本单笔数
        me.down('#saleDaySum').setHtml("￥" + detailInfo.saleDaySum);  //当日累计
        me.down('#remark').setHtml(detailInfo.remark);          //说明

        //照片附件
        if(detailInfo.attachments && detailInfo.attachments.length > 0){
          if(detailInfo.attachments.length > 1){
            me.down('#beforePicture1').setSrc(detailInfo.attachments[0].url);
            me.down('#beforePicture2').setSrc(detailInfo.attachments[1].url);
          }else{
            me.down('#beforePicture1').setSrc(detailInfo.attachments[0].url);
            me.down('#beforePicture2').setHidden(true);
          }
        }else{
          me.down('#beforePicture').setHidden(true);
        }

        //费用信息：store是每次需要更新的
        //=============
        if(detailInfo.payments == null || detailInfo.payments.length ==0){
          me.down('#feeBlock').setHidden(true);
        }else {
          var data = [];
          var dataItem;
          for(var i=0; i<detailInfo.payments.length; i++){
            dataItem = { id: detailInfo.payments[i].payment.uuid, subject:detailInfo.payments[i].payment.name, total: detailInfo.payments[i].total };
            data.push(dataItem);
          }

          var myStore =  Ext.create('Ext.data.Store', {
            model: 'hdts.model.sales.PayRecordModel',
            data : data
          });

          me.down('#feeTable').setStore(myStore);
          me.down('#feeBlock').setHidden(false);
        }

        if(detailInfo.state === "ineffect")
            return;

        //审核信息栏
        me.down('#verifyMan').setHtml(detailInfo.verifyInfo.operator);  //审核人
        me.down('#rejectReason').setHtml(detailInfo.verifyInfo.comment);  //驳回原因
        me.down('#verifyTime').setHtml(Ext.Date.format(new Date(detailInfo.verifyInfo.time), 'Y/m/d'));     //审核时间

        if(detailInfo.state === "reject")
          return;


      },
      failure : function(ret) {
        console.dir(ret);
      }
    });
  },
  setBillUuid: function (uuid) {
    this.billUuid = uuid;
  }


});

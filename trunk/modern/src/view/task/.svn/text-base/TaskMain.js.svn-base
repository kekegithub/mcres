/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：ComplaintMain
 * 模块说明：
 * 修改历史：
 * 2017/4/14 - lihuiming - 创建
 */
Ext.define('hdts.view.task.TaskMain', {
  extend: 'Ext.navigation.View',
  xtype: 'taskmain',
  requires: [
    'hdts.view.task.TaskList',
    'hdts.view.sales.SalesBill'
  ],

  config: {
    id: 'taskmain',
    itemId: 'taskmain',
    cls: 'hdnavigation-main',
    fullscreen: true,
    layout: {
      type: 'card',
      animation: null
    },
    defaultBackButtonText: '',
    items: [
      {
        xtype: 'tasklist'
      }
    ],

    navigationBar: {
      docked: 'top',
      cls: 'hdnavbar-top',
      height: '45px',
      items: [
        {
          xtype: 'button',
          itemId: 'button-back',
          align: 'left',
          iconCls: 'button-back-icon',
          cls: 'button-back'
        },
        {
          xtype: 'button',
          itemId: 'button-delete',
          align: 'right',
          text: '删除',
          cls: 'button-delete',
          hidden: true
        }
      ]
    },

    control: {
      '#button-back': {
        tap: 'onButtonBackTap'
      },
      '#button-delete':{
        tap: 'onButtonDeleteTap'
      }
    },

    listeners: {
      push: 'onPush',
      pop: 'onPop',
      forward: 'onForward'
    }
  },

  onPush: function (mainView, pushedView) {
    this.down('#button-back').hide();

    if(pushedView.xtype === "salesbill"){
      this.down('#button-delete').show();
    }else {
      this.down('#button-delete').hide();
    }
  },

  //弹出，即后退
  onPop: function (mainView, poppedView) {

    this.down('#button-delete').hide();

    //弹出销售数据录入单，如果是新建，回到列表页面；
    //如果是编辑，回到销售数据录入单详情页面
    if (poppedView.id === "salesbillform") {
      //删除，是直接跳转到列表页面
      var salesdetail = Ext.getCmp('salesdetail');
      if(salesdetail != null){
        salesdetail.fireEvent('loadData');  //返回录入单详情页
      }else{
        this.backToList();    //返回列表页面
      }

    } else if (poppedView.id === "salesdetail") {
      this.backToList();      //返回列表页面
    }
  },

  //前进
  onForward: function (target) {
    this.push(target);
    if (target.xtype == "salesdetail") {

      //此处用target不能触发loadData时间
      //target.fireEvent('loadData');
      Ext.getCmp('salesdetail').fireEvent('loadData');
    }else if(target.xtype == "salesbill"){
      Ext.getCmp('salesbillform').fireEvent('loadData');
    }
  },

  initialize: function () {
    this.callParent(arguments);
  },

  /**
   * 后退，返回主页面
   */
  onButtonBackTap: function () {
    var appMain = Ext.getCmp('appMain');
    if (appMain) {
      this.hide();
      appMain.show();
    }
  },

  /**
   * 删除销售数据录入单
   */
  onButtonDeleteTap: function () {
    var salesbillform = Ext.getCmp('salesbillform');
    if(salesbillform){
      salesbillform.fireEvent('deleteBill');
    }

  },

  /**
   * 返回销售数据单列表页面
   */
  backToList: function () {
    if (this.down('#button-back')) {
      this.down('#button-back').show();
    }
    Ext.getCmp('tasklist').fireEvent('loadData');
  }

});

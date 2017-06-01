/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：MaintainMain
 * 模块说明：工程报修列表主页
 * 修改历史：
 * 2017/3/20 - zhaolingling - 创建
 */
Ext.define('hdts.view.maintain.MaintainMain', {
  extend: 'Ext.navigation.View',
  xtype: 'maintainmain',

  requires: [
    'hdts.view.maintain.MaintainList',
    'hdts.view.maintain.Maintain'
  ],

  config: {
    id: 'maintainMain',
    itemId: 'maintainMain',
    cls: 'hdnavigation-main',

    fullscreen: true,

    layout: {
      type: 'card',
      animation: null
    },

    defaultBackButtonText: '',
    items: [
      {
      xtype: 'maintainlist'
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
          itemId: 'button-new',
          align: 'right',
          text: '+',
          cls : 'hdBtnNewBill'
        }
      ]
    },

    control: {
      '#button-back': {
        tap: 'onButtonBackTap'
      },
      '#button-new': {
        tap: 'onButtonNewTap'
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

    if(pushedView.down("maintainlist")){
      this.down('#button-new').show();
    }else{
      this.down('#button-new').hide();
    }
  },

  //弹出，即后退
  onPop: function (mainView, poppedView) {

    if (this.down('#button-back')) {
      this.down('#button-back').show();
    }
    if (this.down('#button-new')) {
      this.down('#button-new').show();
    }

  },

  //前进
  onForward: function (target) {
    this.push(target)
    if(target.xtype == "maintain-detail"){

      //此处用target不能触发loadData时间
      //target.fireEvent('loadData');
      Ext.getCmp('maintain-detail').fireEvent('loadData');
    }
  },

  initialize: function () {
    this.callParent(arguments);
  },

  onButtonBackTap: function () {
/*    Ext.defer(function () {
      Ext.Viewport.removeAll();
      Ext.Viewport.add(Ext.create('hdts.view.main.Main'));
    }, 1);*/

    var appMain = Ext.getCmp('appMain');
    if(appMain){
      this.hide();
      appMain.show();
    }
  },

  onButtonNewTap: function () {
    this.fireEvent('forward', {
      xtype: 'maintainform'
    });
  }
});

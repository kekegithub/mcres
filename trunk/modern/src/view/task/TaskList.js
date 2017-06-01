/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：SalesList
 * 模块说明：
 * 修改历史：
 * 2017/4/18 - zhaolingling - 创建
 */
Ext.define('hdts.view.task.TaskList', {
  extend: 'Ext.Container',
  alias: 'widget.tasklist',
  requires: [
    'Ext.Container',
    'Ext.Panel',
    'Ext.plugin.ListPaging',
    'hdts.service.common.Common',
    'hdts.store.task.TaskStore',
    'hdts.view.sales.SalesDetail'
  ],
  id: 'tasklist',

  config: {
    itemId: 'tasklist',
    title: '待办事项',
    cls: 'hdcontainer-list',
    layout: 'vbox',
    items: [
      {
        docked: 'top',
        xtype: 'component',
        cls: 'hdspace2'
      },
      {
        cls: 'hdcontainer-tablecontent',
        flex: 49,
        layout: 'vbox',
        items: [
          {
            itemId: 'listTplTable',
            xtype: 'list',
            height: '100%',
            width: '100%',
            cls: 'hd-list',
            store: '',
            itemTpl: new Ext.XTemplate(
                '<div style="display:flex;flex-direction:column;align-items:left;">',
                '<div style="display:flex;flex-direction:row;flex-wrap:wrap;width: 100%;">',
                '<div class="{[Common.getTaskIconCls(values.billType)]} task-list-title">{title}</div>',
                '<div class="task-list-time">{time}<span class="task-rightarrow-img"></span></div>',
                '<div style="display: none">{billType}</div>',
                '<div style="display: none">{billUuid}</div>',
                '</div>',
                '<div class="task-list-billnumber" >单号：{billNumber}</div>',
                '</div>'
            ),
            plugins: [
              {
                xclass: 'Ext.plugin.ListPaging',
                autoPaging: true,                     //设置成true将自动触发
                loadMoreText: '更多',
                noMoreRecordsText: '没有更多数据了!'
              }
            ]

          }
        ]
      }
    ],

    bubbleEvents: ['forward'],
    control: {
      '#listTplTable': {
        itemtap: 'onListItemTap'
      }
    },
    listeners: {
      loadData: 'loadListData'
    }
  },

  initialize: function () {
    this.callParent(arguments);
    this.loadListData();
  },

  onListItemTap: function (list, index, target, record) {
/*    Ext.Viewport.setMasked({
      xtype: 'loadmask',
      message: '数据请求中...'
    });*/

    if(record.data.billType === "salesBill"){
      Ext.getCmp('taskmain').fireEvent('forward', {
        xtype: 'salesdetail',
        billUuid: record.data.billUuid,
        taskFoward: true
      });
    }else if(record.data.billType === "salesBill"){
      Ext.getCmp('taskmain').fireEvent('forward', {
        xtype: 'salesdetail',
        billUuid: record.data.uuid
      });
    }


    //Ext.Viewport.setMasked(false);
  },

  loadListData: function () {
    MsgTip.msg('加载中', 'load');

    //我的待办
    if (typeof(Ext.getStore('taskstore')) == "undefined") {
      Ext.create('hdts.store.task.TaskStore');
    }
    var store = Ext.getStore('taskstore');
    store.proxy.extraParams = {page: 0};

    store.load(
        {
          callback: function (records, options, success) {
            var stime;
            for (var i = 0; i < store.getCount(); i++) {  //getCount() 方法 获取 数据集 的长度
              stime = new Date(store.getAt(i).get('time'));  //遍历数据集，获取 time 的数据
              store.getAt(i).set('time', Ext.Date.format(stime, 'Y/m/d'));
            }
          }
        });
    this.down('#listTplTable').setStore(store);
    MsgTip.remove();
  }


});
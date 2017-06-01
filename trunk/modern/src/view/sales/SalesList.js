/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：SalesList
 * 模块说明：
 * 修改历史：
 * 2017/4/18 - zhaolingling - 创建
 */
Ext.define('hdts.view.sales.SalesList', {
  extend: 'Ext.Container',
  alias: 'widget.saleslist',
  requires: [
    'Ext.Container',
    'Ext.Panel',
    'Ext.plugin.ListPaging',
    'hdts.service.common.Common',
    'hdts.store.sales.SalesStore',
    'hdts.view.sales.SalesDetail'
  ],
  config: {
    id: 'saleslist',
    itemId: 'saleslist',
    title: '销售录入',
    cls: 'hdcontainer-list',
    layout: 'vbox',
    items: [
      {
        xtype: 'component',
        cls: 'hdspaceWhite'
      },
      {
        xtype: 'container',
        layout: 'hbox',
        cls: 'hdcontainer-filter hdcontainer-filter-left',
        itemId: 'maintainFilter',
        items: [
          {
            xtype: 'hdselectfield',
            itemId: 'filterDateRange',
            cls: 'date-select',
            flex: 1,
            options: [
              {
                text: '最近一周',
                value: 'one week'
              }, {
                text: '最近一月',
                value: 'one month'
              }, {
                text: '最近半年',
                value: 'six month'
              }, {
                text: '最近一年',
                value: 'one year'
              }
            ]
          },
          {
            xtype: 'label',
            cls: 'hdcontainer-list-space'
          },
          {
            xtype: 'hdselectfield',
            itemId: 'filterState',
            cls: 'status-select',
            flex: 1,
            options: [
              {
                text: '全部状态',
                value: 'all'
              },
              {
                text: '待审核',
                value: 'ineffect'
              },
              {
                text: '已审核',
                value: 'effect'
              },
              {
                text: '被驳回',
                value: 'reject'
              }
            ]
          }
        ]
      },
      {
        xtype: 'component',
        cls: 'hdspace'
      },
      {
        cls: 'hdlist',
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
                '<div class="hd-list-title {[Common.judgmentState(values.state)]}">{saleDate}</div>',
                '<div class="hd-list-status">{state}</div>',
                '</div>',
                '<div class="hdlist-billTotal">本单合计：{saleTotal}</div>',
                '<div class="hd-list-number" >单号：{billNumber}</div>',
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
      },
      '#filterDateRange': {
        change: 'reloadListData'
      },
      '#filterState': {
        change: 'onFilterStateChange'
      }
    },
    listeners: {
      loadData: 'reloadListData'
    }
  },

  initialize: function () {
    this.callParent(arguments);
    this.storeload(this);
  },

  onListItemTap: function (list, index, target, record) {
    Ext.Viewport.setMasked({
      xtype: 'loadmask',
      message: '数据请求中...'
    });

    Ext.getCmp('salesmain').fireEvent('forward', {
      xtype: 'salesdetail',
      billUuid: record.data.uuid
    });
    Ext.Viewport.setMasked(false);
  },

  /**
   * 加这个是因为filterState->change：'reloadListData'，没有效果
   */
  onFilterStateChange: function () {
    this.reloadListData();
  },


  /**
   * 查询条件改变，重新刷新列表
   */
  reloadListData: function () {
    var range = this.down("#filterDateRange").getValue();
    var state = this.down("#filterState").getValue();

    var store = Ext.getStore('salesstore');

    store.reload({
      params: {
        'contractUuid': Ext.getStore('employee').getAt(0).get('contract').uuid,
        'state': state,
        'range': range
      }
    });
  },


  storeload: function (me) {
    MsgTip.msg('加载中', 'load');
    var params = {
      'contractUuid': Ext.getStore('employee').getAt(0).get('contract').uuid,
      'range': "one week",
      'state': "all"
    };

    //销售数据列表
    if (typeof(Ext.getStore('salesstore')) == "undefined") {
      Ext.create('hdts.store.sales.SalesStore');
    }
    var store = Ext.getStore('salesstore');
    store.proxy.extraParams = {page: 0};
    Ext.apply(store.proxy.extraParams, params);

    store.load(
        {
          callback: function (records, options, success) {
            var stime;
            for (var i = 0; i < store.getCount(); i++) {  //getCount() 方法 获取 数据集 的长度
              stime = new Date(store.getAt(i).get('saleDate'));  //遍历数据集，获取 publishTime 的数据
              store.getAt(i).set('saleDate', Ext.Date.format(stime, 'Y年m月d日'));

              //状态
              if (store.getAt(i).get('state') === "ineffect")
                store.getAt(i).set('state', "<span class='purpleclock-img'></span><span class='purple-txt'>&nbsp;&nbsp;待审核</span>");
              else if (store.getAt(i).get('state') === "effect")
                store.getAt(i).set('state', "<span class='finished-img'></span><span class='darkblue-txt'>&nbsp;&nbsp;已审核</span>");
              else if (store.getAt(i).get('state') === "reject")
                store.getAt(i).set('state', "<span class='redprohibit-img'></span><span class='darkred-txt'>&nbsp;&nbsp;被驳回</span>");

            }
          }
        });
    me.down('#listTplTable').setStore(store);
    MsgTip.remove();
  }
});
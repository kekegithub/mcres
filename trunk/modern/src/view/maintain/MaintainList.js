/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：MaintainList
 * 模块说明：工程报修列表
 * 修改历史：
 * 2017/3/20 - zhaolingling - 创建
 */
Ext.define('hdts.view.maintain.MaintainList', {
  extend: 'Ext.Container',
  alias: 'widget.maintainlist',
  requires: [
    'Ext.Container',
    'Ext.Panel',
    'Ext.plugin.ListPaging',
/*    'hdts.store.Task',
    'hdts.view.maintain.MaintainDetail',*/
    /*'hdts.view.Select'*/
    'UX.select.SelectField',
    'hdts.service.maintain.MaintainService',
    'hdts.model.maintain.MaintainTypeModel',
    'hdts.store.maintain.MaintainTypeStore',
    'hdts.model.maintain.MaintainModel',
    'hdts.store.maintain.MaintainStore'
  ],
  config: {
    //id: 'maintainlist',
    itemId: 'maintainlist',
    title: '工程报修',
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
        cls: 'hdcontainer-filter',
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
                text: '未生效',
                value: 'ineffect'
              },
              {
                text: '维修中',
                value: 'repairing'
              },
              {
                text: '已转移',
                value: 'distracted'
              },
              {
                text: '已解决',
                value: 'solved'
              },
              {
                text: '已完成',
                value: 'finished'
              },
              {
                text: '已作废',
                value: 'aborted'
              }
            ]
          }
        ]
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
            itemTpl:new Ext.XTemplate(
                '<div style="display:flex;flex-direction:column;align-items:left;">',
                '<div style="display:flex;flex-direction:row;flex-wrap:wrap;width: 100%">',
                '<div class="hd-list-title {[Common.judgmentState(values.state)]}">{maintainType}</div>',
                '<div class="hd-list-status">{state}</div>',
                '</div>',
                '<div class="hd-list-object">报修人：{reportMan}</div>',
                '<div class="hd-list-time" >报修时间：{reportTime}</div>',
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
      '#filterDateRange':{
        change: 'reloadListData'
      },
      '#filterState': {
        change: 'reloadListData'
      }
    }
  },

  initialize: function () {


    this.callParent(arguments);
    this.addMaintainTypeSelect(this);
    this.storeload(this);

  },

  onListItemTap: function (list, index, target, record) {

    Ext.Viewport.setMasked({
      xtype: 'loadmask',
      message: '数据请求中...'
    });

    Ext.getCmp('maintainMain').fireEvent('forward', {
      xtype: 'maintain-detail',
      billUuid: record.data.uuid
    });
    Ext.Viewport.setMasked(false);

  },

  /**
   * 查询条件改变，重新刷新列表
   */
  reloadListData: function () {
    var range = this.down("#filterDateRange").getValue();
    var state = this.down("#filterState").getValue();
    var type = this.down("#filterMaintainType").getValue();

    var store = Ext.getStore('maintainstore');

    store.reload({
      params : {
        'contract': Ext.getStore('employee').getAt(0).get('contract').uuid,
        'state': state,
        'range': range,
        'maintainType': type
      }
    });
  },

  /**
   * 添加报修类型下拉框组件
   * @param me
   */
  addMaintainTypeSelect: function (me) {
    MaintainService.getTypes({
      success : function(ret) {
        var types = ret.data;

        if(typeof(Ext.getStore('maintaintypestore')) == "undefined"){
          Ext.create('hdts.store.maintain.MaintainTypeStore');
        }
        var myStore = Ext.getStore('maintaintypestore');

        myStore.add({value: "all", text: "全部" });
        for(var i=0; i<types.length; i++){
          myStore.add({value: types[i], text: types[i] });
        }

        me.down('#maintainFilter').insert(1,{
          xtype: 'hdselectfield',
          itemId: 'filterMaintainType',
          cls: 'type-select',
          flex: 1,
          store: myStore,
          listeners: {
            change: function () {
              me.reloadListData();
            }
          }
        });

      },
      failure : function(ret) {
        console.dir(ret);
      }
    });
  },

  storeload:function (me) {
    MsgTip.msg('加载中', 'load');
    var params = {
      'contract': Ext.getStore('employee').getAt(0).get('contract').uuid,
      'state': "all",
      'range': "one year",
      'maintainType': "all"
    };

    //投诉列表
    if(typeof(Ext.getStore('maintainstore')) == "undefined"){
      Ext.create('hdts.store.maintain.MaintainStore');
    }
    var store = Ext.getStore('maintainstore');
    store.proxy.extraParams = {page: 0};
    Ext.apply(store.proxy.extraParams, params);

    store.load(
        {
          callback: function (records, options, success) {
            var stime;
            for (var i = 0; i < store.getCount(); i++) {  //getCount() 方法 获取 数据集 的长度
              stime = new Date(store.getAt(i).get('reportTime'));  //遍历数据集，获取 publishTime 的数据
              store.getAt(i).set('reportTime', Ext.Date.format(stime, 'Y/m/d'));

              //状态
              if(store.getAt(i).get('state') === "ineffect")
                store.getAt(i).set('state', "<span class='ineffect-img'></span><span class='ineffect-txt'>&nbsp;&nbsp;未生效</span>");
              else if(store.getAt(i).get('state') === "repairing")
                store.getAt(i).set('state', "<span class='repairing-img'></span><span class='repairing-txt'>&nbsp;&nbsp;维修中</span>");
              else if(store.getAt(i).get('state') === "distracted")
                store.getAt(i).set('state', "<span class='distracted-img'></span><span class='distracted-txt'>&nbsp;&nbsp;已转移</span>");
              else if(store.getAt(i).get('state') === "solved")
                store.getAt(i).set('state', "<span class='solved-img'></span><span class='solved-txt'>&nbsp;&nbsp;已解决</span>");
              else if(store.getAt(i).get('state') === "finished")
                store.getAt(i).set('state', "<span class='finished-img'></span><span class='finished-txt'>&nbsp;&nbsp;已完成</span>");
              else if(store.getAt(i).get('state') === "aborted")
                store.getAt(i).set('state', "<span class='aborted-img'></span><span class='aborted-txt'>&nbsp;&nbsp;已作废</span>");
            }
          }
        });
    me.down('#listTplTable').setStore(store);
    MsgTip.remove();
  }



});

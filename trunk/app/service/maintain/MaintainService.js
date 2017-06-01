/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：MaintainService
 * 模块说明：
 * 修改历史：
 * 2017/3/29 - zhaolingling - 创建
 */
Ext.define('hdts.service.maintain.MaintainService', {
  singleton: true,
  alternateClassName: 'MaintainService',
  requires: [
    'hdts.service.common.Ajax',
    'hdts.model.maintain.MaintainModel',
    'hdts.store.maintain.MaintainStore'
  ],

  /**
   * 获得工程维修单
   * @param params
   */
  getBill: function (params) {
    var url = 'ts/maintain/' + params.params.uuid;
    //验证登录信息
    HdtsAjax.request({
      url: url,
      method: 'GET',
      success: function (ret) {
        if (params && params.success)
          params.success(ret);
      },
      failure: function (msg) {
        console.log('获取工程报修单出错：' + msg);
        if (params && params.success)
          params.failure(msg);
      }
    });

  },

  /**
   * 创建工程报修单
   * @param params
   */
  create: function (params) {
    var json = {
      'store': Ext.getStore('employee').getAt(0).get('store'),
      'contract': Ext.getStore('employee').getAt(0).get('contract'),
      'tenant': Ext.getStore('employee').getAt(0).get('tenant'),
      'maintainType': params.params.maintainType,
      'maintainAddress': params.params.maintainAddress,
      'contactInfo': params.params.contactInfo,
      'appointmentTime': params.params.appointmentTime,
      'maintainContent': params.params.maintainContent,
      'beforePictures': params.params.beforePictures
    };
    //验证登录信息
    HdtsAjax.request({
      url: 'ts/maintain/create',
      method: 'POST',
      params: Ext.JSON.encode(json),
      success: function (ret) {
        if (params && params.success)
          params.success(ret);
      },
      failure: function (msg) {
        console.log('创建工程报修单出错：' + msg);
        if (params && params.success)
          params.failure(msg);
      }
    });
  },

  getTypes: function (params) {
    var url = 'ts/maintain/types';
    //验证登录信息
    HdtsAjax.request({
      url: url,
      method: 'GET',
      success: function (ret) {
        if (params && params.success)
          params.success(ret);
      },
      failure: function (msg) {
        console.log('获取工程报修类型列表出错：' + msg);
        if (params && params.success)
          params.failure(msg);
      }
    });

  },

  loadMaintainListData: function (params) {
    var json = {
      'contract': Ext.getStore('employee').getAt(0).get('contract').uuid,
      'state': params.params.state,
      'range': params.params.range,
      'maintainType': params.params.maintainType
    };

    //报修列表
    if(typeof(Ext.getStore('maintain')) == "undefined"){
      Ext.create('hdts.store.maintain.MaintainStore');
    }
    var store = Ext.getStore('maintainstore');
    store.proxy.extraParams = {page: 0};
    //var params = {"state": "all", "range": "one week"};
    //params.contract = Ext.getStore('employee').getAt(0).get('contract').uuid;
    //Ext.apply(store.proxy.extraParams, params);
    Ext.apply(store.proxy.extraParams, Ext.JSON.encode(json));


    store.load({
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
  }

});

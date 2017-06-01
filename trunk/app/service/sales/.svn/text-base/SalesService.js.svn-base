/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：SalesService
 * 模块说明：销售服务
 * 修改历史：
 * 2017/3/29 - zhaolingling - 创建
 */
Ext.define('hdts.service.sales.SalesService', {
  singleton: true,
  alternateClassName: 'SalesService',
  requires: [
    'hdts.service.common.Ajax',
    'hdts.model.maintain.MaintainModel',    //后续注释掉
    'hdts.store.maintain.MaintainStore',    //后续注释掉
    'hdts.model.sales.ProductModel',
    'hdts.store.sales.ProductStore'
  ],

  /**
   * 获得销售录入单
   * @param params
   */
  getBill: function (params) {
    var url = 'ts/sales/' + params.params.uuid;
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
   * 创建销售数据录入单
   * @param params
   */
  create: function (params) {
    var json = {
      'store': Ext.getStore('employee').getAt(0).get('store'),
      'contract': Ext.getStore('employee').getAt(0).get('contract'),
      'tenant': Ext.getStore('employee').getAt(0).get('tenant'),
      'product': params.params.product,
      'saleDate': params.params.saleDate,
      'saleCount': params.params.saleCount,
      'remark': params.params.remark,
      'payments': params.params.payments,
      'attachments': params.params.attachments
    };
    //验证登录信息
    HdtsAjax.request({
      url: 'ts/sales/create',
      method: 'POST',
      params: Ext.JSON.encode(json),
      success: function (ret) {
        if (params && params.success)
          params.success(ret);
      },
      failure: function (msg) {
        console.log('创建销售数据录入单出错：' + msg);
        if (params && params.success)
          params.failure(msg);
      }
    });
  },

  edit: function (params) {
    var json = {
      'store': Ext.getStore('employee').getAt(0).get('store'),
      'contract': Ext.getStore('employee').getAt(0).get('contract'),
      'tenant': Ext.getStore('employee').getAt(0).get('tenant'),
      'uuid': params.params.uuid,
      'product': params.params.product,
      'saleDate': params.params.saleDate,
      'saleCount': params.params.saleCount,
      'remark': params.params.remark,
      'payments': params.params.payments,
      'attachments': params.params.attachments
    };
    //验证登录信息
    HdtsAjax.request({
      url: 'ts/sales/save',
      method: 'POST',
      params: Ext.JSON.encode(json),
      success: function (ret) {
        if (params && params.success)
          params.success(ret);
      },
      failure: function (msg) {
        console.log('编辑销售数据录入单出错：' + msg);
        if (params && params.success)
          params.failure(msg);
      }
    });
  },

  deleteBill: function (params) {

    var url = 'ts/sales/delete/' + params.params.uuid;
    HdtsAjax.request({
      url: url,
      method: 'GET',
      success: function (ret) {
        if (params && params.success)
          params.success(ret);
      },
      failure: function (msg) {
        console.log('删除销售数据录入单出错：' + msg);
        if (params && params.success)
          params.failure(msg);
      }
    });
  },

  getSaleDaySum: function (params) {
    var json = {
      'contractUuid': Ext.getStore('employee').getAt(0).get('contract').uuid,
      'saleDate': params.params.saleDate
    };
    HdtsAjax.request({
      url: 'ts/sales/daymoneys',
      method: 'POST',
      params: Ext.JSON.encode(json),
      success: function (ret) {
        if (params && params.success)
          params.success(ret);
      },
      failure: function (msg) {
        console.log('获取当日累计出错：' + msg);
        if (params && params.success)
          params.failure(msg);
      }
    });
  },

  getProducts: function (params) {
    var json = {
      'storeUuid': Ext.getStore('employee').getAt(0).get('store').uuid,
      'contractUuid': Ext.getStore('employee').getAt(0).get('contract').uuid,
      'saleDate': params.params.saleDate
    };
    var url = 'ts/sales/products';
    //获取商品列表
    HdtsAjax.request({
      url: url,
      method: 'POST',
      params: Ext.JSON.encode(json),
      success: function (ret) {
        if (params && params.success)
          params.success(ret);
      },
      failure: function (msg) {
        console.log('获取商品列表出错：' + msg);
        if (params && params.success)
          params.failure(msg);
      }
    });

  },

  getPayMethods: function (params) {

    var url = 'ts/paytype/payments';
    //验证登录信息
    HdtsAjax.request({
      url: url,
      success: function (ret) {
        if (params && params.success)
          params.success(ret);
      },
      failure: function (msg) {
        console.log('获取支付方式列表出错：' + msg);
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

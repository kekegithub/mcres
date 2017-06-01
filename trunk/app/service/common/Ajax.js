/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：Ajax
 * 模块说明：访问服务器
 * 修改历史：
 * 2017/3/22 - zhuxiaofeng - 创建
 */
Ext.define('hdts.service.common.Ajax', {
  singleton: true,
  alternateClassName: 'HdtsAjax',
  requires: ['hdts.service.common.Common'],

  request: function (args) {
    args.url = 'rest/' + args.url;
    if (!args.async || args.async == '') {
      args.async = false;
    }
    args.async = false;
		args.defaultPostHeader = 'application/json; charset=UTF-8';
    //args.method = 'GET';
    //等待超时1分钟
    args.timeout = 60000;
    var success = args.success;
    args.success = function (response) {
      var ret;
      //console.log(response.responseText);
      try {
        ret = Ext.JSON.decode(response.responseText);
      } catch (e) {
        Common.MsgShow('系统异常', '系统发生异常,请重试,如果一直无法解决，请联系系统管理员');
        console.log(response.responseText);
        return;
      }
      if (ret.result == '0' && success) {
        success(ret);
      } else {
        //Common.MsgShow('错误', ret.message);
        failure(ret.message);
      }
    };

    var failure = args.failure;
    args.failure = function (response) {
      var ret = response.responseText;
      if (failure) {
        failure(ret);
      } else {
        Common.MsgShow('服务器错误', ret);
      }
    };

    args.callback = function () {
      //Ext.Viewport.setMasked(false);
    };
    //
    //Ext.Viewport.setMasked({
    //  xtype: 'loadmask',
    //  message: '数据请求中...'
    //});
    try {
      Ext.Ajax.request(args);
    }
    catch (e) {
      //Ext.Viewport.setMasked(false);
      console.log('服务器错误(0-1)', e.message);
      if (failure) {
        console.log('服务器错误(0-2)', e.message);
        failure(e.message);
      }
      else {
        console.log('服务器错误(0-3)', e.message);
        Common.MsgShow('服务器错误', e.message);
      }
    }
  }


});
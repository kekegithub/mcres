/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：HomeService
 * 模块说明：主页服务
 * 修改历史：
 * 2017/3/21 - zhaolingling - 创建
 */
Ext.define('hdts.service.home.HomeService', {
  singleton: true,
  alternateClassName: 'HomeService',
  requires: ['hdts.service.common.Ajax'],

  /**
   * 获取首页所有未读消息数量
   * @param params
   */
  getUnReadMessage: function (params) {
    HdtsAjax.request({
      url: 'ts/home/' + Ext.getStore('employee').getAt(0).get('user').code,
      method: 'GET',
      //params: {'user_id': params.params},
      success: function (ret) {
        if (params && params.success)
          params.success(ret);
      },
      failure: function (msg) {
        console.log('获取所有未读消息数量失败：' + msg);
        params.failure(msg);
      }
    })
  }

});

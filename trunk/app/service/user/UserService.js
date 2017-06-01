/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：UserService
 * 模块说明：用户服务
 * 修改历史：
 * 2017/3/21 - zhaolingling - 创建
 */
Ext.define('hdts.service.user.UserService', {
  singleton: true,
  alternateClassName: 'UserService',
  requires: [
		'hdts.service.common.Ajax',
		'hdts.store.login.Employee'
	],

  //用户登录
  login: function (params) {
		var json = {'userId': params.params.userId, 'password': params.params.password, 'platform': 'browser'};
		//验证登录信息
		HdtsAjax.request({
			url: 'ts/user/login',
			method: 'POST',
			params: Ext.JSON.encode(json),
			success: function (ret) {
				if(typeof(Ext.getStore('employee')) === "undefined"){
					Ext.create('hdts.store.login.Employee');
				}
				Ext.getStore('employee').add(ret.data);
				if (params && params.success)
          params.success(ret);
			},
			failure: function (msg) {
				console.log('用户验证失败：' + msg);
				if(msg === "HTTP 503 Service Unavailable")
					msg = "cre用户验证服务器异常。"
				if (params && params.success)
          params.failure(msg);
			}
		});
    
  },

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
	},
	//修改密码
	changePassword: function (params) {
		var json = {'newPassword': params.params.newPassword, 'oldPassword': params.params.oldPassword};
		//验证登录信息
		HdtsAjax.request({
			url: 'ts/user/changepassword/'+Ext.getStore('employee').getAt(0).get('user').code,
			method: 'POST',
			params: Ext.JSON.encode(json),
			success: function (ret) {
				if (params && params.success)
					params.success(ret);
			},
			failure: function (msg) {
				console.log('密码修改失败：' + msg);
				if (params && params.success)
					params.failure(msg);
			}
		});

	},

	getVersion: function (params) {
		var json = {'versionCode': params.params.versionCode, 'versionName': params.params.versionName, 'platform': params.params.platform};
		HdtsAjax.request({
			url: 'ts/version/query',
			method: 'POST',
			params: Ext.JSON.encode(json),
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

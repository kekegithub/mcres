/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：Login
 * 模块说明：登录页面
 * 修改历史：
 * 2017/3/20 - zhuxiaofeng - 创建
 */
Ext.define('hdts.view.login.Login', {
	extend: 'Ext.Container',
	xtype: 'tslogin',

	requires: [
		'hdts.service.user.UserService',
		'hdts.store.login.UserLocal',
		'hdts.view.login.LoginUserList'
	],
		
	constructor: function (config) {
		if(typeof(Ext.getStore('userLocals')) == "undefined"){
		 	Ext.create('hdts.store.login.UserLocal');
		}
		var userLocalStore = Ext.getStore('userLocals');
		userLocalStore.load();
		this.callParent(arguments);
	},

	config: {
    layout: 'card',
    cls: 'app-login',
    items: [
			{
				xtype: 'container',
				cls: 'loginmiddle',
				layout: 'vbox',
				height: 200,
				title: '',
				items: [
					{
						xtype: 'textfield',
						flex: 1,
						placeHolder: '请输入用户名',
						clearIcon: true,
						//required: true,
						labelCls: 'user-label',
						labelWidth: '10%',
						//autocomplete: "off",
						itemId: 'userId',
						name: 'userId'
					},
					{
						xtype: 'passwordfield',
						flex: 1,
						placeHolder: '请输入密码',
						clearIcon: true,
						//required: true,
						labelCls: 'password-label',
						labelWidth: '10%',
						//autocomplete: "off",
						itemId: 'password',
						name: 'password'
					},
					{
						xtype: 'button',
						itemId: 'login-button',
						cls: 'login-button',
						flex: 1,
						text: '登录'
					}
				]
			},
			{
				xtype: 'tsloginuserlist',
        itemId: 'loginUserList',
				id: 'loginUserList',
				cls: 'login-user'
			}
		],

    control: {
      '#login-button': {
        tap: 'onLoginButtonTap'
      },
			'#userId': {
        focus: 'onUserIdFocus',
				blur: 'onUserIdBlur'
      }
    }
  },
	
	initialize: function () {
		var me = this;
    me.callParent();
		me.down('#loginUserList').setCls('hidden-user');
	},

  onLoginButtonTap: function () {
	  var me = this;
		if(Ext.isEmpty(me.down('#userId').getValue())){
			MsgTip.msg('用户名不能为空');
			return;	
		}
		MsgTip.msg('登录中', 'load');
		UserService.login({	
			params: {'userId': me.down('#userId').getValue(), 'password': me.down('#password').getValue()},
			success : function(ret) {
				var userLocalStore = Ext.getStore('userLocals');
				var index = userLocalStore.find('userid', me.down('#userId').getValue());
				if(index == -1){
					userLocalStore.add(
					{
						userid: me.down('#userId').getValue(),
						password: me.down('#password').getValue()
					});
					userLocalStore.sync();
				} else {
					userLocalStore.getAt(index).set('password', me.down('#password').getValue());
				}

/*				//应该先显示Main页面，再加载未读消息条数，所以注释掉这一段
				UserService.getUnReadMessage({
					success : function(ret) {
						Ext.defer(function () {
							Ext.Viewport.removeAll();
							Ext.Viewport.add(Ext.create('hdts.view.main.Main'));
							MsgTip.remove();
						}, 1);
					},
					failure : function(ret) {
						MsgTip.remove();
						MsgTip.msg(ret);
					}
				})*/

				Ext.defer(function () {
					Ext.Viewport.removeAll();
					Ext.Viewport.add(Ext.create('hdts.view.main.Main'));
					MsgTip.remove();
				}, 1);
			},
			failure : function(ret) {
				MsgTip.remove();
				MsgTip.msg(ret);
			}
		});
    
  },
	
	onUserIdFocus: function() {
		if(Ext.getStore('userLocals').getCount() > 0){
		  this.down('#loginUserList').setCls('show-user');
		}
	},
	
	onUserIdBlur: function() {
		var me = this;
		if(!Ext.isEmpty(me.down('#userId').getValue())){
			me.down('#loginUserList').setCls('hidden-user');
		}
	}

});

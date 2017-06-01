/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：LoginUser
 * 模块说明：登录用户下拉列表
 * 修改历史：
 * 2017/3/21 - zhuxiaofeng - 创建
 */
Ext.define('hdts.view.login.LoginUserList', {
    extend: 'Ext.dataview.List',
    xtype: 'tsloginuserlist',
		
		requires: ['hdts.store.login.UserLocal'],
		
		config: {
			cls: 'userlines',
			itemId: 'userlines',
			xtype: 'list',
			store: 'userLocals',
			itemTpl: '<div><table width = "100%"><tr>'  
					+ '<td width="90%" style="text-align:center;font-size: 1.875em;height:3em">{userid}</td>' 
					+ '<td width="10%" style="text-align:right"><input type="button" class="userbutton" id="userbutton{userid}" value=" " title="{userid}"/></td>' 
					+ '</tr></table></div>'
		},
	
	initialize: function () {
		var me = this;
    me.callParent(arguments);
		
		var messageItem = Ext.getCmp('loginUserList');
    messageItem.element.on({
      scope: me,

      tap: function (e, t) {
				if (e.target.type == 'button') {
					var index = Ext.getStore('userLocals').findExact('userid', e.target.title);
          Ext.getStore('userLocals').removeAt(index);
					Ext.getStore('userLocals').sync();
				} else {
					var userid = e.target.innerText;
					var index = Ext.getStore('userLocals').findExact('userid', userid);
					var password = Ext.getStore('userLocals').getAt(index).get('password');
					MsgTip.msg('登录中', 'load');
					UserService.login({	
						params: {'userId': userid, 'password': password},
						success : function(ret) {
/*							//应该先显示Main页面，再加载未读消息条数，所以注释掉这一段
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
					})
				}
			}
		})
	}	
	
});

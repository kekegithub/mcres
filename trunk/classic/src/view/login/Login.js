/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace the content of this view to suit the needs of your application.
 */
Ext.define('hdts.view.login.Login', {
  extend: 'Ext.Container',
  xtype: 'app-login',

  requires: ['hdts.service.user.UserService', 'hdts.store.login.UserLocal'],

  constructor: function (config) {
    console.log('constructor');
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
        cls: 'data',
        layout: 'vbox',
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
        xtype: 'login-user',
        itemId: 'login-user',
        id: 'login-user',
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
    me.callParent(arguments);
    me.down('#login-user').setCls('hidden-user');
  },

  onLoginButtonTap: function () {
    console.log('on login button tap');
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

  onUserIdFocus: function(text, e, eOpts) {
    console.log('userid focus');
    this.down('#login-user').setCls('show-user');
  },

  onUserIdBlur: function(text, e, eOpts) {
    console.log('userid blur');
    this.down('#login-user').setCls('hidden-user');
  }


});

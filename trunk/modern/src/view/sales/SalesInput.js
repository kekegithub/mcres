Ext.define('hdts.view.sales.SalesInput', {
  extend: 'Ext.form.Panel',
  xtype: 'sales-input',

  requires: [
    'UX.date.DatePickerField',
		'UX.date.DateTimePickerField'
		//'hdts.view.sales.SalesImg'
  ],
	
	id:'form1', 
	
  config: {
    title: '新建销售录入单',
    layout: 'vbox',
    itemList: '',
    cls: 'sales-input',
    itemId: 'sales-input',
    items: [
      {
				xtype: 'container',
				cls: 'input-spacer'			
			},
			{
				xtype: 'container',
				cls: 'input-panel',
				layout: 'hbox',
				items: [
						{
								xtype: 'label',
								cls: 'input-label',
								flex: 1,
								html: '本单合计'
						},
						{
								xtype: 'label',
								cls: 'total',
								flex: 1,
								html: '¥100.00'
						}
				]
			},
			{
				xtype: 'container',
				cls: 'input-spacer'
			},
			{
				xtype: 'container',
				cls: 'input-panel',
				layout: 'hbox',
				items: [
						{
								xtype: 'label',
								cls: 'input-label',
								flex: 1,
								html: '当日累计'
						},
						{
								xtype: 'label',
								cls: 'day-total',
								flex: 1,
								html: '¥200.00'
						}
				]
			},
			{
				xtype: 'container',
				cls: 'input-spacer'
			},
			{
				xtype: 'container',
				layout: 'hbox',
				items: [
					{
						xtype: 'button',
						itemId: 'uploadbutton',
						cls: 'uploadbutton',
						text: '+'
					},
					
					{
						xtype: 'filefield',
						accept: 'image',
						enctype: 'multipart/form-data',
						name: 'file',
						itemId: 'uploadfile',
						cls: 'uploadfile'
					},
					{
						xtype: 'container',
						itemId: 'uploadedimg',
						layout: 'hbox',
						items:[
							{
								 xtype: 'img',
								 cls: 'uploadimg',
								 itemId: 'uploadimg',
								 src: ''
							},		 
							{
								 xtype: 'img',
								 cls: 'deleteimg',
								 itemId: 'deleteimg',
								 src: 'http://172.17.5.31:8080/hdts/build/development/hdts/modern/resources/images/delete.png'
							}
						]
					}
								
				]
			},
			
			{
				xtype: 'container',
				cls: 'input-spacer'
			},
			
			{
				xtype: 'img',
				itemId: 'testopenurl',
				cls: 'testopenurl',
				src: 'http://cre4.test.hd123.cn:8280/HDMediaService-Web/fileget?fileID=e54721a47a9d86d4f549999aaddcb9af4aada6ea0170187eafa1d5186ff8caf2b38624078f777ed3'	
			},
			
			{
				xtype: 'container',
				cls: 'input-spacer'
			},
			
			{
				xtype: 'container',
				cls: 'input-panel',
				layout: 'vbox',
				items: [
						{
								xtype: 'datepickerfield',
								dateFormat: 'Y-m-d',
								value: new Date(),
								name: 'bgnTime',
								itemId: 'bgnTime',
								cls: 'queryField',
								scrollable: false,
								picker: {
									yearFrom: 1980,
									slotOrder: ['year', 'month', 'day'],
									scrollable: false,
									doneButton: {text: '确认', cls: 'done-button'},
									cancelButton: {text: '取消', cls: 'canel-button'},
									toolbar: {
											ui: 'light',
											cls: 'toolbar',
											title: '选择录入日期'
									},
									bottombar: {
											ui: 'light',
											cls: 'bottombar',
											itemId: 'datebottombar',
											title: ''
									},
									listeners: {
										pick: function(pick, values, slot, eOpts){
											this.down('#datebottombar').setTitle(Ext.util.Format.date(values,'Y年m月d日 D'));
										}	
									}
								}
						},
						{
								xtype: 'datetimepickerfield',
								dateFormat: 'Y-m-d H:i',
								value: new Date('2017/3/18 10:11'),
								picker: {
									scrollable: false,
									//days: 2,
									doneButton: {text: '确认', cls: 'done-button'},
									cancelButton: {text: '取消', cls: 'canel-button'},
									toolbar: {
											ui: 'light',
											cls: 'toolbar',
											title: '选择录入日期'
									},
									bottombar: {
											ui: 'light',
											cls: 'bottombar',
											itemId: 'datebottombar',
											title: ''
									},
									listeners: {
										pick: function(pick, values, slot, eOpts){
											console.dir(values);
											this.down('#datebottombar').setTitle(Ext.util.Format.date(values,'Y年m月d日 D H:i'));
										}	
									}
								}
						}
				]
			},
			{
				xtype: 'container',
				cls: 'input-spacer'
			}
    ],

    control: {
      '#contractselector': {
        activetabchange: 'onContractSelectorChange'
      },
      '#regionMore': {
        tap: 'onButtonMoreTap'
      },
      '#uploadfile': {
        change: 'onButtonUploadTap'
      },
			'#deleteimg': {
        tap: 'onDeleteImgTap'
      },
			'#testopenurl': {
				tap: 'onTestOpenUrlTap'
			}
    }
  },


  initialize: function () {
    var me = this;
		me.down('#uploadedimg').setHidden(true);
  },
	
	onButtonUploadTap: function (file, newValue, oldValue, eOpts ) {
		var me = this;
		var form1 = file.up('formpanel');
		Ext.Ajax.request({ 
        url: "rest/ts/media/upload", 
        isUpload: true, 
        form: "form1", 
        success: function (ret) {
					console.dir(ret);
						var obj = Ext.decode(ret.responseText)

					me.down('#uploadimg').setSrc(obj.data.url);
					me.down('#uploadbutton').setHidden(true);
					me.down('#uploadedimg').setHidden(false);
/*						HdtsAjax.request({
							url: 'ts/media/' + obj.data,
							method: 'GET',
							success: function (ret) {
								console.dir(ret);
								me.down('#uploadimg').setSrc(ret.data);
								me.down('#uploadbutton').setHidden(true);
								me.down('#uploadedimg').setHidden(false);
							},
							failure: function (msg) {
								console.log('获取图片失败：' + msg);
							}
						})*/
        } 
    }); 

	},
	
	onDeleteImgTap: function(img, e, eOpts){
		var me = this;
		me.down('#uploadedimg').setHidden(true);
		me.down('#uploadbutton').setHidden(false);
	},
	
	onTestOpenUrlTap: function(img, e, eOpts){
		 window.location.href = 'http://cre4.test.hd123.cn:8280/HDMediaService-Web/fileget?fileID=e54721a47a9d86d4f549999aaddcb9af4aada6ea0170187eafa1d5186ff8caf2b38624078f777ed3';
		/*var me = this;
		Ext.defer(function () {
      Ext.getCmp('sales-main').fireEvent('forward', {
        xtype: 'sales-img',
        record: img
      });
    }, 1);*/
	}


});
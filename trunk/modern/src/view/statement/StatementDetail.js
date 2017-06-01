/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：StatementDetail
 * 模块说明：
 * 修改历史：
 * 2017/4/10 - lihuiming - 创建
 */
Ext.define('hdts.view.statement.StatementDetail', {
    extend: 'Ext.Container',
    xtype: 'statementdetail',
    alias: 'widget.statementdetail',
    requires: [
        'Ext.Container',
        'Ext.Panel',
        'Ext.plugin.ListPaging',
        'hdts.service.statement.StatementService',
        'hdts.model.statement.StatementSubjectModel',
        'hdts.service.common.Common'
    ],
    config: {
        id: 'statementdetail',
        title: '',
        cls: 'hdcontainer-list statement-list',
        layout: 'vbox',
        items: [
            {
                xtype: 'container',
                layout: 'vbox',
                itemId:'statement-statusbar',
                cls: 'hdcontainer-statement hdcontainer-statement-pay',
                items:[
                    {
                        xtype: 'label',
                        flex:1,
                        itemId: 'statement-congratulate',
                        cls: 'hdlabel-billCongratulate',
                        html: ''
                    },
                    {
                        xtype: 'label',
                        flex:2,
                        itemId: 'statement-complete',
                        cls: 'hdlabel-billComplete',
                        html: ''
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                cls: 'hdcontainer-nav-third',
                items: [
                    {
                        xtype: 'label',
                        flex:1,
                        cls: 'statement-receivable',
                        itemId: 'statement-receivable',
                        html: ''
                    },
                    {
                        xtype: 'label',
                        flex:1,
                        cls: 'statement-revenue',
                        itemId: 'statement-revenue',
                        html: ''
                    }
                ]
            },
            {
                xtype: 'component',
                cls: 'hdspace'
            },
            {
                xtype: 'container',
                layout: 'hbox',
                cls: 'hdcontainer-filter',
                items: [
                    {
                        xtype: 'label',
                        flex:5,
                        cls: 'statement-information',
                        html: '显示缴清账单'
                    },
                    {
                        xtype: 'togglefield',
                        itemId: 'statement-toggle',
                        flex:1,
                        value:1,
                        cls:'hdcontainer-toggle',
                        name: '',
                        listeners: {
                            change: function(field, newValue, oldValue) {
                                var me=Ext.getCmp('statementdetail');
                                var uuid=this.getName();
                                StatementService.getStatement({
                                    params: {'statement': uuid,'containCleanUpSubject':newValue},
                                    success : function(ret) {
                                        /*调用绑定数据*/
                                        me.listAssignment(me,ret.data,uuid);
                                    },
                                    failure : function(ret) {
                                        console.dir(ret);
                                    }
                                });
                            }
                        }
                    }
                ]
            },
            {
                cls: 'hdlist',
                flex: 49,
                layout: 'vbox',
                items: [{
                    itemId: 'listTplTable',
                    xtype: 'list',
                    height: '100%',
                    width: '100%',
                    cls: 'statement-list',
                    store: '',
                    itemTpl:new Ext.XTemplate(
                        '<div style="display:flex;flex-direction:column;align-items:left;">',
                        '<div class="statement-div-year" >{subject}</div>',
                        '<div class="statement-div-cycle" >{[Common.dateTransposition(values.beginDate)]}-{[Common.dateTransposition(values.endDate)]}</div>',
                        '<div style="display:flex;flex-direction:row;align-items:left;flex-wrap:wrap">',
                        '<div class="statement-div-should">应缴：{[Common.toLocaleString(values.payTotal)]}</div>',
                        '<tpl if="this.isTrue(unpayedTotal)">',
                        '<div class="statement-div-real">未缴：<span style="color:#e75c37">{[Common.toLocaleString(values.unpayedTotal)]}</span></div>',
                        '<tpl else>',
                        '<div class="statement-div-real">未缴：<span style="color:#64b3f1">{unpayedTotal}</span></div>',
                        '</tpl>',
                        // '<div class="statement-div-real">未缴：{[Common.toLocaleString(values.unpayedTotal)]}</div>',
                        '<div class="statement-div-not" >实缴：{[Common.toLocaleString(values.payedTotal)]}</div>',
                        '</div>',
                        '</div>',
                        {
                            isTrue: function (total) {
                                if (total > 0) {
                                    return true;
                                }
                                return false;
                            }
                        }
                    )
                }]
            }
        ]
    },

    initialize: function () {
        var me=this;
        var uuid = me.uuid;
        me.setTitle(me.settle.substr(0, 4)+'年'+me.settle.substr(4, 6)+'月');
        StatementService.getStatement({
            params: {'statement': uuid,'containCleanUpSubject':false},
            success : function(ret) {
                /*调用绑定数据*/
                me.listAssignment(me,ret.data,uuid);
            },
            failure : function(ret) {
                console.dir(ret);
            }
        });
    },
    /*绑定数据*/
    listAssignment:function (me,detailInfo,uuid) {
        var statementList=detailInfo.subjects;
        var unpayedTotal=detailInfo.unpayedTotal;
        if(unpayedTotal===0){
            me.down('#statement-congratulate').setHtml('恭喜你');
            me.down('#statement-complete').setHtml('账单已缴清');
            me.down('#statement-statusbar').setCls('hdcontainer-statement hdcontainer-statement-pay x-layout-box-item x-layout-vbox-item');
        }else if(unpayedTotal>0){
            me.down('#statement-congratulate').setHtml('未缴金额额（元）');
            me.down('#statement-complete').setHtml(Common.toLocaleString(unpayedTotal));
            me.down('#statement-statusbar').setCls('hdcontainer-statement hdcontainer-statement-nopay x-layout-box-item x-layout-vbox-item');
        }
        me.down('#statement-receivable').setHtml('应缴金额（元）<br/><span style="color:#656a6e">'+Common.toLocaleString(detailInfo.payTotal)+'</span>');
        me.down('#statement-revenue').setHtml('实缴金额（元）<br/><span style="color:#656a6e">'+Common.toLocaleString(detailInfo.payedTotal)+'</span>');
        me.down('#statement-toggle').setName(uuid);
        //将数据statementList加入到新的store中
        var statementListStore= Ext.create('Ext.data.Store', {
            model: 'hdts.model.statement.StatementSubjectModel',
            data : statementList
        });
        me.down('#listTplTable').setStore(statementListStore);
    }
});
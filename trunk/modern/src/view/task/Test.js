Ext.define('hdts.view.task.Test', {
  extend: 'Ext.Container',
  xtype: 'test',

  requires: [
    
  ],

  config: {
    title: '合同审批流程',
    layout: 'vbox',
    itemList: '',
    cls: 'ContractDtlMian',
    id:'contractDtlMian',
    itemId: 'contractDtlMian',
    items: [
      {
          xtype: 'button',
          itemId: 'task-button-back',
          align: 'left',
          iconCls: 'task-button-back-icon',
          cls: 'task-button-back'
        }
    ],
    navigationBar: {
      docked: 'top',
      cls: 'bar-other',
      height: '45px',
      items: [
        {
          xtype: 'button',
          itemId: 'task-button-back',
          align: 'left',
          iconCls: 'task-button-back-icon',
          cls: 'task-button-back'
        }
      ]
    },
    control: {
      '#contractselector': {
        activetabchange: 'onContractSelectorChange'
      },
      '#regionMore': {
        tap: 'onButtonMoreTap'
      }
    }
  },


  initialize: function () {
    var me = this;
  }


});
/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：Number
 * 模块说明：
 * 修改历史：
 * 2017/4/21 - zhaolingling - 创建
 */
Ext.define('UX.field.Number', {
  extend: 'Ext.field.Number',
  xtype: 'hdnumberfield',

  config: {
    digit: 0, //小数位数, 比如digit为2的时候，3.1415926会四舍五入为3.14
    trimZero: false //去除末尾无意义的0，比如3.10会显示为3.1
  },

  applyValue : function(value){
    var minValue = this.getMinValue(),
        maxValue = this.getMaxValue();

    if (Ext.isNumber(minValue) && Ext.isNumber(value)) {
      value = Math.max(value, minValue);
    }

    if (Ext.isNumber(maxValue) && Ext.isNumber(value)) {
      value = Math.min(value, maxValue);
    }

    value = parseFloat(value).toFixed(this.getDigit());

    var display = value.toString();
    if (this.getTrimZero()) {
      while (display[display.length - 1] == "0")
        display = display.substr(0, display.length - 1);
      if (display[display.length - 1] == ".")
        display = display.substr(0, display.length - 1);
    }

    return (isNaN(display)) ? '' : parseFloat(display);
  },


  onBlur: function(e) {
    this.callParent(arguments);

    var value = this.applyValue(this.getValue());
    this.getComponent().inputElement.dom.value = value;
  }
});

/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：TextPickerField
 * 模块说明：新建工程报修单
 * 修改历史：
 * 2017/4/5 - zhaolingling - 创建
 */
Ext.define('UX.date.TextPickerField', {
    extend: 'Ext.field.Picker',
    alternateClassName: 'Ext.form.TextPickerField',
    xtype: 'textpickerfield',

    requires: [
        'UX.date.TextSelect'
    ],

    config: {
        picker: true,
        destroyPickerOnHide: false
    },

    classCls: Ext.baseCSSPrefix + 'datepickerfield',


    updateValue: function(value, oldValue) {
        var me     = this,
            picker = me._picker;

        if (picker && picker.isPicker) {
            picker.setValue(value);
        }

        // Ext.Date.format expects a Date
        if (value !== null) {
            //me.getComponent().setValue(value);
            me.getComponent().setValue(value.type);
        } else {
            me.getComponent().setValue('');
        }

        me.fireEvent('change', me, value, oldValue);
    },


    applyPicker: function(picker, pickerInstance) {
        if (pickerInstance && pickerInstance.isPicker) {
            picker = pickerInstance.setConfig(picker);
        }

        return picker;
    },

    getPicker: function() {
        console.dir(this);
				var picker = this._picker,
            value = this.getValue();

        if (picker && !picker.isPicker) {
            picker = Ext.factory(picker, UX.date.TextSelect);
            if (value !== null) {
                picker.setValue(value);
            }
        }

        picker.on({
            scope: this,
            change: 'onPickerChange',
            hide  : 'onPickerHide'
        });

        this._picker = picker;

        return picker;
    },


    onPickerChange: function(picker, value) {
        var me = this,
            oldValue = me.getValue();

        me.setValue(value);
        me.fireEvent('select', me, value);
    },


    onPickerHide: function() {
        var me     = this,
            picker = me.getPicker();

        if (me.getDestroyPickerOnHide() && picker) {
            picker.destroy();
            me._picker = me.getInitialConfig().picker || true;
        }
    },

    reset: function() {
        this.setValue(this.originalValue);
    },

    onFocus: function(e) {
        var component = this.getComponent();
        this.fireEvent('focus', this, e);

        if (Ext.os.is.Android4) {
            component.inputElement.dom.focus();
        }
        component.inputElement.dom.blur();

        if (this.getReadOnly()) {
            return false;
        }

        this.isFocused = true;

        this.getPicker().show();
    },

    doDestroy: function() {
        var picker = this._picker;

        if (picker && picker.isPicker) {
            picker.destroy();
        }

        this.callParent();
    }
});

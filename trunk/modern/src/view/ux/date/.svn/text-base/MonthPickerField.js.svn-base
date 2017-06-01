/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：MonthPickerField
 * 模块说明：
 * 修改历史：
 * 2017/4/10 - lihuiming - 创建
 */
Ext.define('UX.date.MonthPickerField', {
    extend: 'Ext.field.Picker',
    alternateClassName: 'Ext.form.MonthPickerField',
    xtype: 'hdmonthpickerfield',

    requires: [
        //'Ext.field.trigger.Date',
        'UX.date.MonthSelect'
    ],

    /**
     * @event change
     * Fires when a date is selected
     * @param {Ext.field.DatePicker} this
     * @param {Date} newDate The new date
     * @param {Date} oldDate The old date
     */

    config: {
        /**
         * @cfg {Object/Ext.picker.Date} picker
         * An object that is used when creating the internal {@link Ext.picker.Date} component or a direct instance of {@link Ext.picker.Date}.
         * @accessor
         */
        picker: true,

        /**
         * @cfg {Object/Date} value
         * Default value for the field and the internal {@link Ext.picker.Date} component. Accepts an object of 'year',
         * 'month' and 'day' values, all of which should be numbers, or a {@link Date}.
         *
         * Example: {year: 1989, day: 1, month: 5} = 1st May 1989 or new Date()
         * @accessor
         */

        /**
         * @cfg {Boolean} destroyPickerOnHide
         * Whether or not to destroy the picker widget on hide. This save memory if it's not used frequently,
         * but increase delay time on the next show due to re-instantiation.
         * @accessor
         */
        destroyPickerOnHide: false,

        /**
         * @cfg {String} [dateFormat=Ext.util.Format.defaultDateFormat] The format to be used when displaying the date in this field.
         * Accepts any valid date format. You can view formats over in the {@link Ext.Date} documentation.
         */
        dateFormat: '',

        triggers: {
            expand: {
                type: 'date'
            }
        }
    },

    classCls: Ext.baseCSSPrefix + 'datepickerfield',

    applyValue: function(value, oldValue) {
        console.log('value:' + value + ' oldvalue:' + oldValue);
        if (!Ext.isDate(value)) {
            if (value) {
                value = Ext.Date.parse(value, this.getDateFormat());
            } else {
                value = null;
            }
        }

        // The same date value may not be the same reference, so compare them by time.
        // If we have dates for both, then compare the time. If they're the same we
        // don't need to do anything.
        if (value && oldValue && value.getTime() === oldValue.getTime()) {
            value = undefined;
        }

        return value;
    },

    updateValue: function(value, oldValue) {
        var me     = this,
            picker = me._picker;

        if (picker && picker.isPicker) {
            picker.setValue(value);
        }

        // Ext.Date.format expects a Date
        if (value !== null) {
            me.getComponent().setValue(Ext.Date.format(value, me.getDateFormat()));
        } else {
            me.getComponent().setValue('');
        }

        me.fireEvent('change', me, value, oldValue);
    },

    applyDateFormat: function(dateFormat) {
        return dateFormat || Ext.util.Format.defaultDateFormat;
    },

    /**
     * Updates the date format in the field.
     * @private
     */
    updateDateFormat: function(newDateFormat) {
        var value = this.getValue();
        if (Ext.isDate(value)) {
            this.getComponent().setValue(Ext.Date.format(value, newDateFormat));
        }
    },

    /**
     * Returns the {@link Date} value of this field.
     * If you wanted a formatted date use the {@link #getFormattedValue} method.
     * @return {Date} The date selected
     *
     * @method getValue
     */

    /**
     * Returns the value of the field formatted using the specified format. If it is not specified, it will default to
     * {@link #dateFormat} and then {@link Ext.util.Format#defaultDateFormat}.
     * @param {String} format The format to be returned.
     * @return {String} The formatted date.
     */
    getFormattedValue: function(format) {
        var value = this.getValue();
        return Ext.isDate(value) ? Ext.Date.format(value, format || this.getDateFormat()) : '';
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
            picker = Ext.factory(picker, UX.date.MonthSelect);
            if (value !== null) {
                picker.setValue(value, '', true);
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

    /**
     * Called when the picker changes its value.
     * @param {Ext.picker.Date} picker The date picker.
     * @param {Object} value The new value from the date picker.
     * @private
     */
    onPickerChange: function(picker, value) {
        var me = this,
            oldValue = me.getValue();

        me.setValue(value);
        me.fireEvent('select', me, value);
    },

    /**
     * Destroys the picker when it is hidden, if
     * {@link Ext.field.DatePicker#destroyPickerOnHide destroyPickerOnHide} is set to `true`.
     * @private
     */
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
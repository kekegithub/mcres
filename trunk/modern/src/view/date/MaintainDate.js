/**
 * A date picker component which shows a Date Picker on the screen. This class extends from {@link Ext.picker.Picker}
 * and {@link Ext.Sheet} so it is a popup.
 *
 * This component has no required configurations.
 *
 * ## Examples
 *
 *     @example miniphone preview
 *     var datePicker = Ext.create('Ext.picker.Date');
 *     Ext.Viewport.add(datePicker);
 *     datePicker.show();
 *
 * You may want to adjust the {@link #yearFrom} and {@link #yearTo} properties:
 *
 *     @example miniphone preview
 *     var datePicker = Ext.create('Ext.picker.Date', {
 *         yearFrom: 2000,
 *         yearTo  : 2015
 *     });
 *     Ext.Viewport.add(datePicker);
 *     datePicker.show();
 *
 * You can set the value of the {@link Ext.picker.Date} to the current date using `new Date()`:
 *
 *     @example miniphone preview
 *     var datePicker = Ext.create('Ext.picker.Date', {
 *         value: new Date()
 *     });
 *     Ext.Viewport.add(datePicker);
 *     datePicker.show();
 *
 * And you can hide the titles from each of the slots by using the {@link #useTitles} configuration:
 *
 *     @example miniphone preview
 *     var datePicker = Ext.create('Ext.picker.Date', {
 *         useTitles: false
 *     });
 *     Ext.Viewport.add(datePicker);
 *     datePicker.show();
 */
Ext.define('hdts.view.date.MaintainDatePicker', {
    extend: 'hdts.view.date.Picker',
    xtype: 'maintaindatepicker',
    alternateClassName: 'Ext.MaintainDatePicker',
    requires: ['Ext.util.InputBlocker'],

    /**
     * @event change
     * Fired when the value of this picker has changed and the done button is pressed.
     * @param {Ext.picker.Date} this This Picker
     * @param {Date} value The date value
     */

    config: {
        /**
         * @cfg {Number} dayFrom
         * The start year for the date picker. If {@link #yearFrom} is greater than
         * {@link #yearTo} then the order of years will be reversed.
         * @accessor
         */
        dayFrom: new Date(),
				
				days: 90,

        /**
         * @cfg {Number} [yearTo=new Date().getFullYear()]
         * The last year for the date picker. If {@link #yearFrom} is greater than
         * {@link #yearTo} then the order of years will be reversed.
         * @accessor
         */
        //dayTo: new Date(),

        /**
         * @cfg {String} monthText
         * The label to show for the month column.
         * @accessor
         */
        monthText: 'Month',

        /**
         * @cfg {String} dayText
         * The label to show for the day column.
         * @accessor
         */
        hourText: 'Hour',

        /**
         * @cfg {String} yearText
         * The label to show for the year column.
         * @accessor
         */
        minuteText: 'Minute',

        /**
         * @cfg {Array} slotOrder
         * An array of strings that specifies the order of the slots.
         * @accessor
         */
        slotOrder: ['month', 'hour', 'minute'],

        /**
         * @cfg {Object/Date} value
         * Default value for the field and the internal {@link Ext.picker.Date} component. Accepts an object of 'year',
         * 'month' and 'day' values, all of which should be numbers, or a {@link Date}.
         *
         * Examples:
         *
         * - `{year: 1989, day: 1, month: 5}` = 1st May 1989
         * - `new Date()` = current date
         * @accessor
         */

        /**
         * @cfg {Array} slots
         * @hide
         * @accessor
         */

        /**
         * @cfg {String/Mixed} doneButton
         * Can be either:
         *
         * - A {String} text to be used on the Done button.
         * - An {Object} as config for {@link Ext.Button}.
         * - `false` or `null` to hide it.
         * @accessor
         */
        doneButton: true
    },

    initialize: function() {
        this.callParent();
				console.log('maintaindatepicker initialize');

        this.on({
            scope: this,
            delegate: '> slot',
            slotpick: this.onSlotPick
        });

        this.on({
            scope: this,
            show: this.onSlotPick
        });
    },

    setValue: function(value, animated, isInit) {
        console.dir(value);
				if (Ext.isDate(value)) {
            value = {
                month  : value,
                hour: Ext.util.Format.date(value,'H'),
                minute : Ext.util.Format.date(value,'i')
            };
        }

        if(isInit){
					this.callParent([value, animated]);
					var innerItems = this.getInnerItems();
					for (i = 0; i < innerItems.length; i++) {
						var slot = innerItems[i];
						var index = -1;
						if(slot.getName() == 'month'){
							index = slot.getStore().findBy(function (record) {
													var storeval = Ext.util.Format.date(record.get(slot.getValueField()),'Y/m/d');
													var selectval = Ext.util.Format.date(slot.getValue(),'Y/m/d');
													return storeval == selectval;
											});
						} else {
							index = slot.getValue() - 1;
						}
						if (index == -1) {
								return;
						}
						slot.selectedIndex = index;
						slot.setValue(slot.getValue(true));
					}
				}
        this.onSlotPick();
    },

    getValue: function(useDom) {
        var values = {},
            items = this.getItems().items,
            ln = items.length,
            month, hour, minute, item, i;

				for (i = 0; i < ln; i++) {
            item = items[i];
            if (item instanceof Ext.picker.Slot) {
                values[item.getName()] = item.getValue();
            }
        }

        //if all the slots return null, we should not return a date
        if (values.month === null && values.hour === null && values.minute === null) {
            return null;
        }

				month = values.month;
        hour = values.hour;
        minute = values.minute;

        return new Date(Ext.util.Format.date(month,'Y/m/d') + ' ' + hour + ':' + minute);
    },

    /**
     * Updates the yearFrom configuration
     */
    updateDayFrom: function() {
        if (this.initialized) {
            this.createSlots();
        }
    },

    /**
     * Updates the yearTo configuration
     */
    updateDays: function() {
        if (this.initialized) {
            this.createSlots();
        }
    },

    /**
     * Updates the monthText configuration
     */
    updateMonthText: function(newMonthText, oldMonthText) {
        var innerItems = this.getInnerItems,
            ln = innerItems.length,
            item, i;

        //loop through each of the current items and set the title on the correct slice
        if (this.initialized) {
            for (i = 0; i < ln; i++) {
                item = innerItems[i];

                if ((typeof item.title == "string" && item.title == oldMonthText) || (item.title.html == oldMonthText)) {
                    item.setTitle(newMonthText);
                }
            }
        }
    },

    /**
     * Updates the {@link #dayText} configuration.
     */
    updateHourText: function(newHourText, oldHourText) {
        var innerItems = this.getInnerItems,
            ln = innerItems.length,
            item, i;

        //loop through each of the current items and set the title on the correct slice
        if (this.initialized) {
            for (i = 0; i < ln; i++) {
                item = innerItems[i];

                if ((typeof item.title == "string" && item.title == oldHourText) || (item.title.html == oldHourText)) {
                    item.setTitle(newHourText);
                }
            }
        }
    },

    /**
     * Updates the yearText configuration
     */
    updateMinuteText: function(newMinuteText, oldMinuteText) {
        var innerItems = this.getInnerItems,
            ln = innerItems.length,
            item, i;

        //loop through each of the current items and set the title on the correct slice
        if (this.initialized) {
            for (i = 0; i < ln; i++) {
                item = innerItems[i];

                if ((typeof item.title == "string" && item.title == oldMinuteText) || (item.title.html == oldMinuteText)) {
                    item.setTitle(newMinuteText);
                }
            }
        }
    },

    /**
     * @private
     */
    constructor: function() {
        this.callParent(arguments);
        this.createSlots();
    },

    /**
     * Generates all slots for all years specified by this component, and then sets them on the component
     * @private
     */
    createSlots: function() {
        var me        = this,
						daysFrom = me.getDayFrom(),
						days = me.getDays(),
						months = [];
						hours = [];
						minutes = [];
				
				var total = days;
				while(days){
						var dt = Ext.Date.add(new Date(daysFrom), Ext.Date.DAY, (total-days));
						var text = Ext.util.Format.date(dt,'m月d日');
						if(Ext.util.Format.date(dt,'m月d日') == Ext.util.Format.date(daysFrom,'m月d日')) {
							text = '今天' 
						} 
						months.push({
								text  : text,
                value : dt					
						});
						days--;
				}
				
				for (i = 0; i < 23; i++) {
            hours.push({
                text  : i + 1,
                value : i + 1
            });
        }

        for (i = 0; i < 59; i++) {
            minutes.push({
                text  : i + 1,
                value : i + 1
            });
        }

        var slots = [];

				var slotOrder = ['month', 'hour', 'minute'];
				slotOrder.forEach(function (item) {
            slots.push(me.createSlot(item, months, hours, minutes));
        });

        me.setSlots(slots);
    },

    /**
     * Returns a slot config for a specified date.
     * @private
     */
    createSlot: function(name, months, hours, minutes) {
        switch (name) {
            case 'month':
                return {
                    name: 'month',
                    align: 'center',
                    data: months,
                    title: this.getMonthText(),
                    flex: 3
                };
            case 'hour':
                return {
                    name: 'hour',
                    align: 'center',
                    data: hours,
                    title: this.getHourText(),
                    flex: 4
                };
            case 'minute':
                return {
                    name: 'minute',
                    align: 'center',
                    data: minutes,
                    title: this.getMinuteText(),
                    flex: 2
                };
        }
    },

    onSlotPick: function() {				
				var value = this.getValue(true)
				this.callParent(arguments);        
    },


    /**
     * @private
     */
    /*getDaysInMonth: function(month, year) {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return month == 2 && this.isLeapYear(year) ? 29 : daysInMonth[month-1];
    },*/

    /**
     * @private
     */
    /*isLeapYear: function(year) {
        return !!((year & 3) === 0 && (year % 100 || (year % 400 === 0 && year)));
    },*/

    onDoneButtonTap: function() {
        var oldValue = this._value,
            newValue = this.getValue(true),
            testValue = newValue;

        if (Ext.isDate(newValue)) {
            testValue = newValue.toDateString();
        }
        if (Ext.isDate(oldValue)) {
            oldValue = oldValue.toDateString();
        }

        if (testValue != oldValue) {
            this.fireEvent('change', this, newValue);
        }

        this.hide();
        Ext.util.InputBlocker.unblockInputs();
    }
});
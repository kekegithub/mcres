/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：TextSelect
 * 模块说明：新建工程报修单
 * 修改历史：
 * 2017/4/5 - zhaolingling - 创建
 */
Ext.define('UX.date.TextSelect', {
    extend: 'UX.sheet.PickerSheet',
    xtype: 'textselect',
    alternateClassName: 'Ext.TextSelect',
    requires: [
        'Ext.util.InputBlocker',
        'Ext.data.Store'],

    config: {
        typeText: 'Type',
        slotOrder: ['type'],
        doneButton: true
    },

    initialize: function () {
        this.callParent();

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

    setValue: function (value, animated) {
        this.callParent([value, animated]);
        this.onSlotPick();
    },

    getValue: function (useDom) {
        var values = {},
            items = this.getItems().items,
            ln = items.length,
            type, item, i;

        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item instanceof Ext.picker.Slot) {
                values[item.getName()] = item.getValue(useDom);
            }
        }

        type = values;

        return type;
    },

    /**
     * Updates the typeText configuration
     */
    updateTypeText: function (newTypeText, oldTypeText) {
        var innerItems = this.getInnerItems,
            ln = innerItems.length,
            item, i;

        //loop through each of the current items and set the title on the correct slice
        if (this.initialized) {
            for (i = 0; i < ln; i++) {
                item = innerItems[i];

                if ((typeof item.title == "string" && item.title == oldTypeText) || (item.title.html == oldTypeText)) {
                    item.setTitle(newTypeText);
                }
            }
        }
    },


    /**
     * @private
     */
    constructor: function () {
        this.callParent(arguments);
        this.createSlots();
    },

    /**
     * Generates all slots for all years specified by this component, and then sets them on the component
     * @private
     */
    createSlots: function () {
        var me = this,
            slotOrder = me.getSlotOrder(),
            types = [];

        types.push({
            text: "设备检修",
            value: "设备检修"
        });

        types.push({
            text: "店铺设备检修",
            value: "店铺设备检修"
        });

        types.push({
            text: "大维修",
            value: "大维修"
        });


        var slots = [];

        slotOrder.forEach(function (item) {
            slots.push(me.createSlot(item, types));
        });

        me.setSlots(slots);
    },

    /**
     * Returns a slot config for a specified date.
     * @private
     */
    createSlot: function (name, types) {

        return {
            name: name,
            align: 'center',
            data: types,
            title: this.getTypeText(),
            flex: 1
        };


    },

    onSlotPick: function () {
        var value = this.getValue(true),
            slot = this.getTypeSlot();

        if (!value) {
            return;
        }

        this.callParent(arguments);

        // Now we have the correct amount of types for the type slot, lets update it
        var store = slot.getStore(),
            viewItems = slot.getViewItems(),
            valueField = slot.getValueField(),
            index, item;

        index = store.find(valueField, value);
        if (index == -1) {
            return;
        }

        item = Ext.get(viewItems[index]);

        slot.selectedIndex = index;
        slot.scrollToItem(item);
        slot.setValue(slot.getValue(true));
    },

    getTypeSlot: function () {
        var innerItems = this.getInnerItems(),
            ln = innerItems.length,
            i, slot;

        if (this.typeSlot) {
            return this.typeSlot;
        }

        for (i = 0; i < ln; i++) {
            slot = innerItems[i];
            if (slot.isSlot && slot.getName() == "type") {
                this.typeSlot = slot;
                return slot;
            }
        }

        return null;
    },


    onDoneButtonTap: function () {
        var oldValue = this._value,
            newValue = this.getValue(true),
            testValue = newValue;

        if (testValue != oldValue) {
            this.fireEvent('change', this, newValue);
        }

        this.hide();
        Ext.util.InputBlocker.unblockInputs();
    }
});
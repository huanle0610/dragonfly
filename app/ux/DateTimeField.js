/*
 * 基于ExtJS4.x封装的My97DatePicker
 */
Ext.define('Ext.ux.DateTimeField', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.datetimefield',
    time: true,
    dateConfig: {},
    initTime: '12',
    initTimeFormat: 'H',
    minText: "The date in this field must be equal to or after {0}",
    maxText: "The date in this field must be equal to or before {0}",
    triggerCls: Ext.baseCSSPrefix + 'form-date-trigger',
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        $LAB
            .script("resources/My97DatePicker/WdatePicker.js");

    },

    onTriggerClick: function (e) {
        var me = this;
        me.initDateConfig();
        if (me.disabled || me.readOnly) {
            return;
        }
        me.onFocus({});
        WdatePicker(me.dateConfig);
    },

    initDateConfig: function () {
        var me = this;
        me.dateConfig['el'] = me.id + '-inputEl';
        if (me.time) {
            me.dateConfig["dateFmt"] = 'yyyy-MM-dd HH:mm:ss';
        } else if (!me.dateConfig["dateFmt"]) {
            me.dateConfig["dateFmt"] = 'yyyy-MM-dd';
        }
        if (!me.dateConfig["skin"]) {
            me.dateConfig["skin"] = 'default';
        }
    },
    safeParse: function (value, format) {
        var me = this,
            utilDate = Ext.Date,
            result = null,
            strict = me.useStrict,
            parsedDate;
        if (utilDate.formatContainsHourInfo(format)) {
            result = utilDate.parse(value, format, strict);
        } else {
            parsedDate = utilDate.parse(value + ' ' + me.initTime, format + ' ' + me.initTimeFormat, strict);
            if (parsedDate) {
                result = utilDate.clearTime(parsedDate);
            }
        }
        return result;
    },
    parseDate: function (value) {
        if (!value || Ext.isDate(value)) {
            return value;
        }
        var me = this,
            val = me.safeParse(value, me.format),
            altFormats = me.altFormats,
            altFormatsArray = me.altFormatsArray,
            i = 0,
            len;
        if (!val && altFormats) {
            altFormatsArray = altFormatsArray || altFormats.split('|');
            len = altFormatsArray.length;
            for (; i < len && !val; ++i) {
                val = me.safeParse(value, altFormatsArray[i]);
            }
        }
        return val;
    },
    formatDate: function (date, format) {
        return Ext.isDate(date) ? Ext.Date.dateFormat(date, format) : date;
    },
    getErrors: function (value) {
        var me = this,
            errors = me.callParent(arguments),
            format = Ext.String.format,
            svalue, time,
            clearTime = Ext.Date.clearTime,
            minValue = me.dateConfig["minDate"],
            maxValue = me.dateConfig["maxDate"],
            cpaCmp, cpaCmpId, day;
        if (value === null || value.length < 1) {
            return errors;
        }
        $LAB
            .script("resources/My97DatePicker/WdatePicker.js")
            .wait(function () {
                var w = WdatePicker;
                me.format = me.dateConfig["dateFmt"];
                if (!Ext.isEmpty(me.format, true)) {
                    if (me.format == 'yyyy-MM-dd HH:mm:ss') {
                        me.format = 'Y-m-d H:i:s';
                    }
                    else if (me.format == 'yyyy-MM-dd') {
                        me.format = 'Y-m-d';
                    }
                    svalue = value;
                    value = me.parseDate(value);
                    if (!value) {
                        errors.push(format(me.invalidText, svalue, Ext.Date.unescapeFormat(me.format)));
                        return errors;
                    }
                }
                if (minValue && maxValue) {
                    time = value.getTime();
                    if (minValue.length > maxValue.length) {
                        cpaCmpId = maxValue.substring(maxValue.indexOf("'") + 1, maxValue.indexOf(")") - 1);
                        day = minValue.substring(minValue.indexOf(":") + 1, minValue.indexOf(")") - 1);
                        if (cpaCmpId && day) {
                            cpaCmp = Ext.get(cpaCmpId).dom.value;
                            if (cpaCmp) {
                                maxValue = Ext.Date.parse(cpaCmp, me.format);
                                minValue = Ext.Date.add(Ext.Date.parse(cpaCmp, me.format), Ext.Date.DAY, Number(day));
                                if (minValue && time < minValue.getTime()) {
                                    errors.push(format(me.minText, me.formatDate(minValue, me.format)));
                                }
                                if (maxValue && time > maxValue.getTime()) {
                                    errors.push(format(me.maxText, me.formatDate(maxValue, me.format)));
                                }
                            }
                        }
                    } else {
                        cpaCmpId = minValue.substring(minValue.indexOf("'") + 1, minValue.indexOf(")") - 1);
                        day = maxValue.substring(maxValue.indexOf(":") + 1, maxValue.indexOf(")") - 1);
                        if (cpaCmpId && day) {
                            cpaCmp = Ext.get(cpaCmpId).dom.value;
                            if (cpaCmp) {
                                minValue = Ext.Date.parse(cpaCmp, me.format);
                                maxValue = Ext.Date.add(Ext.Date.parse(cpaCmp, me.format), Ext.Date.DAY, Number(day));
                                if (minValue && time < minValue.getTime()) {
                                    errors.push(format(me.minText, me.formatDate(minValue, me.format)));
                                }
                                if (maxValue && time > maxValue.getTime()) {
                                    errors.push(format(me.maxText, me.formatDate(maxValue, me.format)));
                                }
                            }
                        }
                    }
                }
                return errors;
            });
    }
});
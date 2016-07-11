/*
 * the filed has a trigger to clear value
 */
Ext.define('Ext.ux.ClearTriggerField', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.cleartriggerfield',

    triggerCls: 'x-form-clear-trigger',
    onTriggerClick: function () {
        this.reset();
        this.focus();
    }
});
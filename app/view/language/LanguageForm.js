
    Ext.define('Myapp.view.language.LanguageForm', {
        extend: 'Ext.form.Panel',
        alias: 'widget.languageform',
        requires: ['Ext.ux.DateTimeField'],

        frame: true,
        initComponent: function () {
            var me = this;
            Ext.apply(me, {
                overflowY: 'auto',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    padding: '0 15 0 15'
                },
                items: [
					{name: "language_id", fieldLabel: "language_id", xtype: "hidden", allowBlank:false},
					{name: "name", fieldLabel: "Name", xtype: "textfield", allowBlank:false},
					{name: "last_update", fieldLabel: "Update Time", xtype: "datetimefield", format: 'Y-m-d H:i:s', allowBlank:false}
	]            });
            me.callParent(arguments);
        }
    });

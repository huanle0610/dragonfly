Ext.define('Myapp.view.form.UploadFileForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.uploadfileform',

    frame: true,
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            overflowY: 'auto',
            layout: 'anchor',
            api: {
                submit: 'File.add'
            },
            defaults: {
                labelWidth: 65,
                width: 300
            },
            items: [
                {
                    name: "source",
                    fieldLabel: "File Source",
                    xtype: "combo",
                    store:['internet', 'database', 'application'],
                    allowBlank: false
                },
                {
                    name: "text1",
                    fieldLabel: "Text1",
                    xtype: "filefield",
                    regex: /.*\.txt?/i,
                    regexText: 'Please choose file using the suffix txt',
                    buttonText: 'Choose Txt',
                    allowBlank: false
                },
                {
                    name: "text2",
                    fieldLabel: "Text2",
                    xtype: "filefield",
                    regex: /.*\.txt?/i,
                    regexText: 'Please choose file using the suffix txt',
                    buttonText: 'Choose Txt'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: "hbox",
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'doUpload',
                            text: 'Upload'
                        }
                    ]
                }

            ]
        });
        me.callParent(arguments);
    }
});

Ext.define('Myapp.view.language.LanguageList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.languagelist',

    requires: ['Myapp.store.Language', 'Myapp.view.language.LanguageForm'],

    initComponent: function() {
        var me = this;
        var store = Ext.create('Myapp.store.Language');

        Ext.applyIf(me, {
            forceFit: true,
            columns: [
                {text: "ID", dataIndex: "language_id", width: 80, sortable: true},
                {text: 'Language', dataIndex: 'name'},
                {text: "Update Time", dataIndex: "last_update", flex: 1, sortable: true,  xtype : 'datecolumn', format: 'Y-m-d H:i:s'}
            ],
            store: store,
            tbar: [
                {
                    action: 'add',
                    glyph: 0xf055,
                    text: 'Add'
                },
                {
                    action: 'delete',
                    cls: 'fa-tip-danger',
                    glyph: 0xf00d,
                    text: 'Delete'
                }
            ],
            // paging bar on the bottom
            bbar: Ext.create('Ext.PagingToolbar', {
                store: store,
                displayInfo: true,
                displayMsg: 'Displaying items {0} - {1} of {2}',
                emptyMsg: "No item to display"
            })
        });

        me.callParent(arguments);
    }
});
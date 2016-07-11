Ext.define('Myapp.view.database.TableList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.database_tablelist',

    requires: [],

    initComponent: function(){
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            fields: ['table_name', 'table_description'],
            proxy: {
                type: 'direct',
                directFn: 'Database.getList',
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'totalCount'
                }
            }
        });


        Ext.applyIf(this, {
            store: store,
            forceFit: true,
            columns: [
                {text: "Table", width: 120, dataIndex: "table_name"},
                {text: "Description", width: 135, dataIndex: "table_description"}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                store: store,
                displayInfo: true,
                displayMsg: 'Show {0}-{1} of {2}',
                emptyMsg: "No table"
            },
            listeners: {
                render: function(){
                    me.getStore().load();
                }
            }
        });

        me.callParent(arguments);
    }
});

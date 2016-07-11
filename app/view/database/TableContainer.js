Ext.define('Myapp.view.database.TableContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.database_tablecontainer',

    requires: [
        'Myapp.view.database.TableList'
    ],

    initComponent: function(){
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            fields: [],
            proxy: {
                type: 'direct',
                directFn: 'Database.getTableData',
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'totalCount'
                }
            },
            listeners: {
                'metachange': function(store, meta) {
                    console.log(meta, grid);
                    grid.reconfigure(store, meta.columns);
                    grid.setTitle(Ext.String.format('Data of {0}', meta.table));
                }
            }
        });

        var grid =  Ext.createWidget('grid', {
            cls: 'mygrid',
            title: 'Data',
            flex: 1,
            forceFit: true,
            itemId: 'table_data_grid',
            columns: [],
            store: store,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: store,
                dock: 'bottom',
                displayInfo: true
            }]
        });


        Ext.applyIf(this, {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
           items: [
               {
                   title: 'Tables',
                   cls: 'mygrid',
                   width: 450,
                   collapsible: true,
                   collapseDirection: 'left',
                   xtype: 'database_tablelist'
               },
               grid
           ]
        });

        me.callParent(arguments);
    }
});

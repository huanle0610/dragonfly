Ext.define('Myapp.controller.Database', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'bell',
            selector: '#bell'
        }
    ],

    init: function() {
        var me = this;
        me.control({
            'database_tablecontainer database_tablelist': {
                scope: me,
                itemdblclick: 'tableClick'
            }
        });
    },

    tableClick: function(view, record, item, index, e){
        console.log();
        var table_data_grid = view.up('database_tablecontainer').down('#table_data_grid');
        var table = record.get('table_name');
        var store = table_data_grid.getStore();
        Ext.apply(store.getProxy().extraParams, {table: table});
        store.reload();
    }
});

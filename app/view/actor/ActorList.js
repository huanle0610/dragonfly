// actor grid
Ext.define('Myapp.view.actor.ActorList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.actorlist',

    requires: [],

    initComponent: function(){
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            idProperty: 'id',
            autoDestroy: true,
            fields: [{name: 'id', mapping: 'actor_id'},{name: 'actor_id', type: 'number'},  'first_name', 'last_name', 'last_update'],
            proxy: {
                type: 'direct',
                directFn: 'Actor.getList',
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
                {text: "Name", width: 120, xtype:'templatecolumn', tpl:'{first_name} {last_name}'},
                {text: "First Name", width: 120, dataIndex: "first_name", hidden: true},
                {text: "Last Name", width: 120, dataIndex: "last_name", hidden: true},
                {text: "Last Update", width: 135, dataIndex: "last_update"}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                store: store,
                displayInfo: true,
                displayMsg: 'Show {0}-{1} of {2}',
                emptyMsg: "No actor"
            },

            getSelected: function(){
                var sels = me.getSelectionModel().getSelection();
                if(sels.length !== 1) return null;
                return sels[0];
            }
        });

        me.callParent(arguments);
    }
});

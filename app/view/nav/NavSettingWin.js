Ext.define('Myapp.view.nav.NavSettingWin', {
    extend: 'Ext.window.Window',
    xtype: 'widget.navsettingwin',

    requires: ['Myapp.view.tree.FilteredTree'],

    resizable: false,
    modal: true,
    frameHeader: false,

    controller: 'SettingTree',
    initComponent: function(){
        var me = this;
        if(me.controller) {
            Func.getController(me.controller);
        }

        Ext.apply(me, {
            layout: 'fit',
            items: [
                {
                    cls: 'nav-menu',
                    itemId: 'nav_setting_tree',
                    xtype: 'filtered-tree',
                    filter_field: 'text',
                    store: me.treeStore
                }
            ],
            bbar: [
                '->',
                {
                    text: 'Close',
                    iconCls: 'fa fa-close',
                    itemId: 'closeWin',
                    scale: 'medium'
                },
                {
                    text: 'Save',
                    iconCls: 'fa fa-save',
                    itemId: 'saveNavSetting',
                    scale: 'medium'
                }
            ]
        });

        me.callParent(arguments);
    }
});
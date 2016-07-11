Ext.define('Myapp.controller.SettingTree', {
    extend: 'Ext.app.Controller',

    init: function() {
        var me = this;
        me.control({
            '#nav_setting_tree': {
                scope: me,
                checkchange: 'navTreeCheckChange'
            },
            '#saveNavSetting': {
                scope: me,
                click: 'saveNavSetting'
            },
            '#nav_setting_tree #expandAll': {
                scope: me,
                click: 'expandAll'
            },
            '#nav_setting_tree #collapseAll': {
                scope: me,
                click: 'collapseAll'
            }
        });
    },

    saveNavSetting: function(cmp){
        var tree = cmp.up('window').down('#nav_setting_tree');
        var records = tree.getView().getChecked(),
            names = [];

        Ext.Array.each(records, function(rec){
            names.push(rec.get('text'));
        });

        console.log(records, names);
    },

    // tree node  checked change
    navTreeCheckChange: function(node, checked){
        if(!node.hasChildNodes()) {
            return;
        }
        var fn = function(cnode){
            cnode.set('checked', checked)
        };
        node.eachChild(fn);
    },

    expandAll: function(cmp){
        var tree = cmp.up('treepanel');
        tree.expandAll();
    },

    collapseAll: function(cmp){
        var tree = cmp.up('treepanel');
        tree.collapseAll();
    }
});

Ext.define('Myapp.view.tree.FilteredTree', {
    extend: 'Ext.tree.Panel',

    xtype: 'filtered-tree',

    initComponent: function(){
        var me = this;

        Ext.apply(me, {
            rootVisible: false,
            animate: false,
            reserveScrollbar: true,
            //plugins: [{
            //    ptype: 'bufferedrenderer'
            //}],
            useArrows: true,
            tbar: [
                {
                    text: 'Expand All',
                    iconCls: 'fa fa-angle-double-down',
                    itemId: 'expandAll',
                    scale: 'medium'
                },
                {
                    text: 'Collapse All',
                    iconCls: 'fa fa-angle-double-up',
                    itemId: 'collapseAll',
                    scale: 'medium'
                },
                {
                    labelWidth: 45,
                    xtype: 'triggerfield',
                    fieldLabel: 'Filter',
                    triggerCls: 'x-form-clear-trigger',
                    onTriggerClick: function () {
                        var store = this.up('treepanel').store;

                        this.reset();
                        store.clearFilter();
                        this.focus();
                    },
                    listeners: {
                        change: function () {
                            var tree = this.up('treepanel'),
                                v,
                                matches = 0;

                            try {
                                v = new RegExp(this.getValue(), 'i');
                                tree.store.filter({
                                    filterFn: function (node) {
                                        var children = node.childNodes,
                                            len = children && children.length,

                                        // Visibility of leaf nodes is whether they pass the test.
                                        // Visibility of branch nodes depends on them having visible children.
                                            visible = node.isLeaf() ? v.test(node.get(me.filter_field)) : false,
                                            i;

                                        // We're visible if one of our child nodes is visible.
                                        // No loop body here. We are looping only while the visible flag remains false.
                                        // Child nodes are filtered before parents, so we can check them here.
                                        // As soon as we find a visible child, this branch node must be visible.
                                        for (i = 0; i < len && !(visible = children[i].get('visible')); i++);

                                        if (visible && node.isLeaf()) {
                                            matches++;
                                        }
                                        return visible;
                                    },
                                    id: 'titleFilter'
                                });
                                tree.down('#matches').setValue(matches);
                            } catch (e) {
                                this.markInvalid('Invalid regular expression');
                            }
                        },
                        buffer: 250
                    }
                },
                {
                    xtype: 'displayfield',
                    itemId: 'matches',
                    fieldLabel: 'Matches',

                    // Use shrinkwrap width for the label
                    labelWidth: null,
                    listeners: {
                        beforerender: function () {
                            var me = this,
                                tree = me.up('treepanel'),
                                root = tree.getRootNode(),
                                leafCount = 0;

                            tree.store.on('fillcomplete', function (store, node) {
                                if (node === root) {
                                    root.visitPostOrder('', function (node) {
                                        if (node.isLeaf()) {
                                            leafCount++;
                                        }
                                    });
                                    me.setValue(leafCount);
                                }
                            });
                        },
                        single: true
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
Ext.define('Myapp.view.film.FilmList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.filmlist',

    requires: ['Ext.ux.ComboDefaultValuePlugin'],

    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            fields: [],
            remoteFilter: true,
            proxy: {
                type: 'direct',
                directFn: 'Database.getTableData',
                extraParams: {table: "film_list"},
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'totalCount'
                }
            },
            listeners: {
                'metachange': function (store, meta) {
                    me.reconfigure(store, meta.columns);
                    me.setTitle(Ext.String.format('Data of {0}', meta.table));
                }
            }
        });

        var catStore = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            autoLoad: true,
            fields: ['category_id', 'name'],
            proxy: {
                type: 'direct',
                directFn: 'Database.getTableData',
                extraParams: {table: "category"},
                reader: {
                    type: 'json',
                    root: 'items',
                    totalProperty: 'totalCount'
                }
            }
        });

        var doSearch = function(){
            store.clearFilter(true);
            var filters = [];
            var title = me.down('#title').getValue();
            var cat = me.down('#category').getValue();
            var rating = me.down('#rating').getValue();
            var length_min = me.down('#length_min').getValue();
            var length_max = me.down('#length_max').getValue();

            if(title) {
                filters.push({
                    property: 'title',
                    operator: 'like',
                    id: 'title',
                    value: title
                });
            }

            if(cat && cat != 'All') {
                filters.push({
                    property: 'category',
                    id: 'category',
                    value: cat
                });
            }

            if (rating && rating != 'All') {
                filters.push({
                    property: 'rating',
                    id: 'rating',
                    value: rating
                });
            }

            if (length_min && length_min >= 0) {
                filters.push({
                    property: 'length',
                    id: 'length_min',
                    operator: '>=',
                    value: length_min
                });
            }

            if (length_max && length_max >= 0) {
                filters.push({
                    property: 'length',
                    id: 'length_max',
                    operator: '<',
                    value: length_max
                });
            }

            console.log(filters);

            if(filters.length) {
                store.addFilter(filters);
            } else {
                store.load();
            }
        };

        Ext.applyIf(me, {
            forceFit: true,
            columns: [],
            store: store,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                defaults: {
                    margin: '0 5 0 0'
                },
                items:[
                    {
                        margin: '0 5 0 10',
                        fieldLabel: 'Title',
                        labelWidth: 32,
                        itemId: 'title',
                        xtype: 'cleartriggerfield',
                        listeners: {
                            change: function(){
                                me.fireEvent('fc');
                            }
                        }
                    },
                    {
                        fieldLabel: 'Category',
                        labelWidth: 56,
                        store: catStore,
                        itemId: 'category',
                        displayField: 'name',
                        valueField: 'name',
                        queryMode: 'local',
                        lastQuery: '',
                        xtype: 'combo',
                        editable: false,
                        plugins: [{
                            ptype : 'combodefaultvalueplugin'
                        }],
                        defaultRecord: {name: 'All'},
                        listeners: {
                            select: function(){
                                me.fireEvent('fc');
                            }
                        }
                    },
                    {
                        fieldLabel: 'Rating',
                        labelWidth: 32,
                        editable: false,
                        itemId: 'rating',
                        store: ['All', 'G','PG','PG-13','R','NC-17'],
                        xtype: 'combo',
                        listeners: {
                            select: function(){
                                me.fireEvent('fc');
                            }
                        }
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelWidth: 45,
                        fieldLabel: 'Length',
                        items: [
                            {
                                width: 32,
                                hideTrigger : true,
                                minValue: 0,
                                maxValue: 500,
                                itemId: 'length_min',
                                xtype: 'numberfield',
                                listeners: {
                                    change: function(){
                                        me.fireEvent('fc');
                                    }
                                }
                            },
                            {
                                xtype: 'label',
                                margin: '0 5 0 5',
                                text: 'to'
                            },
                            {
                                width: 32,
                                hideTrigger : true,
                                minValue: 0,
                                maxValue: 500,
                                itemId: 'length_max',
                                xtype: 'numberfield',
                                listeners: {
                                    change: function(){
                                        me.fireEvent('fc');
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        handler: function(){
                            me.fireEvent('fc');
                        },
                        iconCls: 'x-tbar-loading'
                    }
                ]
            }],
            // paging bar on the bottom
            bbar: Ext.create('Ext.PagingToolbar', {
                store: store,
                displayInfo: true,
                displayMsg: 'Displaying items {0} - {1} of {2}',
                emptyMsg: "No item to display"
            })
        });

        me.callParent(arguments);

        me.on({
            fc: function(){
                doSearch();
            },
            buffer: 500
        })
    }
});
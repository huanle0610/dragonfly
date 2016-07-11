Ext.define('Myapp.controller.Profiler', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'viewport',
            selector: 'viewport'
        },
        {
            ref: 'bell',
            selector: '#bell'
        },
        {
            ref: 'centerPanel',
            selector: '#centerPanel'
        },
        {
            ref: 'debugPanel',
            selector: '#debug_panel'
        }
    ],

    init: function () {
        var me = this;

        me.control({
            '#showProfile': {
                scope: me,
                click: 'showDebugWin'
            },
            '#profiler_grid': {
                scope: me,
                itemclick: 'profilerClickFn'
            },
            '#logfile_grid': {
                scope: me,
                itemclick: 'logGridClickFn'
            },
            '#unpin_debug': {
                scope: me,
                click: 'showDebugWin'
            }
        });

        me.listen({
            extAjax: {
                '*': {
                    beforerequest: function (conn, options) {
                        //console.log('before', conn, options, options.url);
                    },
                    requestexception: function (conn, response, options) {
                        console.log('exception', response.status, response);
                        if (response.status == 420) {
                            Myapp.Const.popLogin();
                            forceExit();
                        } else  if (response.status >= 500) {
                            if(response.status == 535) {
                                var where = Ext.String.format('<div class="where_txt">{0}</div>', Ext.decode(response.responseText).where.split('\n').join('<br/>'));
                                Downq('#debugHtml').update(where);
                            } else {
                                Downq('#debugHtml').update(response.responseText);
                            }
                            me.showDebugWin('#debugHtml');
                            //forceExit();
                        }
                    },
                    requestcomplete: function (proxy, response, operation) {
                        if (response.status == 200) {
                            var resp = {};

                            var getProfiler = /\*{{{(.*?)}}}\*\//.exec(response.responseText);
                            if (getProfiler && getProfiler.length > 1 && getProfiler[1].length > 15) {
                                resp = getProfiler[1];
                                resp = resp.replace(/@new_line@/g, '\n')
                                    .replace(/@comment_start@/g, '/*')
                                    .replace(/@comment_end@/g, '*/');

                                Downq('#debugHtml').update(resp);
                            }
                        }
                    }
                }
            }
        });

        Ext.util.CSS.swapStyleSheet('debug_css', 'resources/css/debug.css');
    },

    profilerClickFn: function(view, record) {
        var output = Ext.getCmp('debugWin').down('#output');
        output.update(record.get('html'));
    },

    logGridClickFn: function(view, record) {
        var me = this;
        me.getLogDetail(record.get('id'));
    },

    getLogDetail: function(id){
        var output = Ext.getCmp('debugWin').down('#log_output');
        ExtProfile.getLogDetail(id, function(r){
            if(r.suc){
                output.setValue(r.content);
            } else {
                output.setValue(r.msg);
            }
        });
    },

    showDebugWin: function (activeErrorCard) {
        var me = this;
        var w = Ext.getCmp('debugWin');
        var panel = me.getDebugPanel();

        if (!w) {
            var store = Ext.create('Ext.data.Store', {
                idProperty: 'id',
                autoDestroy: true,
                remoteFilter: true,
                remoteSort: true,
                sorters: [
                    {
                        property: 'create_at',
                        direction: 'DESC'
                    }
                ],
                fields: [
                    'id',
                    {name: 'memory', type: 'number'},
                    {name: 'total_time', type: 'number'},
                    'html', 'class', 'method','ext_action', 'ext_method', 'ip', 'create_at'
                ],
                proxy: {
                    type: 'direct',
                    directFn: 'ExtProfile.getList',
                    reader: {
                        type: 'json',
                        root: 'items',
                        totalProperty: 'totalCount'
                    }
                }
            });
            store.on({
                load: function(st, records, suc) {
                    var output = Ext.getCmp('debugWin').down('#output');
                    if(suc && records.length){
                        output.update(records[0].get('html'));
                    } else {
                        output.update('no data');
                    }
                }
            });
            var profiler_grid = {
                title: 'Profile Logs',
                xtype: 'grid',
                stateful: true,
                stateId: 'profiler_grid',
                width: 300,
                itemId: 'profiler_grid',
                store: store,
                columns: [
                    { text: 'ID',  dataIndex: 'id' },
                    { text: 'Total Time', dataIndex: 'total_time', flex: 1 },
                    { text: 'Memory', dataIndex: 'memory', renderer: Ext.util.Format.fileSize },
                    { text: 'Class', dataIndex: 'class' },
                    { text: 'Method', dataIndex: 'method' },
                    { text: 'Ext Action', dataIndex: 'ext_action' },
                    { text: 'Ext Method', dataIndex: 'ext_method' },
                    { text: 'At', dataIndex: 'create_at' }
                ],
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: store,   // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                }]
            };

            var logStore = Ext.create('Ext.data.Store', {
                idProperty: 'id',
                autoDestroy: true,
                remoteFilter: true,
                remoteSort: true,
                sorters: [
                    {
                        property: 'modify_at',
                        direction: 'DESC'
                    }
                ],
                fields: [
                    'id',
                    {name: 'size', type: 'number'},
                    'name', 'relative_path', 'server_path', 'modify_at'
                ],
                proxy: {
                    type: 'direct',
                    directFn: 'ExtProfile.getLogList',
                    reader: {
                        type: 'json',
                        root: 'items',
                        totalProperty: 'totalCount'
                    }
                }
            });
            logStore.on({
                load: function(st, records, suc) {
                    var output = Ext.getCmp('debugWin').down('#log_output');
                    if(suc && records.length){
                       me.getLogDetail(records[0].get('id'));
                    } else {
                        output.setValue('no data');
                    }
                }
            });
            var logs_grid = {
                title: 'Profile Logs',
                xtype: 'grid',
                stateful: true,
                stateId: 'logfile_grid',
                width: 300,
                itemId: 'logfile_grid',
                store: logStore,
                columns: [
                    { text: 'ID',  dataIndex: 'id' },
                    { text: 'Memory', dataIndex: 'size', renderer: Ext.util.Format.fileSize },
                    { text: 'Name', dataIndex: 'name' },
                    { text: 'At', dataIndex: 'modify_at' }
                ],
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: logStore,   // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                }]
            };

            //切换
            var focusItem = function(cmp){
                var layout = w.getLayout();
                layout.setActiveItem(cmp.itemIdx);
                if(cmp.itemIdx == 0) {
                    store.load();
                } else if(cmp.itemIdx == 1) {
                    logStore.load();
                }
            };

            w = Ext.create('Ext.window.Window', {
                id: 'debugWin',
                title: 'Debug Window',
                maximizable: true,
                animateTarget: Downq('#showProfile'),
                height: 768,
                width: 1024,
                closeAction: 'hidden',
                overflowY: 'auto',
                layout: 'card',
                cls: 'toolbar-f16',
                dockedItems: [{
                    xtype: 'toolbar',
                    padding: 10,
                    dock: 'top',
                    items:[
                        '->',
                        {
                            itemId: 'table',
                            enableToggle: true,
                            toggleGroup: 'debug_win',
                            iconCls: 'fa fa-table',
                            tooltip: 'show profile grid',
                            itemIdx: 0,
                            handler: focusItem
                        },
                        {
                            itemId: 'file_log',
                            enableToggle: true,
                            toggleGroup: 'debug_win',
                            iconCls: 'fa fa-file-text-o',
                            tooltip: 'show file log',
                            itemIdx: 1,
                            handler: focusItem
                        },
                        {
                            itemId: 'exception_log',
                            enableToggle: true,
                            toggleGroup: 'debug_win',
                            iconCls: 'fa fa-warning',
                            tooltip: 'show warning',
                            itemIdx: 2,
                            handler: focusItem
                        },
                        '->'
                    ]
                }],
                items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            profiler_grid,
                            {
                                xtype: 'panel',
                                flex: 1,
                                overflowY: 'auto',
                                itemId: 'output'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            logs_grid,
                            {
                                xtype: 'textarea',
                                flex: 1,
                                itemId: 'log_output',
                                title: 'Backend Log'
                            }
                        ]
                    },

                    Downq('#debugHtml')
                ]
            });
            panel.hide();
        }
        w.show();
        if(activeErrorCard){
            w.getLayout().setActiveItem(2);
        }
    }
});

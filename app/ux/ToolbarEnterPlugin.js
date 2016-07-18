/**
 * Provides a convenient toolbar plugin for quick search by pressing Enter key.
 *
 * Usage:
 *
 *     {
 *           xtype: 'toolbar',
 *           plugins: [ Ext.create('Ext.ux.ToolbarEnterPlugin', {
 *                   enterKeyFn: function(){
 *                       console.log('enjoy it');
 *                  }
 *          })],
 *          dock: 'top',
 *          items: [
 *              {xtype: 'textfiled', fieldLabel: 'Enter can search'}
 *          ]
 *     }
 */
Ext.define('Ext.ux.ToolbarEnterPlugin', {
    extend : 'Ext.AbstractPlugin',
    alias : 'plugin.toolbarenterplugin',

    enterKeyFn: null,
    init : function(toolbar) {
        var me = this;
        me.toolbar = toolbar;

        if(Ext.isFunction(me.enterKeyFn)) {
            toolbar.on({
                render: function(cmp){
                    var el = cmp.getEl();
                    el.on({
                        keyup: function(e){
                            if(e.getKey() == e.ENTER) {
                                me.enterKeyFn();
                            }
                        }
                    });
                }
            });
        }
    }
});

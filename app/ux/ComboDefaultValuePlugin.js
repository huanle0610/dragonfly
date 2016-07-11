Ext.define('Ext.ux.ComboDefaultValuePlugin', {
    extend : 'Ext.AbstractPlugin',
    alias : 'plugin.combodefaultvalueplugin',

    init : function(comboBox) {
        var me = this;
        me.comboBox = comboBox;

        if(me.comboBox.defaultRecord){
            me.comboBox.store.on({
                load: function(st){
                    st.insert(0, me.comboBox.defaultRecord);
                }
            });
        }
    }
});

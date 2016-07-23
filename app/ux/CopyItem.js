Ext.define('Ext.ux.CopyItem', {
    extend: 'Ext.Component',
    alias: 'widget.copymenuitem',

    cls: 'zclip',
    style: 'cursor: pointer',
    initComponent: function () {
        var me = this;
        me.on({
            render: function(){
                if(typeof ZeroClipboard == "undefined") {
                    me.el.on({
                        click: function(){
                            var w = Ext.Msg.prompt('Tip', 'Press Ctrl+C to Copy', null , null, false , me.getCopyText());
                            w.down('toolbar').hide();
                            w.down('textfield').selectText();
                            w.down('textfield').setReadOnly(true);
                        }
                    })
                }
            }
        });
        this.callParent(arguments);
    },

    getCopyText: function(){
        var me = this;
        return me.el.getHTML();
    },

    afterCopy: function(){
        var w = Ext.Msg.alert('Tip', 'Press Ctrl+V to paste');
        Ext.defer(function(){ w.close(); }, 600);
    }
});
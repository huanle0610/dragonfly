Ext.define('Myapp.controller.Form', {
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
            '#doUpload': {
                scope: me,
                click: 'uploadForm'
            }
        });
    },

    uploadForm: function(cmp){
        var form = cmp.up('form');
        if(form.isValid()){
            form.submit({
                success: function (frm, action) {
                    console.log(action);
                    Ext.Msg.alert('tip', action.result.msg);
                },
                failure: function (frm, action) {
                    console.log(action);
                    Ext.Msg.alert('tip', action.result.msg);
                }
            });
        } else {

        }
    }
});

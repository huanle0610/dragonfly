Ext.define('Myapp.Func', {});

Ext.define('Func', {
    singleton: true,
    log: function(msg) {
        console.log(msg);
    },

    getController: function(controller){
        Myapp.getApplication().getController(controller);
    },

    showLoading: function(msg, cmp){
        msg = msg || 'loading...';
        cmp = cmp || Downq('viewport');
        cmp.getEl().mask(msg);
    },

    hideLoading: function(cmp){
        cmp = cmp || Downq('viewport');
        if(cmp && cmp.getEl()) {
            cmp.getEl().unmask();
        }
    },

    getSel: function(grid) {
        if (typeof grid == 'string') {
            grid = Downq(grid);
        }
        if (grid && grid['getSelectionModel']) {
            return grid.getSelectionModel().getSelection();
        } else {
            console.log(grid + ' does not have SM.');
            return false;
        }
    },

    showFieldErrMsg: function(errors) {
        var keys = Ext.Object.getKeys(errors);
        var msg = [];
        Ext.Array.each(keys, function(key){
            msg.push(Ext.String.format('<p>{0}</p><ul><tpl for="{1}"><li>{.}</li></tpl></ul>', Ext.String.capitalize(key), key));
        });
        var tpl = new Ext.XTemplate(msg);
        return tpl.apply(errors);
    },

    onStoreSyncFailure: function(batch, options, form, store) {
        // extract server side validation errors
        var serverSideValidationErrors = batch.exceptions[0].error;
        var errors = new Ext.data.Errors();

        for (var field in serverSideValidationErrors) {
            var message = Func.getFieldErrMsg(serverSideValidationErrors[field]);
            errors.add(undefined, {field: field, message: message});
        }
        form.getForm().markInvalid(errors);
        store.rejectChanges();
    },

    showWindow: function(cfg) {
        cfg = Ext.apply({
            layout: 'fit',
            autoShow: true,
            modal: true
        }, cfg);

        if(cfg.enableButtons) {
            cfg.buttons = [
                {
                    text: 'Save',
                    glyph: 0xf0c7,
                    action: 'save'
                },
                {
                    text: 'Cancel',
                    glyph: 0xf112,
                    action: 'close'
                }
            ];
        }
        return Ext.createWidget('window', cfg);
    },

    closeWin: function(cmp){
        if(cmp.isWindow){
            cmp.close();
        } else {
            var win = cmp.up('window');
            if(win){
                win.close();
            }
        }
    }
});
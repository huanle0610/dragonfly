Ext.define('Myapp.controller.Language', {
    extend: 'Ext.app.Controller',
    stores: [],
    views: [],

    init: function () {
        this.control({
            'languagelist': {
                itemdblclick: this.editLanguage,
                selectionchange: this.selectChangeLanguage
            },
            'languagelist button[action=add]': {
                click: this.newLanguage
            },
            'languagelist button[action=delete]': {
                click: this.deleteLanguage
            },
            '#edit_languageform_win button[action=save]': {
                click: this.updateLanguage
            },
            '#new_languageform_win button[action=save]': {
                click: this.createLanguage
            }

        });
    },

    showList: function () {
        var wid = 'LanguageWin';
        var w = Downq('#' + wid);
        if (!w) {
            w = Func.showWindow({
                itemId: wid,
                title: 'Language List',
                items: {
                    xtype: 'languagelist'
                }
            });
        }
        w.show().center();
        w.down('grid').getStore().reload();
    },

    selectChangeLanguage: function (selModel, selections) {
        var view = selModel.view.ownerCt;
        Downq('button[action=delete]', view)[(selections.length) ? 'enable' : 'disable']();
    },

    editLanguage: function (grid, record) {
        var w = Func.showWindow({
            title: 'Edit Language',
            items: Ext.widget('languageform', {sourceGrid: grid}),
            enableButtons: true,
            itemId: 'edit_languageform_win'
        });
        console.log(record.data);
        w.down('form').loadRecord(record);
    },

    newLanguage: function (button) {
        var w = Func.showWindow({
            title: 'New Language',
            width: 395,
            height: 135,
            enableButtons: true,
            items:  Ext.widget('languageform', {sourceGrid: button.up('grid')}),
            itemId: 'new_languageform_win'
        });
    },

    updateLanguage: function (button) {
        var me = this;
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
        var viewEF = form.getForm();

        if (viewEF.isValid()) {
            record.set(values);

            var store = form.sourceGrid.getStore();

            if (Ext.Object.isEmpty(record.modified)) {
                win.close();
                return false;
            }
            Func.showLoading('Processing...', win);
            store.sync({
                callback: function () {
                    Func.hideLoading(win);
                },
                success: function () {
                    console.log('update record suc');
                    win.close();
                    store.reload();
                },
                failure: function (batch, options) {
                    console.log('update record failed');
                    Func.onStoreSyncFailure(batch, options, form, store);
                }
            });
        }
    },

    createLanguage: function (button) {
        var me = this;
        console.log('clicked the Save button Create');
        var win = button.up('window'),
            form = win.down('form'),
            values = form.getValues();

        var viewEF = form.getForm();

        if (!viewEF.isValid()) {
            return;
        }
//            console.log(values);
        var store = form.sourceGrid.getStore();
        store.add(values);

        Func.showLoading('Processing...', win);
        store.sync({
            callback: function () {
                Func.hideLoading(win);
            },
            success: function () {
                console.log('add record suc');
                win.close();
                store.reload();
            },
            failure: function (batch, options) {
                console.log('add record failed');
                Func.onStoreSyncFailure(batch, options, form, store);
            }
        });
    },

    deleteLanguage: function (cmp) {
        var me = this;
        var view = cmp.up('grid');
        var selection = Func.getSel(view);
        if (selection) {
            Ext.Msg.confirm('Confirm', 'Sure to delete the selected item(s)？', function (buttonId, text, opt) {
                if (buttonId == 'yes') {
                    var store = view.getStore();
                    store.remove(selection);
                    store.sync({
                        failure: function (records, operation) {
                            store.rejectChanges();
                        }
                    });
                }
            });
        }
    }
});
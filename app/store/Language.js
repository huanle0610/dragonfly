Ext.define('Myapp.store.Language', {
    extend: 'Ext.data.Store',
    storeId: 'languageStore',

    autoLoad: false,
    model: 'Myapp.model.Language',
    pageSize: 30,
    batchActions: false,
    remoteFilter: true,
    remoteSort: true,
    sorters: [{
        property: 'last_update',
        direction: 'DESC'
    }],
    proxy: {
        type: 'direct',
        api: {
            create  : 'Language.addLanguage',
            read    : 'Language.getList',
            update  : 'Language.updateLanguage',
            destroy : 'Language.deleteLanguage'
        },
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'totalCount'
        }
    }
});
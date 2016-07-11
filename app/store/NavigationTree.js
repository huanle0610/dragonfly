Ext.define('Myapp.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',
    root: {
        expanded: true,
        children: [
            {
                text:   'Languages',
                view:   'language.LanguageList',
                useGlyph: true,
                iconCls: 'right-icon hot-icon fa fa-language ',
                leaf:   true,
                routeId: 'language'
            },
            {
                text:   'Upload',
                view:   'form.UploadFileForm',
                useGlyph: true,
                iconCls: 'right-icon hot-icon fa fa-upload ',
                leaf:   true,
                routeId: 'upload'
            },
            {
                text: 'Database',
                view: 'database.TableContainer',
                useGlyph: true,
                leaf: true,
                iconCls: 'fa fa-database',
                routeId:'faq'
            },
            {
                text: 'Buffer Filter',
                view: 'film.FilmList',
                shareController: true,
                useGlyph: true,
                leaf: true,
                iconCls: 'fa fa-search',
                routeId:'filter'
            }
        ]
    }
});
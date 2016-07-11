Ext.define('Myapp.model.Language', {
    extend: 'Ext.data.Model',
    idProperty: 'language_id',
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'language_id',   type: 'int'},
        {name: 'last_update', type: 'string'}
    ]
});
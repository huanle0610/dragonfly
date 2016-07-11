Ext.Loader.setConfig({
    enabled: true,
    paths:{
        'Ext.Override': 'app',
        'Ext.ux': 'app/ux',
        'Myapp': 'app'
    }
});

var Ecq = function (selector, dn) {
    return Ext.ComponentQuery.query(selector, dn);
};
var Downq = function(selector, dn) { return Ecq(selector, dn)[0] };

var forceExit = function(msg){ throw new Error(msg || 'Force to stop js continue.'); };

Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
Ext.application({
    name: 'Myapp',

    appFolder: 'app',
    requires: ['Myapp.Override', 'Myapp.Func', 'Ext.ux.ClearTriggerField'],
    stores: [
        'NavigationTree'
    ],
    controllers: [
        'Nav'
    ],

    init: function(){
        if(Ext.supports.LocalStorage){
            Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
        }else{
            Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
                expires: (new Date(new Date().getTime() + (86400*100)))
            }));
        }
    },

    autoCreateViewport: true
});
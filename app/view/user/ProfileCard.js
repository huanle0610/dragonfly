Ext.define('Myapp.view.user.ProfileCard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.profilecard',

    requires: [],

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            layout: 'hbox',
            items: [
                {
                    xtype: 'image',
                    cls: 'profile-image',
                    src: 'resources/img/user-photo/photo.jpg'
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    margin: '0 0 0 10',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'user_name',
                            html: 'Yogi'
                        },
                        {
                            xtype: 'label',
                            html: 'yogi@am.org'
                        }
                    ]
                }

            ],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                cls: 'btn-with-border',
                padding: '10 20',
                items: [
                    {
                        text: 'Edit Profile',
                        scale: 'medium',
                        iconCls: 'fa fa-edit'
                    },
                    '->',
                    {
                        text: 'Sign out',
                        scale: 'medium',
                        iconCls: 'fa fa-sign-out'
                    }
                ]
            }]
        });

        me.callParent(arguments);
    }
});
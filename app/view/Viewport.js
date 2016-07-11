
Ext.define('Myapp.view.Viewport', {
    extend: 'Ext.Viewport',
    layout: 'fit',

    requires: [],

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            cls: 'myapp',
            layout: 'border',
            items: [
                {
                    region:'north',
                    height: 70,
                    xtype: 'toolbar',
                    itemId: 'header',
                    cls: 'header',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'box',
                                    cls: 'site-logo',
                                    html: '<i class="fa fa-linux fa-3"></i>'
                                },
                                {
                                    xtype: 'box',
                                    cls: 'site-name',
                                    tpl: '{name}',
                                    data: Myapp.Const.site
                                }
                            ]
                        },
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        },
                        {
                            cls: 'delete-focus-bg',
                            iconCls:'fa fa-bug',
                            itemId: 'showProfile',
                            tooltip: 'See profiler'
                        },
                        {
                            cls: 'delete-focus-bg',
                            iconCls:'fa fa-search',
                            href: '#search',
                            hrefTarget: '_self',
                            tooltip: 'See latest search'
                        },
                        {
                            cls: 'delete-focus-bg',
                            iconCls:'fa fa-envelope',
                            href: '#email',
                            hrefTarget: '_self',
                            tooltip: 'Check your email'
                        },
                        {
                            cls: 'delete-focus-bg',
                            itemId: 'bell',
                            iconCls:'fa fa-bell'
                        },
                        {
                            cls: 'delete-focus-bg',
                            iconCls:'fa fa-th-large',
                            href: '#profile',
                            hrefTarget: '_self',
                            tooltip: 'See your profile'
                        },
                        {
                            xtype: 'tbtext',
                            text: 'Yogi',
                            id: 'top-user-name'
                        },
                        {
                            xtype: 'image',
                            cls: 'header-right-profile-image',
                            height: 32,
                            width: 32,
                            itemId: 'profile_img',
                            alt: 'current user image',
                            src: 'resources/img/user-photo/photo.jpg'
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 250,
                    collapsible: true,
                    itemId: 'navzone',
                    stateful: true,
                    stateId: 'navzone',
                    layout: 'fit',
                    split: true,
                    title: 'Navigation',
                    tools: [
                        {
                            type: 'gear',
                            itemId: 'navTreeSetting'
                        }
                    ],
                    items: [
                        {
                            cls: 'nav-menu',
                            useArrows: true,
                            xtype: 'treepanel',
                            itemId: 'nav_tree',
                            store: 'NavigationTree',
                            rootVisible: false
                        }
                    ]
                    // could use a TreePanel or AccordionLayout for navigational items
                },
                {
                    region: 'south',
                    title: 'South Panel',
                    collapsible: true,
                    collapsed: true,
                    html: 'Information goes here',
                    split: true,
                    height: 100,
                    minHeight: 100
                },
                {
                    region: 'east',
                    title: 'Ajax Request Debug',
                    itemId: 'debug_panel',
                    overflowY: 'auto',
                    hidden: true,
                    collapsible: true,
                    collapsed: true,
                    split: true,
                    width: 150,
                    layout: 'fit',
                    items: {
                        xtype: 'box',
                        cls: 'debug_box',
                        itemId: 'debugHtml'
                    },
                    tools: [
                        {
                            itemId: 'unpin_debug',
                            type: 'unpin'
                        },
                        {
                            itemId: 'pin_debug',
                            type: 'pin',
                            hidden: true
                        }
                    ]
                },
                {
                    region: 'center',
                    itemId: 'centerPanel',
                    xtype: 'tabpanel', // TabPanel itself has no title
                    activeTab: 1,      // First tab active by default
                    cls: 'mainTab',
                    tabBar : {
                        height : 30,
                        defaults:{
                            height : 30
                        }
                    },
                    items: [
                        {
                            title: 'keep content',
                            xtype: 'form',
                            stateful: true,
                            stateId: 'good_form',
                            closable: true,
                            iconCls: 'fa fa-group',
                            bodyPadding: 20,
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'the content will be keep even after refresh this page '
                                },
                                {
                                    xtype: 'textfield',
                                    stateful: true,
                                    stateId: 'good_form_abc',
                                    name: 'abc'
                                },
                                {
                                    xtype: 'textfield',
                                    stateful: true,
                                    stateId: 'good_form_abcd',
                                    name: 'abcd'
                                }
                            ]
                        },
                        Ext.create('Myapp.view.actor.ActorList', {
                            title: 'actor(click this will get an error)'
                        })
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});

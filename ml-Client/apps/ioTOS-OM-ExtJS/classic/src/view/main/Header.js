Ext.define('IoTosOmExt.view.main.Header', {
	extend: 'Ext.toolbar.Toolbar',

	alias: 'widget.app-mainheader',

	requires: [
	],
	
    height: CONSTANTS.MAIN_HEADER_HEIGHT,
    itemId: 'headerBar',
    
    lblContainerNo: {type: 'bundle', key: 'containerDetailContainerNo'},
	
	logout: {type: 'bundle', key: 'logout'},
	
	initComponent: function() {
		var me = this;
    	
		Ext.apply(me, {
            items: [{
	            	xtype: 'image',
	            	reference: 'refCustomerLogo'
	            }, '->',
//	            {
//                    xtype: 'textfield',
//                    labelAlign:'right',
//                    reference: 'ctlMainContainerNo',
//                    fieldLabel: me.lblContainerNo,
//                    labelWidth:100,
//                    width:240,
//                    fieldStyle: 'text-transform:uppercase;',
//                    vtype:'alphanum',
//					maxLength:12,
//                    enforceMaxLength:true,
//					listeners: {
//						specialkey: 'onContainerSearch'
//					}
//                },
//	            {
//                    iconCls:'x-fa fa-star-o',
//                    reference: 'refFavoriteMenu',
//                    ui: 'header',
//                    tooltip: 'Favorite',
//                    disabled: true,
////                    handler: 'onFavoriteClick'
//                },
	            {
                    xtype: 'combobox',
                    reference: 'ctlMainMenuSearch',
                    fieldLabel: ViewUtil.getLabel('menu'),
                    forceSelection : true,
                    typeAhead: false,
                    hideTrigger:true,
                    labelAlign:'right',
                    queryMode: 'local',
                    displayField: 'menuScreenName',
                    valueField: 'menuId',
                    labelWidth:40,
                    width : 230,
                    bind: {
                    	store: '{menuSearchList}'
                    },
   					listeners: {
						select: 'onMenuSearch'
					}
                },
	            {
                    iconCls:'x-fa fa-star-o',
                    reference: 'refHeaderMyMenu',
                    ui: 'header',
                    tooltip: ViewUtil.getLabel('myMenu'),
                    handler: 'onMyMenuClick'
                },
                {
                	ui: 'header',
                	iconCls:'x-fa fa-user txt_base',
                	tooltip: 'Click to see your Profile',
                    bind: {
                    	text: '{profileName}'
                    },
                    listeners: {
            			click: 'onShowUserInfo'
            		}
                }
            ]
		
		});
		
		me.callParent();
	}
	
});
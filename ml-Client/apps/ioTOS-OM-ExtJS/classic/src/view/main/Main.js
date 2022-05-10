Ext.define('IoTosOmExt.view.main.Main', {
	extend : 'Ext.panel.Panel',
	plugins : 'viewport',
	alias: 'widget.app-main',
	requires : [ 
		'Ext.rtl.*',
		'Ext.draw.plugin.SpriteEvents',
		'Ext.container.Viewport',
		'IoTosOmExt.view.main.MainController', 
		'IoTosOmExt.view.main.MainModel',
		'IoTosOmExt.view.main.Header',
		'IoTosOmExt.view.main.Profile',
		'TSB.ux.menu.TreeMenu',
		// 'IoTosOmExt.view.login.Login',
		'Ext.grid.column.Date',
		'Iotos.view.login.Login'
	],

	uses : [
		'IoTosOmExt.view.*'	    
    ],

	xtype : 'app-main',
	controller : 'main',
	viewModel : {
		type : 'main'
	},
	
	layout: {
		type: 'border',
		align: 'stretch'
	},
	
	reference : 'main',
	itemId: 'main',
	
	lblProjectTitle : CONSTANTS.PROJECT_TITLE,
	lblDashboard : 'Workspace',
	lblInbox : 'Inbox',

	initComponent : function() {
		var me = this;
		
		//remove scroll bar of Browser window
		Ext.getBody().setStyle('overflow', 'hidden');	
		
		Ext.apply(me, {
			rtl : IoTosOmExt.config.Locale.getRtl(),
			
			items: [{
				region: 'west',
				split: true,
				collapsible: true,
				header: true,
				// iconCls: 'ticon-cloud-shipping',
				iconCls : 'operationManagement',
				title: CONSTANTS.PROJECT_TITLE,
				border: false,
				width: CONSTANTS.MENU_EXPANDED_WIDTH,
				reference: 'refmenu',
				layout: 'fit',
				scrollable: 'y',	//When layout=fit, it does not working
				stateId: 'stateMainMenu',
				stateful: true
			},{
				region: 'center',
				layout: {
					type: 'border',
					align: 'stretch'
				},
				items: [{
					region: 'north',
					split: false,
					border: false,
					height: 40,
					reference: 'refMainHeader',
					xtype: 'app-mainheader'
				},{
					region: 'center',
					xtype : 'tabpanel',
					layout: 'fit',
					plain: false,
					reference : 'ref-maintab',
					listeners: {
						tabchange: 'onTabChange'
					}
				}]
			}]
		});

		this.callParent();
	},

	beforeRender : function(){
		var me = this;
		me.getController().onLoad();
		me.callParent(arguments);
	}
});
 
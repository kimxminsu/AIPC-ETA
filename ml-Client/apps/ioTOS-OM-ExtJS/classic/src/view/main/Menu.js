Ext.define('IoTosOmExt.view.main.Menu', {
	extend: 'Ext.toolbar.Toolbar',

	alias: 'widget.app-mainmenu',

	requires: [

	],
	enableOverflow: true,
	store: '{menuList}',
	initComponent: function() {
		var me = this;

		Ext.apply(this, {
			style:'background-color:#425365; font-color:#fff; border: none;',
			maxWidth: 130,
			minWidth: 43,
			defaults: {
				xtype: 'button',
				textAlign: 'left',
				handleMouseEvents: false,
				padding:'3 1 3 1',
				scale: 'large',
		        iconAlign: 'left',
		        style:'background-color:#425365; border: none;'
			}
		});
		
		me.callParent();
	}
});
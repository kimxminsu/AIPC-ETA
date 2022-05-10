Ext.define('IoTosOmExt.view.main.Profile', {
	extend: 'Ext.container.Container',

	alias: 'widget.app-mainprofile',

	requires: [

	],
	
	initComponent: function() {
		var me = this;

		Ext.apply(this, {
			width: 250,
			height: 100,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
		
	        items: [{
	        	xtype: 'image',
	        	bind: {
	        		src: '{profileImageUrl}'
	        	},
	        	margin: '10 10 10 10',
	        	flex: 1
	        },{
	        	xtype: 'container',
	        	margin: '5 5 5 5',
	        	flex: 2,	
		        layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items: [{
					xtype: 'container',
		        	bind: {
		        		html: '<p>{profileName}<br>{profileEmail}</p>'
		        	},
					flex: 1
//				},{
//					xtype: 'button',
//					text: 'View Profile',
//					flex: 1
				}]
	        }]
	        
		});
		
		me.callParent();
	}
});
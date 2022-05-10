Ext.define('ESVC.view.mymenu.MyMenu', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-mymenu',
	
	requires: [
		'ESVC.config.Locale'
	],
	
	controller: 'mymenu',
	
	viewModel: {
		type: 'mymenu'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	defaults: {
		padding: 10
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			items: [{
				xtype: 'form',
				items:[{
					layout: {
						type: 'hbox',
						align: 'stretch'
					},					
					items: [{
						padding: '0 5 5 0',	// Top, Right, Bottom, Left
						defaults: {
	                        margin: '0 0 5 0'
	                    },
						items: [
							{
								xtype: 'container',
								reference: 'refMyMenu',
								width : 400, 
								loaded : false
							}
						]
					}]
				}]
			}],
			
			dockedItems: [
				{
					xtype: 'toolbar',
					items: [
						{
							xtype: 'button',
							text: ViewUtil.getLabel('setting'),
							iconCls: 'x-fa fa-pencil',
							listeners: {
								click: 'onChangeMyMenu'
							}
						}
					]
				}
			]
		}); 
		
		this.callParent();
	}
	
});
Ext.define('ESVC.view.mymenu.MyMenuDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-mymenudetail',
	
	requires: [
	    'Ext.layout.container.Table',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	controller: 'mymenu',
	
	viewModel: {
		type: 'mymenu'
	},
	
	width:600,
	height:600,
	scrollable: true,
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refMyMenuGrid',	// Main Grid Name 
	MAIN_STORE_NAME: 'menulist',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			defaults:{
				margin: '0 5 0 5' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					usePagingToolbar : false,
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}'
					},
		    		selModel: {
						type: 'spreadsheet',
						cellSelect: true
					},
					columns: {
						defaults: {
							style: 'text-align: center',
							align :'center',
						},
						items: [
							{ "text": ViewUtil.getLabel('menu'),	"dataIndex": "topMenu", "caption": "menu",	"reference": "refTopMenu",	"filter": "string",	"width": 160},
							{ "text": ViewUtil.getLabel('subMenu'),	"dataIndex": "subMenu", "caption": "subMenu",	"reference": "refSubMenu",	"filter": "string",	"width": 250},
							{ "text": ViewUtil.getLabel('myMenu'),	"dataIndex": "myMenuChecked", "xtype": "checkcolumn", "headerCheckbox": true, "caption": "myMenu",	"reference": "refMyMenu",	"filter": "string",	"width": 100}
						]
					}
				}
			]
		});
		me.callParent();
	}
});

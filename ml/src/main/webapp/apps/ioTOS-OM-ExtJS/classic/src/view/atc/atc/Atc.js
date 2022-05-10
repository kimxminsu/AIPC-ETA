Ext.define('IoTosOmExt.view.atc.atc.Atc', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-atc',
	requires:[
		'IoTosOmExt.view.atc.atc.AtcModel',
		'IoTosOmExt.view.atc.atc.AtcController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
   
	controller: 'atc',

	viewModel: {
		type: 'atc'
	},
	
	listeners: {
		// afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refAtcJobListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'atcJobListStore',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout: { type: 'vbox', align: 'stretch' },
	
	initComponent: function() {
      var me = this;	
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
            flex: 1,
            plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
				],
				bind: {
					// store: '{' + me.MAIN_STORE_NAME + '}'
					store : '{atcJobListDataStore}'
				},
				usePagingToolbar : false,
	    		selModel: {
					type: 'spreadsheet',
					rowSelect: true,
					cellSelect: false
				},
				columns: {
					defaults: {
						style: 'text-align: center',
						align :'center',
					},
					items: GridUtil.getGridColumns('AtcJobListGrid'),
				}
			}],
			
			dockedItems: [{
				xtype : 'container',
				style: {"background-color":"white"}, 
				layout: {
					type: 'hbox',
				},
				
				defaults: {
						margin: '1 1 1 1'
				},
				items:[{
						xtype: 'tbfill'
				},{
					xtype: 'button',
					text : 'AtcJobList1',
					cls: 'search-button',
					iconCls: 'x-fa fa-search',
					listeners: {
						click: 'onSearch'
					}
				},{
					xtype: 'button',
					text : 'AtcJobList2',
					cls: 'search-button',
					iconCls: 'x-fa fa-search',
					listeners: {
						click: 'onSearch'
					}
				},{
					xtype : 'button',
					text : 'AtcStart',
					listeners : {
						click : 'onClickAtcStartStop'
					}
				}]
			}]
		});
		me.callParent();
	}
});
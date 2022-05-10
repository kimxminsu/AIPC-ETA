Ext.define('IoTosOmExt.view.code.servicelane.ServiceLane', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-servicelane',
	requires:[
		'IoTosOmExt.view.code.servicelane.ServiceLaneModel',
		'IoTosOmExt.view.code.servicelane.ServiceLaneController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-servicelanedetail',
	
	controller: 'servicelane',

	viewModel: {
		type: 'servicelane'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refServiceLaneGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'serviceLaneStore',				// Main Store Name
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
					store: '{' + me.MAIN_STORE_NAME + '}'
				},
				listeners: {
					celldblclick: 'onServiceLaneGridDblclick',
					pagingSearch: 'onSearch'
				},
	    		selModel: {
	                type: 'spreadsheet',
	                rowSelect: true,
	                cellSelect:false
				},
				columns: {
					defaults: {
						style: 'text-align: center',
						align :'center',
					},
					items: GridUtil.getGridColumns('ServiceLaneGrid'),
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
					text: ViewUtil.getLabel('search'),
					cls: 'search-button',
					iconCls: 'x-fa fa-search',
					listeners: {
						click: 'onSearch'
					}
				},{
					xtype: 'button',
					text: ViewUtil.getLabel('add'),
					iconCls: 'x-fa fa-plus',
					itemId: "btnAdd",
					listeners: {
						click: 'onGridAdd'
					}
				},{
					xtype: 'button',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					itemId: "btnDelete",
					listeners: {
						click: 'onGridRemove'
					}
				},{
					xtype: 'button',
					text: ViewUtil.getLabel('exportToExcel'),
					itemId: 'exportToExcelButton',
					iconCls: 'excel-button-image',
					cls: 'excel-button',
					listeners: {
						click: { 
							fn: 'onExportExcelPdfWithServer',
							args: [me.MAIN_GRID_REF_NAME, true]
						}
					}
				},{
					xtype: 'button',
					text: ViewUtil.getLabel('columnSetting'),
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
				},{
					xtype: 'button',
					text: ViewUtil.getLabel('searchCondition'),
					cls: 'search-condition-button',
					iconCls: 'x-fa fa-filter',
					ui: 'create-button',
					listeners:{
						click: 'onSearchConditionPopup'
					}
				}]
			},{
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items: [{
					xtype: 'fieldset',
					autoScroll: true,
					collapsible: true,
					flex: 1,
					title: ViewUtil.getLabel('WRD_CTCM_SearchOption'),
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					defaults: {
						margin: '1 1 1 1'
					},
					items: [{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							margin: '1 1 1 1'
						},
						items:[{
							xtype:'combobox',
							reference:'ctlServiceLaneCodeCombo',
							fieldLabel: ViewUtil.getLabel('WRD_CTCM_ServiceLaneCode'),
							bind : {
								store : '{serviceLaneCodeStore}',
								value : '{theSearch.laneCd}'
							},
							listeners:{
								select: 'onServiceLaneCodeChange'
							},
							displayField : 'code',
							valueField : 'code',
							queryMode : 'local'
						}]
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});
Ext.define('IoTosOmExt.view.import.manifestlist.ManifestList', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-manifestlist',
	requires:[
		'IoTosOmExt.view.import.manifestlist.ManifestListModel',
		'IoTosOmExt.view.import.manifestlist.ManifestListController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-manifestlistdetail',
	
	controller: 'manifestlist',

	viewModel: {
		type: 'manifestlist'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBlListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'blListStore',				// Main Store Name
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
				bind: {
					store: '{' + me.MAIN_STORE_NAME + '}'
				},
				listeners: {
					cellclick: 'onBlListGridClick',
					celldblclick: 'onBlListGridDblClick',
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
					items: GridUtil.getGridColumns('ManifestListBlGrid'),
				}
			},{
				xtype: 'tsb-datagrid',
				reference: 'refManifestListGrid',
				title : ViewUtil.getLabel('WRD_CTOM_ContainerList'),
				flex: 1,
				bind: {
					store: '{manifestListStore}'
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
					items: GridUtil.getGridColumns('ManifestListGrid'),
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
					xtype : 'container',
					// flex : 1,
					layout : {
						type : 'vbox',
						// align : 'stretch'
					},
					defaults: {
						labelAlign: 'right',
						margin: '1 1 1 1'
					},
					items : [{
						xtype: 'app-vesselselectioncomponent',
						reference:'ctlVesselSelection',
						parentView : this,
						flex : 1,
						listeners: {
							change: 'onVesselSelectionChange',
						},
						vesselScheduleType: CodeConstantsOM.vesselScheduleType.CALLING_STORAGE,
						vesselDepartureType: CodeConstantsOM.vesselDepartureType.BOTH
					},{
						xtype : 'fieldset',
						title : ViewUtil.getLabel('WRD_CTOM_FilteringOption'),
						collapsible : true,
						layout : {
							type : 'hbox'
						},
						items : [{
							xtype : 'textfield',
							fieldLabel : ViewUtil.getLabel('WRD_CTOM_BlNo'),
							labelAlign : 'right',
							bind : {
								value : '{theSearch.filteringBlNoSoNoText}'
							}
						}]
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});
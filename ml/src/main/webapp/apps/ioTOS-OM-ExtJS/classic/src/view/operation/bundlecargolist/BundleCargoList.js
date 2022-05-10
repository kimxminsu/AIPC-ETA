Ext.define('IoTosOmExt.view.operation.bundlecargolist.BundleCargoList', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-bundlecargolist',
	requires:[
		'IoTosOmExt.view.operation.bundlecargolist.BundleCargoListModel',
		'IoTosOmExt.view.operation.bundlecargolist.BundleCargoListController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
   
   detailViewAlias: 'app-bundlecargolistdetail',

	controller: 'bundlecargolist',

	viewModel: {
		type: 'bundlecargolist'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBundleCargoListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'bundleCargoListStore',			// Main Store Name
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
					celldblclick: 'onBundleCargoListGridDblClick',
					pagingSearch: 'onSearch'
				},
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
					items: GridUtil.getGridColumns('BundleCargoListGrid'),
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
					layout : {
						type : 'vbox',
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
						vesselScheduleType: CodeConstantsOM.vesselScheduleType.ALL,
						vesselDepartureType: CodeConstantsOM.vesselDepartureType.BOTH
					},{
                  xtype : 'container',
                  layout : {
							type : 'hbox',
							align : 'stretch'
						},
                  items :[{
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTOM_FilteringOption'),
                     layout : {
                        type : 'hbox'
                     },
                     items : [{
                        xtype : 'radiogroup',
                        reference : 'ctlDepartureTypeRadioGroup',
                        // columns: ,
                        vertical: false,
                        items : [
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_All'), name: 'departureType', inputValue: CodeConstantsOM.departureType.ALL, checked : true},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_Reserved'), name: 'departureType', inputValue: CodeConstantsOM.departureType.RESERVED,  margin : '0 0 0 10'},
									{boxLabel: ViewUtil.getLabel('WRD_CTOM_InYard'), name: 'departureType', inputValue: CodeConstantsOM.departureType.IN_YARD, width : 60, margin : '0 0 0 10'},
									{boxLabel: ViewUtil.getLabel('WRD_CTOM_Delivered'), name: 'departureType', inputValue: CodeConstantsOM.departureType.DELIVERED,  margin : '0 0 0 10'},
									{boxLabel: ViewUtil.getLabel('WRD_CTOM_Through'), name: 'departureType', inputValue: CodeConstantsOM.departureType.THROUGH,  margin : '0 0 0 10'}
								],
								bind : {
									value : '{theSearch.departureType}'
								},
                     },{
								xtype : 'datefield',
								fieldLabel : ViewUtil.getLabel('WRD_CTOM_From'),
								labelWidth : 'auto',
								format : 'Y-m-d',
								bind : {
									value : '{theSearch.searchPeriodFrom}'
								},
								margin : '0 0 0 30'
                     },{
								xtype : 'datefield',
								fieldLabel : ViewUtil.getLabel('WRD_CTOM_To'),
								labelWidth : 'auto',
								margin : '0 0 0 10',
								format : 'Y-m-d',
								bind : {
									value : '{theSearch.searchPeriodTo}'
								}
							}]
						}]
               }]
				}]
			}]
		});
		me.callParent();
	}
});
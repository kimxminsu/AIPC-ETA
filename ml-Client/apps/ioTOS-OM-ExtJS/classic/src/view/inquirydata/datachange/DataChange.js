Ext.define('IoTosOmExt.view.inquirydata.datachange.DataChange', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-datachange',
	requires:[
		'IoTosOmExt.view.inquirydata.datachange.DataChangeModel',
		'IoTosOmExt.view.inquirydata.datachange.DataChangeController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
   
   detailViewAlias: 'app-datachangedetail',

	controller: 'datachange',

	viewModel: {
		type: 'datachange'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDataChangeGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'dataChangeStore',			// Main Store Name
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
					celldblclick: 'onDataChangeGridDblClick',
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
					items: GridUtil.getGridColumns('DataChangeGrid'),
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
                        reference : 'ctlTableNameRadioGroup',
                        columns: 1,
                        vertical: true,
                        items : [
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_All'), name: 'tableName', inputValue: CodeConstantsOM.commonCode.ALL, checked : true},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_Reserved'), name: 'tableName', inputValue: CodeConstantsOM.tableName.RESERVE_TABLE_NAME},
									{boxLabel: ViewUtil.getLabel('WRD_CTOM_InYard'), name: 'tableName', inputValue: CodeConstantsOM.tableName.INVENTORY_TABLE_NAME},
									{boxLabel: ViewUtil.getLabel('WRD_CTOM_Delivered'), name: 'tableName', inputValue: CodeConstantsOM.tableName.MASTER_TABLE_NAME}
								],
								bind : {
									value : '{theSearch.tableName}'
								},
                     },{
								xtype : 'container',
								layout : {
									type : 'vbox'
								},
								defaults : {
									labelWidth : 100,
									labelAlign : 'right',
								},
								items : [{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
									bind : {
										value : '{theSearch.cntrNoBindingText}'
									}
								},{
									xtype : 'commoncodefield',
									fieldLabel : ViewUtil.getLabel('WRD_CTOM_Class'),
									bind : {
										value : '{theSearch.classBindingText}',
									},
									params : {
										popupType : ViewUtil.POPUPTYPE_MULTI,
										title : ViewUtil.getLabel('WRD_CTOM_CodeValues'),
										itemKey : PopupServiceConstants.MasterCode.CLASS
									},
									width : 306,
								}]
							}]
						}]
               }]
				}]
			}]
		});
		me.callParent();
	}
});
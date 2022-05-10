Ext.define('IoTosOmExt.view.import.stowagebayplanlist.StowageBayPlanList', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-stowagebayplanlist',
	requires:[
		'IoTosOmExt.view.import.stowagebayplanlist.StowageBayPlanListModel',
		'IoTosOmExt.view.import.stowagebayplanlist.StowageBayPlanListController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-stowagebayplanlistdetail',
	
	controller: 'stowagebayplanlist',

	viewModel: {
		type: 'stowagebayplanlist'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refStowageBayPlanListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'stowageBayPlanListStore',				// Main Store Name
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
					celldblclick: 'onStowageBayPlanListGridDblClick',
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
					items: GridUtil.getGridColumns('StowageBayPlanListGrid'),
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
						vesselScheduleType: CodeConstantsOM.vesselScheduleType.CALLING_STORAGE,
						vesselDepartureType: CodeConstantsOM.vesselDepartureType.BOTH
					},{
                  xtype : 'container',
                  layout : 'hbox',
                  items :[{
                     xtype : 'fieldset',
                     title : ViewUtil.getLabel('WRD_CTOM_CheckOption'),
                     // flex : 0.3,
                     layout : {
                        type : 'hbox'
                     },
                     items : [{
                        xtype : 'radiogroup',
                        reference : 'ctlCheckOptionRadioGroup',
                        columns: 1,
                        vertical: true,
                        items : [
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_Inventory'), name: 'checkOption', inputValue: CodeConstantsOM.commonCode.INVENTORY},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_DGPreInformation'), name: 'checkOption', inputValue: CodeConstantsOM.commonCode.DG_INFORMATION},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_ExportReserved'), name: 'checkOption', inputValue: CodeConstantsOM.commonCode.EXPORT_RESERVED}
								],
								bind : {
									value : '{theSearch.checkOption}'
								},
                     },{
								xtype : 'container',
								layout : {
									type : 'vbox'
								},
								margin : '0 0 0 20',
								items : [{
									xtype : 'commoncodefield',
									reference : 'ctlModeField',
									fieldLabel : ViewUtil.getLabel('WRD_CTOM_Mode'),
									labelWidth : 60,
									labelAlign : 'right',
									width : 180,
									bind : {
										disabled : '{setDisabledMode}',
										value : '{theDetail.mode}'
									},
									params: {
										popupType : ViewUtil.POPUPTYPE_MULTI,
										title : ViewUtil.getLabel('WRD_CTOM_CodeValues'),
										itemKey : PopupServiceConstants.MasterCode.IX_CD
									},
								},{
									xtype : 'container',
									layout : {
										type : 'hbox',
									},
									margin : '10 0 0 30',
									items : [{
										xtype : 'checkboxfield',
										reference : 'ctlOprCheckBox',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
										bind : {
											disabled : '{setDisabledOprFeCheck}'
										}
									},{
										xtype : 'checkboxfield',
										reference : 'ctlFeCheckBox',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_FE'),
										margin : '0 0 0 10',
										bind : {
											disabled : '{setDisabledOprFeCheck}'
										}
									}]
								}]
							},{
								xtype : 'button',
                        text : ViewUtil.getLabel('WRD_CTOM_Check'),
								iconCls : 'x-fa fa-check',
								margin : '0 0 0 20',
								listeners : {
									click : 'onCheck'
								}
							},{
								xtype : 'checkboxfield',
								reference : 'ctlNoMessageCheckBox',
								boxLabel : ViewUtil.getLabel('WRD_CTOM_NoMessage'),
								margin : '0 0 0 10',
								bind : {
									disabled : '{setDisabledNoMessageCheck}'
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
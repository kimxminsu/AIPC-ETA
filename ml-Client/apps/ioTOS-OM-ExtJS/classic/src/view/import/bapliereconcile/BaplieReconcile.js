Ext.define('IoTosOmExt.view.import.bapliereconcile.BaplieReconcile', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-bapliereconcile',
	requires:[
		'IoTosOmExt.view.import.bapliereconcile.BaplieReconcileModel',
		'IoTosOmExt.view.import.bapliereconcile.BaplieReconcileController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-bapliereconciledetail',
	
	controller: 'bapliereconcile',

	viewModel: {
		type: 'bapliereconcile'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	// MAIN_GRID_REF_NAME: 'refErrorCodeGrid',		// Main Grid Name 
	// MAIN_STORE_NAME: 'errorCode',				// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout: { type: 'vbox', align: 'stretch' },
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [{
				//Vessel Schedule 있는 부분
				xtype: 'container',
				style: {"background-color":"white"}, 
				layout : {
					type : 'vbox',
					// align : 'stretch'
				},
				flex : 0.6,
				items : [{
					xtype : 'app-vesselselectioncomponent',
					reference : 'ctlVesselSelection',
					parentView : this,
					vesselScheduleType: CodeConstantsOM.vesselScheduleType.CALLING,
					vesselDepartureType: CodeConstantsOM.vesselDepartureType.BOTH
				},{
					xtype : 'container',
					layout : {
						type : 'hbox',
						align : 'stretch'
					},
					flex : 1,
					items : [{
						xtype : 'container',
						layout : {
							type : 'vbox',
							align : 'stretch'
						},
						items : [{
							//Compare Mode
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTOM_CompareMode'),
							items : [{
								xtype: 'radiogroup',
								reference : 'ctlCompareMode',
								columns: 1,
								vertical: true,
								items: [
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_All'), name: 'compareMode', inputValue: CommonConstants.ALL, checked : true},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_AdditionalBaplieBaplie'), name: 'compareMode', inputValue: CodeConstantsOM.compareMode.ADDBAPLIE_BAPLIE},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_OnlyAdditionalBaplie'), name: 'compareMode', inputValue: CodeConstantsOM.compareMode.ONLY_ADDBAPLIE},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_OnlyBaplie'), name: 'compareMode', inputValue: CodeConstantsOM.compareMode.ONLY_BAPLIE},
								],
								bind : {
									value : '{theSearch.compareMode}'
								},
								listeners : {
									change : 'onChangeCompareMode'
								}
							},{
                        xtype : 'checkboxfield',
								boxLabel : ViewUtil.getLabel('WRD_CTOM_IncludeThruContainer'),
								bind : '{theSearch.isIncludingThru}'
								
                     }]
						},{
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTOM_RowShowHide'),
							layout : 'vbox',
							flex : 1,
							items : [{
								xtype: 'radiogroup',
								reference : 'ctlRowShowHide',
								columns: 1,
								vertical: true,
								items: [
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_All'), name: 'rowShowHide', inputValue: CommonConstants.ALL, checked : true},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_Matched'), name: 'rowShowHide', inputValue: CodeConstantsOM.commonCode.MATCHED},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_Unmatched'), name: 'rowShowHide', inputValue: CodeConstantsOM.commonCode.UNMATCHED},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_WeightTolerance'), name: 'rowShowHide', inputValue: CodeConstantsOM.commonCode.WEIGHT_TOLERANCE},
								],
								listeners : {
									change : 'onChangeRowShowHide'
								}
							}]
						},{
							xtype : 'container',
							layout : 'hbox',
							items : [{
								xtype : 'button',
								text : ViewUtil.getLabel('WRD_CTOM_CreateBaplie'),
								flex : 1,
								listeners : {
									click : 'onCreateBaplie'
								},
								bind : {
									disabled : '{setDisabledCreateBaplie}'
								}
							}]
						}]
					},{
						//Direct Fill Function
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTOM_DirectFillFunction'),
							layout : {
								type : 'vbox',
								align : 'stretch'
							},
							margin : '0 0 0 5',
							items : [{
								xtype : 'tsb-datagrid',
								reference : 'refDirectFillMultiSelectGrid',
								usePagingToolbar : false,
								bind : {
									store : '{columnsStore}'
								},
								selModel: {
									selType: 'checkboxmodel'
							  	},
								columns : {
									defaults: {
										style: 'text-align: center',
										align :'center',
									},
									items : GridUtil.getGridColumns('MultiselectGrid')
								},
								flex : 1,
								width : 270
							},{
								xtype : 'container',
								layout : {
									type : 'hbox'
								},
								margin : '10 0 0 0',
								items : [{
									xtype: 'radiogroup',
									reference : 'ctlDirectFillDirectionRadioGroup',
									columns: 1,
									vertical: true,
									items: [
										{ boxLabel: ViewUtil.getLabel('WRD_CTOM_AdditionalToBaplie'), name: 'direction', inputValue: '1', checked : true},
										{ boxLabel: ViewUtil.getLabel('WRD_CTOM_BaplieToAdditional'), name: 'direction', inputValue: '2'},
									]
								},{
									xtype : 'component',
									flex : 1
								},{
									xtype : 'button',
									text : ViewUtil.getLabel('WRD_CTOM_DirectFill'),
									listeners : {
										click : 'onDirectFill'
									},
									bind : {
										disabled : '{setDisabledDirectFill}'
									}
								}]
							}]
						},{
							//Compare Items
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTOM_CompareItems'),
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							margin : '0 0 0 5',
							items : [{
								xtype : 'container',
								layout : {
									type : 'vbox',
									align : 'stretch'
								},
								items : [{
									xtype : 'tsb-datagrid',
									reference : 'refCompareItemsMultiselectGrid',
									usePagingToolbar : false,
									bind : {
										store : '{columnsStore}'
									},
									selModel: {
										selType: 'checkboxmodel',
									},
									listeners : {
										select : 'selectCompareCheckBox',
										deselect : 'deselectCompareCheckBox',
									},
									columns : {
										defaults: {
											style: 'text-align: center',
											align :'center',
										},
										items : GridUtil.getGridColumns('MultiselectGrid')
									},
									flex : 1,
									width : 270
								},{
									xtype : 'container',
									layout : {
										type: 'hbox'
									},
									margin : '10 0 0 0',
									items : [{
										xtype : 'checkboxfield',
										reference : 'ctlAutoApplyCheckBox',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_AutoApply'),
										checked : true
									},{
										xtype : 'component',
										flex : 1
									},{
										xtype : 'button',
										text : ViewUtil.getLabel('WRD_CTOM_Apply'),
										listeners : {
											click : 'compareItemsApplyCheck'
										}
									}]
								}]
							},{
								xtype : 'tsb-datagrid',
								usePagingToolbar : false,
								margin : '0 0 0 5',
								bind : {
									store : '{compareItemsStore}'
								},
								columns : {
									defaults: {
										style: 'text-align: center',
										align :'center',
									},
									items : GridUtil.getGridColumns('CompareItemsGrid'),
								},
								width : 270
							}]
						}
					]
				}]
			},{
				xtype : 'container',
				height : 10,
				style: {"background-color":"white"}, 
			},{
				xtype : 'container',
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				flex : 0.4,
				items : [{
					xtype: 'tsb-datagrid',
					reference: 'refStatusGrid',
					title : ViewUtil.getLabel('WRD_CTOM_Status'),
					usePagingToolbar : false,
					enableLocking : false,
					scrollable : true,
					flex: 0.1,
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{statusStore}'
					},
					listeners: {
						pagingSearch: 'onSearch',
						cellclick : 'onBaplieReconcileGridClick'
					},
					 selModel: {
                  selType : 'rowmodel',
                  mode : 'SINGLE'
					},
					columns: {
						defaults: {
							style: 'text-align: center',
							align :'center',
						},
						items: GridUtil.getGridColumns('BaplieReconcileStatusGrid'),
					}
				},{
					xtype: 'tsb-datagrid',
					reference : 'refAddtionalBaplieGrid',
					title : ViewUtil.getLabel('WRD_CTOM_AdditionalBaplieNEW'),
					usePagingToolbar : false,
					enableLocking : false,
					scrollable : true,
					flex: 0.45,
					margin : '0 0 0 5',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{additionalBaplieStore}'
					},
					listeners: {
						celldblclick: 'onDblClick',
						pagingSearch: 'onSearch',
						cellclick : 'onBaplieReconcileGridClick'
					},
					 selModel: {
                  selType : 'rowmodel',
                  mode : 'SINGLE'
					},
					columns: {
						defaults: {
							style: 'text-align: center',
							align :'center',
						},
						items: GridUtil.getGridColumns('BaplieReconcileBaplieGrid'),
					},
					viewConfig: { 
						getRowClass: function(record, rowIndex, rowParams, store){ 
							return 'grid-checkboxrow-class';
						} 
					},

				},{
					xtype: 'tsb-datagrid',
					reference : 'refOldBaplieGrid',
					title : ViewUtil.getLabel('WRD_CTOM_BaplieDischargingThruList'),
					usePagingToolbar : false,
					enableLocking : false,
					scrollable : true,
					flex: 0.45,
					margin : '0 0 0 5',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{oldBaplieStore}'
					},
					listeners: {
						celldblclick: 'onDblClick',
						pagingSearch: 'onSearch',
						cellclick : 'onBaplieReconcileGridClick'
					},
					 selModel: {
							selType : 'rowmodel',
							mode : 'SINGLE'
					},
					columns: {
						defaults: {
							style: 'text-align: center',
							align :'center',
						},
						items: GridUtil.getGridColumns('BaplieReconcileBaplieGrid'),
					},
					viewConfig: {
						getRowClass: function(record, rowIndex, rowParams, store){
							return 'grid-checkboxrow-class';
						} 
					},
				}]
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
					},
					hidden : true
				},{
					xtype: 'button',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					itemId: "btnDelete",
					listeners: {
						click: 'onGridRemove'
					},
					hidden : true
				},{
					xtype: 'button',
					text: ViewUtil.getLabel('save'),
					iconCls: 'x-fa fa-save',
					itemId: "btnDetailSave",
					cls: 'save-button',
					listeners: {
						click: 'onGridSave'
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
			}]
		});

		me.callParent();
	}
});
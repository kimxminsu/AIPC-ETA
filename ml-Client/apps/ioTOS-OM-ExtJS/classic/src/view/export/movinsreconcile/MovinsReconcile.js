Ext.define('IoTosOmExt.view.export.movinsreconcile.MovinsReconcile', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-movinsreconcile',
	requires:[
		'IoTosOmExt.view.export.movinsreconcile.MovinsReconcileModel',
		'IoTosOmExt.view.export.movinsreconcile.MovinsReconcileController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-movinsreconciledetail',
	
	controller: 'movinsreconcile',

	viewModel: {
		type: 'movinsreconcile'
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
					vesselScheduleType : CodeConstantsOM.vesselScheduleType.CALLING_STORAGE,
					vesselDepartureType: CodeConstantsOM.vesselDepartureType.BOTH,
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
						// flex : 1,
						items : [{
							//Compare Mode
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTOM_CompareMode'),
							// flex : 1,
							items : [{
								xtype: 'radiogroup',
								reference : 'ctlCompareMode',
								columns: 1,
								vertical: true,
								items: [
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_All'), name: 'compareMode', inputValue: CommonConstants.ALL, checked : true},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_AdditionalMovinsAndMovins'), name: 'compareMode', inputValue: CodeConstantsOM.commonCode.ADDMOVINS_MOVINS},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_OnlyAddtionalMovins'), name: 'compareMode', inputValue: CodeConstantsOM.commonCode.ONLY_ADDMOVINS },
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_OnlyMovins'), name: 'compareMode', inputValue: CodeConstantsOM.commonCode.ONLY_MOVINS},
								],
								bind : {
									value : '{theSearch.compareMode}'
								},
								listeners : {
									change : 'onChangeCompareMode'
								}
							}]
						},{
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTOM_RowShowHide'),
							layout : 'vbox',
							flex : 1,
							items : [{
								xtype: 'radiogroup',
								reference : 'ctlRowShowHide',
								// flex : 1,
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
								text : ViewUtil.getLabel('WRD_CTOM_CreateMovins'),
								flex : 1,
								listeners : {
									click : 'onCreateMovins'
								},
								bind : {
									disabled : '{setDisabledCreateMovins}'
								}
							},{
								xtype : 'button',
								text : ViewUtil.getLabel('WRD_CTOM_ExchangeMovins'),
								flex : 1,
								listeners : {
									click : 'onExchangeMovins'
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
							// flex : 1,
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
										{ boxLabel: ViewUtil.getLabel('WRD_CTOM_AdditionalToMovins'), name: 'direction', inputValue: '1', checked : true},
										{ boxLabel: ViewUtil.getLabel('WRD_CTOM_MovinsToAdditional'), name: 'direction', inputValue: '2'},
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
							// flex : 1,
							items : [{
								xtype : 'container',
								layout : {
									type : 'vbox',
									align : 'stretch'
								},
								// flex : 1,
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
								// flex : 1,
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
						cellclick : 'onMovinsReconcileGridClick'
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
						items: GridUtil.getGridColumns('MovinsReconcileStatusGrid'),
					}
				},{
					xtype: 'tsb-datagrid',
					reference : 'refAddtionalMovinsGrid',
					title : ViewUtil.getLabel('WRD_CTOM_AdditionalMovinsNEW'),
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
						store: '{additionalMovinsStore}'
					},
					listeners: {
						celldblclick: 'onDblClick',
						pagingSearch: 'onSearch',
						cellclick : 'onMovinsReconcileGridClick'
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
						items: GridUtil.getGridColumns('MovinsReconcileMovinsListGrid'),
					},
					viewConfig: { 
						getRowClass: function(record, rowIndex, rowParams, store){ 
							return 'grid-checkboxrow-class';
						} 
					},

				},{
					xtype: 'tsb-datagrid',
					reference : 'refOldMovinsGrid',
					title : ViewUtil.getLabel('WRD_CTOM_MovinsOLD'),
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
						store: '{oldMovinsStore}'
					},
					listeners: {
						celldblclick: 'onDblClick',
						pagingSearch: 'onSearch',
						cellclick : 'onMovinsReconcileGridClick'
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
						items: GridUtil.getGridColumns('MovinsReconcileMovinsListGrid'),
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
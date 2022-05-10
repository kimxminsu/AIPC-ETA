Ext.define('IoTosOmExt.view.export.coprarloadinglistreconcile.CoprarLoadingListReconcile', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-coprarloadinglistreconcile',
	requires:[
		'IoTosOmExt.view.export.coprarloadinglistreconcile.CoprarLoadingListReconcileModel',
		'IoTosOmExt.view.export.coprarloadinglistreconcile.CoprarLoadingListReconcileController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-coprarloadinglistreconciledetail',
	
	controller: 'coprarloadinglistreconcile',

	viewModel: {
		type: 'coprarloadinglistreconcile'
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
					url : iWeb.URL + iUrl.OM_VSLSCH_VSL_CD,
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
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_COPRARLoadingList'), name: 'compareMode', inputValue: CodeConstantsOM.compareMode.COPRAR_LOADINGLIST},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_OnlyCOPRAR'), name: 'compareMode', inputValue: CodeConstantsOM.compareMode.ONLY_COPRAR },
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_OnlyLoadingList'), name: 'compareMode', inputValue: CodeConstantsOM.compareMode.ONLY_LOADINGLIST},
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
								columns: 2,
								vertical: true,
								items: [
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_All'), name: 'rowShowHide', inputValue: CommonConstants.ALL, checked : true},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_Matched'), name: 'rowShowHide', inputValue: CodeConstantsOM.commonCode.MATCHED},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_Unmatched'), name: 'rowShowHide', inputValue: CodeConstantsOM.commonCode.UNMATCHED},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_WeightTolerance'), name: 'rowShowHide', inputValue: CodeConstantsOM.commonCode.WEIGHT_TOLERANCE},

									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_Verified'), name: 'rowShowHide', inputValue: CodeConstantsOM.commonCode.VERIFIED},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_Unverified'), name: 'rowShowHide', inputValue: CodeConstantsOM.commonCode.UNVERIFIED},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_WGTvsVGM'), name: 'rowShowHide', inputValue: CodeConstantsOM.commonCode.WGT_VGM},
								],
								listeners : {
									change : 'onChangeRowShowHide'
								}
							}]
						}]
					},{
						xtype : 'container',
						layout : {
							type : 'vbox',
							align : 'stretch'
						},
						margin : '0 0 0 5',
						items : [{
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTOM_RetrieveFromOthers'),
							layout : {
								type : 'vbox'
							},
							flex : 1,
							items : [{
								xtype : 'radiogroup',
								reference : 'ctlRetrieveRadioGroup',
								// flex : 1,
								columns: 1,
								vertical: true,
								items: [
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_Export'), name: 'retrieve', inputValue: CodeConstantsOM.retrieveFromOthers.EXPORT, checked : true},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_Import'), name: 'retrieve', inputValue: CodeConstantsOM.retrieveFromOthers.IMPORT},
									{ boxLabel: ViewUtil.getLabel('WRD_CTOM_Storage'), name: 'retrieve', inputValue: CodeConstantsOM.retrieveFromOthers.STORAGE},
								],
								bind : {
									disabled : '{setDisabledRetrieveFromOthers}'
								},
							},{
								xtype : 'container',
								layout : {
									type : 'vbox'
								},
								items : [{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									items : [{
										xtype : 'checkbox',
										reference : 'ctlRetrieveFe',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_FE'),
										bind : {
											disabled : '{setDisabledRetrieveFromOthers}'
										},
									},{
										xtype : 'checkbox',
										reference : 'ctlRetrieveOpr',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
										margin : '0 0 0 10',
										bind : {
											disabled : '{setDisabledRetrieveFromOthers}'
										},
									}]
								},{
									xtype : 'container',
									layout : {
										type : 'hbox'
									},
									margin : '10 0 0 0',
									items : [{
										xtype : 'button',
										text : ViewUtil.getLabel('WRD_CTOM_Retrieve'),
										listeners : {
											click : 'onRetrieve'
										},
										bind : {
											disabled : '{setDisabledRetrieveFromOthers}'
										},
									},{
										xtype : 'button',
										text : ViewUtil.getLabel('WRD_CTOM_Apply'),
										listeners : {
											click : 'onApply'
										},
										bind : {
											disabled : '{setDisabledRetrieveFromOthers}'
										},
									}]
								}]
							}]
						},{
							xtype : 'container',
							layout : {
								type : 'vbox',
								align : 'stretch'
							},
							items : [{
								xtype : 'container',
								layout : {
									type : 'hbox'
								},
								items : [{
									xtype : 'button',
									text : ViewUtil.getLabel('WRD_CTOM_ReconcileUpdateStatus'),
									flex : 1,
									listeners : {
										click : 'onReconcileUpdateStatus'
									},
									bind : {
										disabled : '{setDisabledReconcileUpdateStatus}'
									}
								}]
							},{
								xtype : 'container',
								layout : {
									type : 'hbox'
								},
								items : [{
									xtype : 'button',
									text : ViewUtil.getLabel('WRD_CTOM_Verify'),
									flex : 1,
									listeners : {
										click : 'onVerify'
									},
									bind : {
										disabled : '{setDisabledVerify}'
									}
								},{
									xtype : 'button',
									text : ViewUtil.getLabel('WRD_CTOM_Unverify'),
									flex : 1,
									listeners : {
										click : 'onUnVerify'
									},
									bind : {
										disabled : '{setDisabledUnVerify}'
									}
								}]
							},{
								xtype : 'container',
								layout : {
									type : 'hbox'
								},
								items : [{
									xtype : 'button',
									text : ViewUtil.getLabel('WRD_CTOM_Cancel'),
									flex : 1,
									listeners : {
										click : 'onCancel'
									},
									bind : {
										disabled : '{setDisabledCancelReturn}'
									}
								},{
									xtype : 'button',
									text : ViewUtil.getLabel('WRD_CTOM_Return'),
									flex : 1,
									listeners : {
										click : 'onReturn'
									},
									bind : {
										disabled : '{setDisabledCancelReturn}'
									}
								}]
							},{
								xtype : 'container',
								layout : {
									type : 'hbox'
								},
								items : [{
									xtype : 'button',
									text : ViewUtil.getLabel('WRD_CTOM_CreateLoadingList'),
									flex : 1,
									listeners : {
										click : 'onCreateLoadingList'
									},
									bind : {
										disabled : '{setDisabledCreateLoadingList}'
									}
								},{
									xtype : 'button',
									text : ViewUtil.getLabel('WRD_CTOM_CreateCoprar'),
									flex : 1,
									listeners : {
										click : 'onCreateCoprar'
									},
									bind : {
										disabled : '{setDisabledCreateCoprar}'
									}
								}]
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
										{ boxLabel: ViewUtil.getLabel('WRD_CTOM_CoprarToLoadingList'), name: 'direction', inputValue: '1', checked : true},
										{ boxLabel: ViewUtil.getLabel('WRD_CTOM_LoadingListToCoprar'), name: 'direction', inputValue: '2'},
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
					flex: 0.2,
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
						cellclick : 'onCoprarLoadingListReconcileGridClick'
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
						items: GridUtil.getGridColumns('CoprarLoadingListReconcileStatusGrid'),
					}
				},{
					xtype: 'tsb-datagrid',
					reference : 'refCoprarGrid',
					title : ViewUtil.getLabel('WRD_CTOM_COPRAR'),
					usePagingToolbar : false,
					enableLocking : false,
					scrollable : true,
					flex: 0.4,
					margin : '0 0 0 5',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{coprarStore}'
					},
					listeners: {
						celldblclick: 'onDblClick',
						pagingSearch: 'onSearch',
						cellclick : 'onCoprarLoadingListReconcileGridClick'
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
						items: GridUtil.getGridColumns('CoprarLoadingListReconcileCoprarGrid'),
					},
					viewConfig: { 
						getRowClass: function(record, rowIndex, rowParams, store){ 
							return 'grid-checkboxrow-class';
						} 
					},
				},{
					xtype: 'tsb-datagrid',
					reference : 'refLoadingListGrid',
					title : ViewUtil.getLabel('WRD_CTOM_LoadingList'),
					usePagingToolbar : false,
					enableLocking : false,
					scrollable : true,
					flex: 0.4,
					margin : '0 0 0 5',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{loadingListStore}'
					},
					listeners: {
						celldblclick: 'onDblClick',
						pagingSearch: 'onSearch',
						cellclick : 'onCoprarLoadingListReconcileGridClick'
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
						items: GridUtil.getGridColumns('CoprarLoadingListReconcileLoadingListGrid'),
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
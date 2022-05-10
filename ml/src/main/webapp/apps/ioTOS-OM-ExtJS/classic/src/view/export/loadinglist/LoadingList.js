Ext.define('IoTosOmExt.view.export.loadinglist.LoadingList', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-loadinglist',
	requires:[
		'IoTosOmExt.view.export.loadinglist.LoadingListModel',
		'IoTosOmExt.view.export.loadinglist.LoadingListController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-loadinglistdetail',
	
	controller: 'loadinglist',

	viewModel: {
		type: 'loadinglist'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refLoadingListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'loadingListStore',				// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout: { type: 'vbox', align: 'stretch' },
	
	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit : 2,
			pluginId : 'loadingListAndCancelGridEditor',
			listeners : {
				cancelEdit : 'onCancelEdit',
				edit : 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [{
            xtype : 'tabpanel',
            reference : 'ctlLoadingListTabPanel',
				flex : 1,
				listeners : {
					tabchange : 'onTabChange'
				},
            items : [{
               title : ViewUtil.getLabel('WRD_CTOM_LoadingListCancel'),
               reference : 'ctlLoadingListAndCancelPanel',
					layout : {
						type : 'vbox',
						align : 'stretch'
					},
               items : [{
                  xtype : 'tsb-datagrid',
						reference : 'refLoadingListAndCancelGrid',
                  bind : {
                     store : '{loadingListAndCancelStore}'
						},
						plugins : [
							rowEditing
						],
						flex : 1,
                  selMode : {
                     type: 'spreadsheet',
                     rowSelect: true,
                     cellSelect:false
						},
                  columns : {
							defaults: {
								style: 'text-align: center',
								align :'center',
							},
                     items : GridUtil.getGridColumns('LoadingListAndCancelGrid')
                  }
               }]
            },{
               title : ViewUtil.getLabel('WRD_CTOM_Reservation'),
					reference : 'ctlReservationsPanel',
					layout : {
						type : 'vbox',
						align : 'stretch'
					},
               items : [{
                  xtype : 'tsb-datagrid',
                  reference : 'refReservationGrid',
                  bind : {
                     store : '{reservationStore}'
                  },
						flex : 1,
						listeners: {
							celldblclick: 'onReservationGridDblClick',
							pagingSearch: 'onSearch'
						},
                  selMode : {
                     mode : 'MULTI'
						},
                  columns : {
							defaults: {
								style: 'text-align: center',
								align :'center',
							},
                     items : GridUtil.getGridColumns('ReservationGrid')
                  }
               }]
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
					reference : 'ctlAddButton',
					text: ViewUtil.getLabel('add'),
					iconCls: 'x-fa fa-plus',
					itemId: "btnAdd",
					listeners: {
						click: 'onGridAdd'
					},
					disabled : true
				},{
					xtype: 'button',
					reference : 'ctlRemoveButton',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					itemId: "btnDelete",
					listeners: {
						click: 'onGridRemove'
					},
					disabled : true
				},{
					xtype: 'button',
					reference : "ctlSaveButton",
					text: ViewUtil.getLabel('save'),
					iconCls: 'x-fa fa-save',
					itemId : "btnSave",
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
						vesselScheduleType: CodeConstantsOM.vesselScheduleType.CALLING_STORAGE,
						vesselDepartureType: CodeConstantsOM.vesselDepartureType.BOTH
					},{
                  xtype : 'container',
                  layout : 'hbox',
                  items :[{
                     xtype : 'fieldset',
                     title : ViewUtil.getLabel('WRD_CTOM_FilteringOption'),
                     // flex : 0.3,
                     layout : {
                        type : 'hbox'
                     },
                     items : [{
                        xtype : 'radiogroup',
                        reference : 'ctlFilteringOptionRadioGroup',
                        columns: 4,
                        vertical: false,
                        items : [
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_All'), name: 'confirmStatus', inputValue: CommonConstants.ALL, checked : true},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_Verified'), name: 'confirmStatus', inputValue: CodeConstantsOM.commonCode.VERIFIED, margin : '0 0 0 10'},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_ReturnCancel'), name: 'confirmStatus', inputValue: CodeConstantsOM.commonCode.RETURN_CANCEL, margin : '0 0 0 10'},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_Unverified'), name: 'confirmStatus', inputValue: CodeConstantsOM.commonCode.UNVERIFIED, margin : '0 0 0 10'}
								],
								listeners : {
									change : 'onChangeFilteringOption'
								}
                     }]
                  },{
                     xtype : 'fieldset',
                     title : ViewUtil.getLabel('WRD_CTOM_DGPreInformation'),
                     layout : {
                        type : 'hbox'
                     },
                     margin : '0 0 0 5',
                     items : [{
                        xtype : 'button',
                        text : ViewUtil.getLabel('WRD_CTOM_Check'),
                        iconCls : 'x-fa fa-check',
                        listeners : {
                           click : 'onDgPreInformationBtnClick'
                        }
                     },{
                        xtype : 'checkboxfield',
                        reference : 'ctlNoMessageCheckBox',
                        boxLabel : ViewUtil.getLabel('WRD_CTOM_NoMessage'),
                        margin : '0 0 0 10'
                     }]
                  }]
               }]
				}]
			}]
		});
		me.callParent();
	}
});
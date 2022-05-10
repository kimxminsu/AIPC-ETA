Ext.define('IoTosOmExt.view.export.bookinglist.BookingList', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-bookinglist',
	requires:[
		'IoTosOmExt.view.export.bookinglist.BookingListModel',
		'IoTosOmExt.view.export.bookinglist.BookingListController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-bookinglistdetail',
	
	controller: 'bookinglist',

	viewModel: {
		type: 'bookinglist'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBookingListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'bookingListStore',				// Main Store Name
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
					cellclick: 'onBookingListGridClick',
					celldblclick: 'onBookingListGridDblClick',
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
					items: GridUtil.getGridColumns('BookingListGrid'),
				}
			},{
            xtype : 'tabpanel',
            reference : 'ctlCntrDetailList',
            flex : 1,
				hidden : true,
            items : [{
					title : ViewUtil.getLabel('WRD_CTOM_ReleasedContainerList'),
					layout : {
						type : 'vbox',
						align : 'stretch'
					},
               items : [{
                  xtype : 'tsb-datagrid',
                  reference : 'refCntrDetailGrid',
                  bind : {
                     store : '{bookingListDetailStore}'
                  },
                  flex : 1,
                  selMode : {
                     mode : 'MULTI'
                  },
                  columns : {
                     items : GridUtil.getGridColumns('ReleasedCntrListGrid')
                  }
               }]
            },{
					title : ViewUtil.getLabel('WRD_CTOM_GateInContainerList'),
					layout : {
						type : 'vbox',
						align : 'stretch'
					},
               items : [{
                  xtype : 'tsb-datagrid',
                  reference : 'refCntrGateInDetailGrid',
                  bind : {
                     store : '{bookingListGateInDetailStore}'
                  },
                  flex : 1,
                  selMode : {
                     mode : 'MULTI'
                  },
                  columns : {
                     items : GridUtil.getGridColumns('GateInCntrListGrid')
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
						vesselScheduleType: CodeConstantsOM.vesselScheduleType.CALLING_STORAGE,
						vesselDepartureType: CodeConstantsOM.vesselDepartureType.BOTH
					},{
						xtype : 'fieldset',
						title : ViewUtil.getLabel('WRD_CTOM_FilteringOption'),
						// flex : 0.3,
						collapsible : true,
						layout : {
							type : 'hbox'
						},
						items : [{
							xtype : 'textfield',
							fieldLabel : ViewUtil.getLabel('WRD_CTCM_BookingNo'),
							labelAlign : 'right',
							// width : 500,
							bind : {
								value : '{theSearch.bookingNos}'
							}
						},{
							xtype : 'commoncodefield',
							reference : 'ctlOperatorField',
							params : {
								title : ViewUtil.getLabel('WRD_CTOM_CodeValues'),
								args : [PopupServiceConstants.PartnerType.LINE_OPERATOR],
								itemKey : PopupServiceConstants.PartnerType.LINE_OPERATOR,
							},
							bind : {
								value : '{theSearch.ptnrCodes}'
							},
							fieldLabel : ViewUtil.getLabel('WRD_CTCM_Operator'),
							labelWidth : 80,
						},{
							xtype : 'checkboxfield',
							boxLabel : ViewUtil.getLabel('WRD_CTOM_NotDepartedOnly'),
							margin : '0 0 0 10',
							bind : {
								value : '{theSearch.notDepartedOnly}'
							}
						},{
							xtype : 'checkboxfield',
							reference : 'ctlCntrListCheckBox',
							boxLabel : ViewUtil.getLabel('WRD_CTCM_ContainerList'),
							margin : '0 0 0 10',
							listeners : {
								change : 'onCntrListCheckBoxChange'
							}
						}]
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});
Ext.define('IoTosOmExt.view.operation.terminalholdlist.TerminalHoldList', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-terminalholdlist',
	requires:[
		'IoTosOmExt.view.operation.terminalholdlist.TerminalHoldListModel',
		'IoTosOmExt.view.operation.terminalholdlist.TerminalHoldListController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
   
   detailViewAlias: 'app-terminalholdlistdetail',

	controller: 'terminalholdlist',

	viewModel: {
		type: 'terminalholdlist'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refTerminalHoldListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'terminalHoldListStore',			// Main Store Name
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
					celldblclick: 'onTerminalHoldListGridDblClick',
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
					items: GridUtil.getGridColumns('TerminalHoldListGrid'),
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
					text: ViewUtil.getLabel('save'),
					iconCls: 'x-fa fa-save',
					itemId: "btnDetailSave",
					cls: 'save-button',
					listeners: {
						click: 'onGridSave'
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
                     layout : {
                        type : 'hbox'
                     },
                     items : [{
                        xtype : 'radiogroup',
                        reference : 'ctlCntrModeRadioGroup',
                        columns: 1,
                        vertical: true,
                        items : [
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_ReservedInYard'), name: 'cntrMode', inputValue: CodeConstantsOM.cntrMode.ALL, checked : true},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_Reserved'), name: 'cntrMode', inputValue: CodeConstantsOM.cntrMode.RESERVE},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_InYard'), name: 'cntrMode', inputValue: CodeConstantsOM.cntrMode.INVENTORY}
								],
								bind : {
									value : '{theSearch.cntrMode}'
								},
                     }]
						},{
                     xtype : 'fieldset',
                     layout : {
                        type : 'vbox'
                     },
                     // margin : '12 0 0 10',
                     items : [{
                        xtype : 'radiogroup',
                        reference : 'ctlHoldModeRadioGroup',
                        columns : 1,
                        vertical: true,
                        items : [
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_AllContainer'), name: 'holdMode', inputValue: CodeConstantsOM.holdMode.ALL, checked : true},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_HoldingContainer'), name: 'holdMode', inputValue: CodeConstantsOM.holdMode.HOLDING},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_ReleasedContainer'), name: 'holdMode', inputValue: CodeConstantsOM.holdMode.RELEASED}
                        ],
                        bind : {
                           value : '{theSearch.holdMode}'
                        }
                     }]
                  }]
               },{
                  xtype : 'fieldset',
						title : ViewUtil.getLabel('WRD_CTOM_FilteringOption'),
						collapsible : true,
						layout : {
							type : 'hbox'
						},
						defaults : {
							labelWidth : 'auto'
						},
						items : [{
							xtype : 'textfield',
							fieldLabel : ViewUtil.getLabel('WRD_CTOM_BlNo'),
							labelAlign : 'right',
							bind : {
								value : '{theSearch.blNos}'
							}
						},{
							xtype : 'commoncodefield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_HoldCode'),
                     bind : {
                        value : '{theSearch.holdCodes}',
							},
							params : {
								popupType : ViewUtil.POPUPTYPE_MULTI,
								title : ViewUtil.getLabel('WRD_CTOM_CodeValues'),
								itemKey : PopupServiceConstants.GeneralCode.HOLD_CODE
							},
							labelWidth : 60,
							width : 250,
							margin : '0 0 0 10'
						},{
							xtype : 'textfield',
							fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
							labelAlign : 'right',
							bind : {
								value : '{theSearch.cntrNos}'
							},
							margin : '0 0 0 10'
						}]
               },{
						xtype: 'button',
						text: ViewUtil.getLabel('add'),
						iconCls: 'x-fa fa-plus',
						itemId: "btnAdd",
						listeners: {
							click: 'onGridAdd'
						}
					}]
				}]
			}]
		});
		me.callParent();
	}
});
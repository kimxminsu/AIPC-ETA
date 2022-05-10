Ext.define('IoTosOmExt.view.operation.customsholdlist.CustomsHoldList', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-customsholdlist',
	requires:[
		'IoTosOmExt.view.operation.customsholdlist.CustomsHoldListModel',
		'IoTosOmExt.view.operation.customsholdlist.CustomsHoldListController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
   
   detailViewAlias: 'app-customsholdlistdetail',

	controller: 'customsholdlist',

	viewModel: {
		type: 'customsholdlist'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCustomsHoldListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'customsHoldListStore',				// Main Store Name
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
					celldblclick: 'onCustomsHoldListGridDblClick',
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
					items: GridUtil.getGridColumns('CustomsHoldListGrid'),
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
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_ReleasedContainer'), name: 'holdMode', inputValue: CodeConstantsOM.holdMode.RELEASED},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_NoneNULL'), name: 'holdMode', inputValue: CodeConstantsOM.holdMode.NONE}
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
							fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
							labelAlign : 'right',
							bind : {
								value : '{theSearch.cntrNos}'
							}
						}]
               }]
				}]
			}]
		});
		me.callParent();
	}
});
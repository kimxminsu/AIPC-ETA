Ext.define('IoTosOmExt.view.export.notarrivedcontainerlist.NotArrivedContainerList', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-notarrivedcontainerlist',
	requires:[
		'IoTosOmExt.view.export.notarrivedcontainerlist.NotArrivedContainerListModel',
		'IoTosOmExt.view.export.notarrivedcontainerlist.NotArrivedContainerListController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	controller: 'notarrivedcontainerlist',

	viewModel: {
		type: 'notarrivedcontainerlist'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refNotArrivedContainerListGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'notArrivedContainerListStore',				// Main Store Name
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
					items: GridUtil.getGridColumns('NotArrivedContainerListGrid'),
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
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_All'), name: 'filteringOption', inputValue: CommonConstants.ALL, checked : true},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_Reserved'), name: 'filteringOption', inputValue: CodeConstantsOM.commonCode.RESERVED, margin : '0 0 0 10'},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_InYard'), name: 'filteringOption', inputValue: CodeConstantsOM.commonCode.IN_YARD, margin : '0 0 0 10', width : 60},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_Delivered'), name: 'filteringOption', inputValue: CodeConstantsOM.commonCode.DELIVERED, margin : '0 0 0 10'}
                        ],
								listeners : {
									change : 'onChangeFilteringOption'
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
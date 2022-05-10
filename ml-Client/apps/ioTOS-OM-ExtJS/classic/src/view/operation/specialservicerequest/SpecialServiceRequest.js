Ext.define('IoTosOmExt.view.operation.specialservicerequest.SpecialServiceRequest', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-specialservicerequest',
	requires:[
		'IoTosOmExt.view.operation.specialservicerequest.SpecialServiceRequestModel',
		'IoTosOmExt.view.operation.specialservicerequest.SpecialServiceRequestController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
   
   detailViewAlias: 'app-specialservicerequestdetail',

	controller: 'specialservicerequest',

	viewModel: {
		type: 'specialservicerequest'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refSpecialServiceReqeustGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'specialServiceRequestStore',			// Main Store Name
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
					celldblclick: 'onSpecialServiceRequestGridDblClick',
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
					items: GridUtil.getGridColumns('SpecialServiceRequestGrid'),
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
                        reference : 'ctlSearchModeRadioGroup',
                        // columns: ,
                        vertical: false,
                        items : [
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_All'), name: 'searchMode', inputValue: CodeConstantsOM.specialServiceRequestSearchMode.ALL, checked : true},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_ContainerWise'), name: 'searchMode', inputValue: CodeConstantsOM.specialServiceRequestSearchMode.CNTRWISE, width : 100, margin : '0 0 0 10'},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_NonContainer'), name: 'searchMode', inputValue: CodeConstantsOM.specialServiceRequestSearchMode.NONCNTR, width : 100, margin : '0 0 0 10'}
								],
								bind : {
									value : '{theSearch.searchMode}'
								},
                     }]
						},{
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTOM_RequestDate'),
                     layout : {
                        type : 'hbox'
                     },
                     // margin : '12 0 0 10',
                     items : [{
								xtype : 'datefield',
								fieldLabel : ViewUtil.getLabel('WRD_CTOM_From'),
								labelWidth : 'auto',
								format : 'Y-m-d',
								bind : {
									value : '{theSearch.requestDateFrom}'
								}
                     },{
								xtype : 'datefield',
								fieldLabel : ViewUtil.getLabel('WRD_CTOM_To'),
								labelWidth : 'auto',
								margin : '0 0 0 10',
								format : 'Y-m-d',
								bind : {
									value : '{theSearch.requestDateTo}'
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
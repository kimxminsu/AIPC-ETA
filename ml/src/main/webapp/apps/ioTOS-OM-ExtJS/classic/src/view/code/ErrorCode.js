Ext.define('IoTosOmExt.view.code.ErrorCode', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-errorcode',
	requires:[
		'IoTosOmExt.view.code.ErrorCodeModel',
		'IoTosOmExt.view.code.ErrorCodeController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-errorcodedetail',
	
	controller: 'errorcode',

	viewModel: {
		type: 'errorcode'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refErrorCodeGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'errorCode',				// Main Store Name
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
					celldblclick: 'onDblClick',
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
					items: GridUtil.getGridColumns('ErrorCodeView'),
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
					xtype: 'fieldset',
					autoScroll: true,
					collapsible: true,
					flex: 1,
					title: ViewUtil.getLabel('search'),
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					defaults: {
						margin: '1 1 1 1'
					},
					items: [{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							margin: '1 1 1 1'
						},
						items:[{
							xtype:'textfield',
							reference:'ctlErrorCodeErrCode',
							fieldLabel: ViewUtil.getLabel('errorEdiCode'),
							labelWidth: 80,
							width: 240,
							maxLength: 10,
							enforceMaxLength : true,
							fieldStyle: 'text-transform:uppercase',
							bind : '{theSearch.errCode}',
							listeners:{
								change: 'onUpperCase'
							}
						},{
							xtype:'textfield',
							reference:'ctlErrorCodeErrName',
							fieldLabel: ViewUtil.getLabel('errorName'),
							labelWidth: 80,
							width: 240,
							maxLength: 50,
							enforceMaxLength : true,
							bind : '{theSearch.errName}'
						}]
					}]
				}]
			}]
		});

		me.callParent();
	}
});
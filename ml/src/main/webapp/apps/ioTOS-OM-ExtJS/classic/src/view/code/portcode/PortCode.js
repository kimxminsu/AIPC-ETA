Ext.define('IoTosOmExt.view.code.portcode.PortCode', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-portcode',
	requires:[
		'IoTosOmExt.view.code.portcode.PortCodeModel',
		'IoTosOmExt.view.code.portcode.PortCodeController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-portcodedetail',
	
	controller: 'portcode',

	viewModel: {
		type: 'portcode'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPortCodeGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'portCodeStore',				// Main Store Name
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
					celldblclick: 'onPortCodeGridDblClick',
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
					items: GridUtil.getGridColumns('PortCodeGrid'),
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
					title: ViewUtil.getLabel('WRD_CTOM_FilteringOption'),
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
							xtype : 'radiogroup',
							reference : 'ctlSearchOption',
							columns : 1,
							vertical : true,
							bind : {
								value : '{theSearch.portType}'
							},
							items : [{
								boxLabel : 'All',
								inputValue : '',
								name: 'portType',
								checked: true
							},{
								boxLabel : ViewUtil.getLabel('WRD_CTOM_UNLocode'),
								inputValue : 'UNLo',
								name: 'portType',
							},{
								boxLabel : ViewUtil.getLabel('WRD_CTOM_OPRPrivateCode'),
								inputValue : 'OPR',
								name: 'portType',
							}]
						},{
							xtype : 'container',
							layout : {
								type : 'vbox'
							},
							margin : '0 0 0 50',
							items : [{
								xtype : 'commoncodefield',
								reference : 'ctlCountryCodeCombo',
								params: {
									popupType : ViewUtil.POPUPTYPE_MULTI,
									title : ViewUtil.getLabel('WRD_CTOM_CodeValues'),
									args : ['UNLo'],
									itemKey : PopupServiceConstants.ItemKey.COUNTRY_CODE
								},
								fieldLabel : ViewUtil.getLabel('WRD_CTOM_CountryCode'),
								labelWidth : 100,
								bind : {
									value : '{theSearch.cntryCodes}'
								},
								margin : '0 0 3 0'
							},{
								xtype : 'commoncodefield',
								reference : 'ctlPartnerCodeCombo',
								params: {
									popupType : ViewUtil.POPUPTYPE_MULTI,
									title : ViewUtil.getLabel('WRD_CTCM_Menu_PartnerCode'),
									args : [PopupServiceConstants.PartnerType.LINE_OPERATOR],
									itemKey : PopupServiceConstants.PartnerType.LINE_OPERATOR
								},
								fieldLabel : ViewUtil.getLabel('WRD_CTCM_OPR'),
								labelWidth : 100,
								bind : {
									value : '{theSearch.oprCodes}'
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
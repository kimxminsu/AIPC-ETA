Ext.define('IoTosOmExt.view.code.containertypesize.ContainerTypeSize', {
   extend : 'Ext.form.Panel',
	alias: 'widget.app-containertypesize',
	requires:[
		'IoTosOmExt.view.code.containertypesize.ContainerTypeSizeModel',
		'IoTosOmExt.view.code.containertypesize.ContainerTypeSizeController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-containertypesizedetail',

	controller: 'containertypesize',

	viewModel: {
		type: 'containertypesize'
	},
	
	listeners : {
      afterrender : 'onLoad'
   },
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refContainerTypeSizeGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'containerTypeSizeStore',				// Main Store Name
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
					pagingSearch: 'onSearch',
					celldblclick: 'onDblClick',
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
					items: GridUtil.getGridColumns('ContainerTypeSizeGrid'),
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
					xtype : 'button',
					text : ViewUtil.getLabel('WRD_CTOM_SizeCode'),
					value : 'size',
					listeners : {
						click : 'onTypeSizeClick'
					}
				},{
					xtype : 'button',
					text : ViewUtil.getLabel('WRD_CTOM_TypeCode'),
					value : 'type',
					listeners : {
						click : 'onTypeSizeClick'
					}
				},{
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
					items :[{
						xtype : 'container',
						flex : 1,
						layout : {
							type : 'hbox',
							align : 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							margin: '1 1 1 1'
						},
						items : [{
							xtype: 'radiogroup',
							reference : 'ctlSearchOption',
							columns: 1,
							vertical: true,
							bind : {
								value : '{theSearch.isoType}'
							},
							items: [{
								boxLabel: ViewUtil.getLabel('WRD_CTOM_ContainerTypeSizeDesc'),
								inputValue : CodeConstantsOM.commonCode.isoType6346,
								name: 'isoType',
								checked: true
							}, {
								boxLabel: ViewUtil.getLabel('WRD_CTOM_ContainerTypeSizeDesc2'),
								inputValue : CodeConstantsOM.commonCode.isoType2716,
								name: 'isoType',
							}, {
								boxLabel: ViewUtil.getLabel('WRD_CTOM_TerminalPrivateCode'),
								inputValue : CommonConstants.ASTERISK,
								name: 'isoType',
							}, {
								boxLabel: ViewUtil.getLabel('WRD_CTOM_OperatorPrivateCode'),
								inputValue : CodeConstantsOM.commonCode.Operator,
								name : 'isoType'
							}]
                  },{
							xtype : 'container',
							layout : {
								type : 'vbox',
								pack : 'end'
							},
							items : [{
								xtype : 'combobox',
								reference:'ctlOperatorCodeCmb',
								fieldLabel: ViewUtil.getLabel('WRD_CTOM_Operator'),
								bind : {
									store : '{operatorCodeStore}',
									disabled : '{setDisableOperatorCodeCmb}'
								},
								queryMode : 'local',
								displayField : 'code',
								valueField : 'code',
								margin : '0 0 0 80',
								disabled : true
							}]
						}]
               }]
				}]
			}]
		});
		
		me.callParent();
	}
});
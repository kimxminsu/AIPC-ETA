Ext.define('IoTosOmExt.view.code.privatevoyage.PrivateVoyage', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-privatevoyage',
	requires:[
		'IoTosOmExt.view.code.privatevoyage.PrivateVoyageModel',
		'IoTosOmExt.view.code.privatevoyage.PrivateVoyageController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	controller: 'privatevoyage',

	viewModel: {
		type: 'privatevoyage'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refOperatorGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'privateVoyageStore',				// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout: { type: 'vbox', align: 'stretch' },
	
	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
         clicksToEdit: 2,
         pluginId :'operatorGridEditor',
         listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit: 'onValidateEdit',
            edit: 'onEdit'
         }
      });
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex: 1,
				bind: {
					store: '{' + me.MAIN_STORE_NAME + '}'
				},
				plugins: [
               rowEditing, 
               'gridexporter',
               'gridfilters',
               'clipboard'
            ],
				listeners: {
					celldblclick: 'onOperatorGridDblclick',
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
					items: GridUtil.getGridColumns('PrivateVoyageOperatorGrid'),
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
					},{
						xtype : 'fieldset',
						title : ViewUtil.getLabel('WRD_CTOM_FilteringOption'),
						collapsible : true,
						items : [{
							xtype : 'commoncodefield',
							reference : 'ctlOperatorField',
							params : {
								title : ViewUtil.getLabel('WRD_CTOM_CodeValues'),
								args : [PopupServiceConstants.PartnerType.LINE_OPERATOR],
								itemKey : PopupServiceConstants.PartnerType.LINE_OPERATOR,
							},
							bind : {
								value : '{theSearch.ptnrCode}'
							},
							fieldLabel : ViewUtil.getLabel('WRD_CTCM_Operator'),
							labelWidth : 80,
						}]
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});
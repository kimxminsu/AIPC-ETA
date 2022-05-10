Ext.define('IoTosOmExt.view.operation.vesselchange.VesselChange', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-vesselchange',
	requires:[
		'IoTosOmExt.view.operation.vesselchange.VesselChangeModel',
		'IoTosOmExt.view.operation.vesselchange.VesselChangeController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	controller: 'vesselchange',

	viewModel: {
		type: 'vesselchange'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselChangeGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'vesselChangeStore',				// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout: { type: 'vbox', align: 'stretch' },
	
	initComponent: function() {
      var me = this;	
      var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
         clicksToEdit: 2,
         pluginId :'vesselChangeGridEditor',
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
            plugins: [
               rowEditing,
					'gridexporter',
					'gridfilters',
					'clipboard'
				],
				bind: {
					store: '{' + me.MAIN_STORE_NAME + '}'
				},
				listeners: {
					celldblclick: 'onVesselChangeGridDblClick',
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
					items: GridUtil.getGridColumns('VesselChangeGrid'),
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
							type : 'hbox'
						},
                  items :[{
                     xtype : 'fieldset',
                     title : ViewUtil.getLabel('WRD_CTOM_AssignMode'),
                     layout : {
                        type : 'hbox'
                     },
                     items : [{
                        xtype : 'radiogroup',
                        reference : 'ctlAssignModeRadioGroup',
                        columns: 1,
                        vertical: true,
                        items : [
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_ExportVesselChange'), name: 'assignMode', inputValue: CodeConstantsOM.commonCode.EXPORT_CHANGE},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_ImportExportTransshipment'), name: 'assignMode', inputValue: CodeConstantsOM.commonCode.IMPORT_EXPORT},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_ImportExportReExport'), name: 'assignMode', inputValue: CodeConstantsOM.commonCode.REEXPORT},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_ImportStorageEmpty'), name: 'assignMode', inputValue: CodeConstantsOM.commonCode.IMPORT_STORAGE},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_StorageExport'), name: 'assignMode', inputValue: CodeConstantsOM.commonCode.STORAGE_EXPORT},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_StorageVesselChangeEmpty'), name: 'assignMode', inputValue : CodeConstantsOM.commonCode.STORAGE_CHANGE},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_ExportStorageUnverified'), name: 'assignMode', inputValue : CodeConstantsOM.commonCode.EXPORT_STORAGE}
								],
								bind : {
									value : '{theSearch.vesselChangeMode}'
								},
								listeners : {
									change : 'onAssignModeChange'
								}
                     }]
						},{
							xtype : 'container',
							layout : {
								type : 'vbox',
								align : 'stretch'
							},
							margin : '12 0 0 10',
							items : [{
								xtype : 'fieldset',
								layout : {
									type : 'vbox'
								},
								// margin : '12 0 0 10',
								items : [{
									xtype : 'checkboxgroup',
									columns : 1,
									vertical : true,
									items : [
										{boxLabel: ViewUtil.getLabel('WRD_CTOM_Reserved'), reference : 'ctlChkReserved', bind : '{theSearch.reservedCheck}'},
										{boxLabel: ViewUtil.getLabel('WRD_CTOM_InYard'), reference : 'ctlChkInYard', bind : '{theSearch.inYardCheck}'},
									],
									bind : {
										disabled : '{setDisabledReservedInyardGroup}'
									}
								},{
									xtype : 'radiogroup',
									reference : 'ctlAssignRollbackRadioGroup',
									columns : 1,
									vertical: true,
									items : [
										{boxLabel: ViewUtil.getLabel('WRD_CTOM_Assign'), name: 'assignRollback', inputValue: CodeConstantsOM.commonCode.ASSIGN},
										{boxLabel: ViewUtil.getLabel('WRD_CTOM_Rollback'), name: 'assignRollback', inputValue: CodeConstantsOM.commonCode.ROLLBACK},
									],
									bind : {
										disabled : '{setDisabledAssignRollbackGroup}',
										value : '{theSearch.assignRollback}'
									}
								}]
							},{
								xtype : 'button',
								text : 'Vessel Assign',
								listeners : {
									click : 'onVesselAssign'
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
						items : [{
							xtype : 'textfield',
							fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
							labelAlign : 'right',
							bind : {
								value : '{theSearch.cntrNo}'
							}
						}]
               }]
				}]
			}]
		});
		me.callParent();
	}
});
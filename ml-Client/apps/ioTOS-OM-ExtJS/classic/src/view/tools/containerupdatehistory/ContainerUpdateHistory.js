Ext.define('IoTosOmExt.view.tools.containerupdatehistory.ContainerUpdateHistory', {
	extend : 'Ext.form.Panel',
	alias: 'widget.app-containerupdatehistory',
	requires:[
		'IoTosOmExt.view.tools.containerupdatehistory.ContainerUpdateHistoryModel',
		'IoTosOmExt.view.tools.containerupdatehistory.ContainerUpdateHistoryController',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
   
	controller: 'containerupdatehistory',

	viewModel: {
		type: 'containerupdatehistory'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refContainerUpdateHistoryGrid',		// Main Grid Name 
	MAIN_STORE_NAME: 'containerUpdateHistoryStore',			// Main Store Name
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
					items: GridUtil.getGridColumns('ContainerUpdateHistoryGrid'),
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
                        xtype : 'checkboxgroup',
                        columns: 1,
                        vertical: true,
                        items : [
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_All'), reference: 'ctlChkBoxAll', checked : false, bind: '{theSearch.isAll}', listeners : {change : 'onAllChkBoxChanged'}},
                           {boxLabel: ViewUtil.getLabel('WRD_CTOM_VesselSchedule'), reference: 'ctlChkBoxVvd', checked : false, bind: '{theSearch.isVVD}',disabled:true},
									{boxLabel: ViewUtil.getLabel('WRD_CTOM_Cancel'), reference: 'ctlChkBoxCancel', checked : false, bind: '{theSearch.isCancel}',disabled:true},
									{boxLabel: ViewUtil.getLabel('WRD_CTOM_Return'), reference: 'ctlChkBoxReturn', checked : false, bind: '{theSearch.isReturn}',disabled:true},
									{boxLabel: ViewUtil.getLabel('WRD_CTOM_POD'), reference: 'ctlChkBoxPod', checked : false, bind: '{theSearch.isPOD}',disabled:true},
									{boxLabel: ViewUtil.getLabel('WRD_CTOM_Operator'), reference: 'ctlChkBoxOperator', checked : false, bind: '{theSearch.isOperator}',disabled:true}
								]
                     },{
								xtype : 'container',
								layout : {
									type : 'vbox'
								},
								defaults : {
									labelWidth : 100,
									labelAlign : 'right',
								},
								items : [{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
									bind : {
										value : '{theSearch.cntrNo}'
									}
								},{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerID'),
									bind : {
										value : '{theSearch.cntrId}'
									}
								}]
							}]
						}]
               }]
				}]
			}]
		});
		me.callParent();
	}
});
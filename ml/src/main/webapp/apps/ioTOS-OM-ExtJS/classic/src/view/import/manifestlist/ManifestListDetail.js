Ext.define('IoTosOmExt.view.import.manifestlist.ManifestListDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-manifestlistdetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 890,
   height : 850,
	scrollable: true,
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	initComponent: function() {
		var me = this;

		Ext.apply(this, {
			defaults:{
				margin: '0 5 0 5' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				margin: '5 5 0 5',
				xtype: 'container',
				layout: {
						type: 'vbox',
						align: 'stretch'
				},
				flex : 1,
				items: [{
					xtype : 'container',
					layout : {
						type : 'hbox',
						align : 'stretch'
					},
					items : [{
						xtype : 'container',
						layout : {
							type : 'vbox',
							align : 'stretch'
						},
						// flex : 0.6,
						scrollable : true,
						items : [{
							xtype : 'fieldset',
							items : [{
								xtype : 'container',
								layout : {
									type : 'hbox',
									align : 'stretch'
								},
								items : [{
									xtype : 'container',
									layout : {
										type : 'vbox',
									},
									defaults : {
										// labelWidth : 120,
										labelAlign : 'right',
									},
									items : [{
										xtype : 'textfield',
										reference : 'ctlMfNo',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_MFNo'),
										bind : {
											value : '{theDetail.soNo}'
										},
										allowBlank : false,
										allowOnlyWhitespace : false
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_BlNo'),
										bind : {
											value : '{theDetail.blNo}'
										},
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_HouseBLNo'),
										bind : {
											value : '{theDetail.houseBlNo}'
										}
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerQty'),
										bind : {
											value : '{theDetail.containerQty}'
										},
										readOnly : true,
										hideTrigger : true,
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Operator'),
										bind : {
											store : '{oprCodeStore}',
											value : '{theDetail.ptnrCode}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local',
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Delivery'),
										bind : {
											store : '{deliveryCodeStore}',
											value : '{theDetail.delv}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Weight'),
										bind : {
											value : '{theDetail.wgt}'
										},
										maxLength : 12,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true,
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Cbm'),
										bind : {
											value : '{theDetail.cbm}'
										},
										maxLength : 7,
										enforceMaxLength : true,
										maxValue : 9999.99,
										hideTrigger : true,
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_TempC'),
										bind : {
											value : '{theDetail.setTempC}',
										},
										listeners : {
											change : 'onTempCChange'
										},
										maxLength : 9,
										enforceMaxLength : true,
										maxValue : 999999.99,
										hideTrigger : true
									},{
										xtype : 'numberfield',
										reference : 'ctlTempF',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_TempF'),
										bind : {
											value : '{theDetail.setTempF}'
										},
										readOnly : true,
										hideTrigger : true,
									}]
								},{
									xtype : 'container',
									layout : {
										type : 'vbox'
									},
									defaults : {
										// labelWidth : 130,
										labelAlign : 'right',
									},
									items : [{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_POR'),
										bind : {
											store : '{porCodeStore}',
											value : '{theDetail.por}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local',
										// margin : '10 0 0 0'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_POL'),
										bind : {
											store : '{polCodeStore}',
											value : '{theDetail.pol}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local',
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_POD'),
										bind : {
											store : '{podCodeStore}',
											value : '{theDetail.pod}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local',
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_FPOD'),
										bind : {
											store : '{fPodCodeStore}',
											value : '{theDetail.fpod}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_FDEST'),
										bind : {
											store : '{fDestCodeStore}',
											value : '{theDetail.fdest}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Shipper'),
										bind : {
											store : '{shipperConsigneeStore}',
											value : '{theDetail.shipper}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Consignee'),
										bind : {
											store : '{shipperConsigneeStore}',
											value : '{theDetail.consignee}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local'
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ConsigneeEDI'),
										bind : {
											value : '{theDetail.consigneeEDI}'
										},
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_IMDG'),
										bind : {
											value : '{theDetail.imdg}'
										},
										maxLength : 4,
										enforceMaxLength : true,
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_UNNo'),
										bind : {
											value : '{theDetail.unno}'
										},
										maxLength : 4,
										enforceMaxLength : true,
									}]
								},{
									xtype : 'container',
									layout : {
										type : 'vbox'
									},
									defaults : {
										labelWidth : 110,
										labelAlign : 'right',
									},
									items : [{
										xtype : 'container',
										layout : {
											type : 'hbox'
										},
										margin : '0 0 0 10',
										items : [{
											xtype : 'numberfield',
											fieldLabel : ViewUtil.getLabel('WRD_CTOM_PackageQty'),
											labelAlign : 'right',
											bind : {
												value : '{theDetail.packageQty}'
											},
											maxLength : 8,
											enforceMaxLength : true,
											allowDecimals : false,
											hideTrigger : true,
											width : 190
										},{
											xtype : 'combobox',
											bind : {
												store : '{packageCodeStore}',
												value : '{theDetail.package}'
											},
											valueField : 'code',
											displayField : 'code',
											queryMode : 'local',
											width : 85,
											margin : '0 0 10 0'
										}]
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Forwarder'),
										bind : {
											store : '{forwarderCodeStore}',
											value : '{theDetail.forwarder}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Commodity'),
										bind : {
											store : '{commodityCodeStore}',
											value : '{theDetail.commodity}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local',
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_CommodityEDI'),
										bind : {
											value : '{theDetail.commodityEDI}'
										},
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_NotifyAddr'),
										bind : {
											value : '{theDetail.notifyAddr}'
										},
									},{
										xtype : 'textarea',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_MarksNumbers'),
										bind : {
											value : '{theDetail.marksNos}'
										}
									},{
										xtype : 'textarea',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Remark'),
										bind : {
											value : '{theDetail.remark1}'
										}
									}]
								}]
							}]
						}]
					}]
				},{
					xtype : 'container',
					layout : {
						type : 'hbox',
					},
					items : [{
						xtype : 'button',
						text : ViewUtil.getLabel('WRD_CTCM_Add'),
						iconCls: 'x-fa fa-plus',
						listeners : {
							click : 'onAddContainer'
						}
					},{
						xtype : 'button',
						text : ViewUtil.getLabel('WRD_CTCM_Remove'),
						ui: 'delete-button',
						iconCls: 'x-fa fa-minus',
						margin : '0 0 1 1',
						listeners : {
							click : 'onRemoveContainer'
						}
					}]
				},{
					xtype: 'tsb-datagrid',
					reference: 'refDetailManifestListGrid',
					title : ViewUtil.getLabel('WRD_CTOM_ContainerList'),
					flex: 1,
					bind: {
						store: '{detailManifestListStore}'
					},
					listeners: {
						rowdblclick: 'onBlDetailGridDblClick',
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
						items: GridUtil.getGridColumns('ManifestListGrid'),
					}
				}]
		   }]
		});
		me.callParent();
	}
});

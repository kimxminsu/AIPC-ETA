Ext.define('IoTosOmExt.view.import.manifestlist.ContainerListDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-manifestcontainerlistdetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 600,
   height : 310,
	scrollable: true,
	
	listeners:{
		afterrender: 'onContainerDetailLoad'
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
						items : [{
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTOM_ContainerDetailInfomation'),
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
										reference : 'ctlContainerDetailMfNo',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_MFNo'),
										bind : {
											value : '{theContainerDetail.soNo}'
                              },
                              // allowBlank : false,
                              readOnly : true
									},{
                              xtype : 'textfield',
                              reference : 'ctlContainerDetailCntrNo',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
										bind : {
											value : '{theContainerDetail.cntrNo}'
										},
										allowBlank : false,
										maxLength : 11,
										enforceMaxLength : true,
										allowOnlyWhitespace : false
									},{
										xtype : 'textfield',
                              reference : 'ctlContainerDetailSztp',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp'),
                              bind : {
                                 value : '{theContainerDetail.sztp}'
                              },
                              listeners : {
                                 change : 'onSztpChange'
                              },
                              maxLength : 4,
                              enforceMaxLength : true,
									},{
										xtype : 'textfield',
                              reference : 'ctlContainerDetailSztp2',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp2'),
                              bind : {
                                 value : '{theContainerDetail.sztp2}'
                              },
                              readOnly : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_CntrType'),
										bind : {
											value : '{theContainerDetail.cntrType}'
										},
										readOnly : true
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_FE'),
										bind : {
											store : '{feCodeStore}',
											value : '{theContainerDetail.fe}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
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
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Weight'),
										bind : {
											value : '{theContainerDetail.wgt}'
										},
										maxLength : 12,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true,
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Cbm'),
										bind : {
											value : '{theContainerDetail.cbm}'
										},
										maxLength : 7,
										enforceMaxLength : true,
										maxValue : 9999.99,
										hideTrigger : true,
									},{
										xtype : 'container',
										layout : {
											type : 'hbox'
										},
										items : [{
											xtype : 'numberfield',
											fieldLabel : ViewUtil.getLabel('WRD_CTOM_PackageQty'),
											labelAlign : 'right',
											bind : {
												value : '{theContainerDetail.packageQty}'
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
												value : '{theContainerDetail.package}'
											},
											valueField : 'code',
											displayField : 'code',
											queryMode : 'local',
											width : 85,
											margin : '0 0 10 0'
										}]
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_CarrierSeal'),
										bind : {
											value : '{theContainerDetail.sealNo1}'
										}
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_LclFcl'),
										bind : {
											store : '{lclFclStore}',
											value : '{theContainerDetail.lclFcl}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									}]
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

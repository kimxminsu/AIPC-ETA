Ext.define('IoTosOmExt.view.export.movinslist.MovinsListDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-movinslistdetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 1040,
   height : 540,
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
						flex : 0.6,
						scrollable : true,
						items : [{
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTOM_ContainerDetailInformaion'),
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
                              reference : 'ctlShipLocL',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShipLocationL'),
										bind : {
											value : '{theDetail.loadPos}'
										},
										allowBlank : false,
										maxLength : 7,
										enforceMaxLength : true,
										maskRe : /[0-9]/
									},{
                              xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
										bind : {
											value : '{theDetail.cntrNo}'
										},
										maxLength : 12,
										enforceMaxLength : true,
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_FE'),
										bind : {
											store : '{feCodeStore}',
											value : '{theDetail.fe}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
										allowBlank : false
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
										bind : {
											store : '{oprCodeStore}',
											value : '{theDetail.ptnrCode}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local',
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Weight'),
										bind : {
											value : '{theDetail.wgt}'
										},
										allowBlank : false,
										maxLength : 6,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true
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
										allowBlank : false
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
									}]
								},{
									xtype : 'container',
									layout : {
										type : 'vbox'
									},
									defaults : {
										labelWidth : 160,
										labelAlign : 'right',
									},
									items : [{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_CargoType'),
										bind : {
											store : '{cargoTypeStore}',
											value : '{theDetail.cargoType}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
										allowBlank : false
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
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShiftingTime'),
										bind : {
											store : '{shiftingTimeStore}',
											value : '{theDetail.shiftTime}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
									},{
                              xtype : 'textfield',
                              reference : 'ctlShipLocD',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShipLocationD'),
										bind : {
											value : '{theDetail.disPos}'
										},
										maxLength : 7,
										enforceMaxLength : true,
										maskRe : /[0-9]/
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_HandlingInstructionS'),
										bind : {
											store : '{handleInstrCodeStore}',
											value : '{theDetail.handleInstr}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
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
										hideTrigger : true
									},{
										xtype : 'textfield',
										reference : 'ctlTempF',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_TempF'),
										bind : {
											value : '{theDetail.setTempF}'
										},
										readOnly : true
									},{
										xtype : 'textarea',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Remark'),
										bind : {
											value : '{theDetail.remark}'
										}
									}]
								},{
									xtype : 'container',
									layout : {
										type : 'vbox'
									},
									margin : '0 0 0 20',
									items : [{
										xtype : 'container',
										layout : {
											type : 'hbox'
										},
										items : [{
											xtype : 'textfield',
											reference : 'ctlSztp',
											fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp'),
											width : 110,
											labelWidth : 50,
											labelAlign : 'right',
											bind : {
												value : '{theDetail.sztp}'
											},
											allowBlank : false,
											listeners : {
												change : 'onSztpChange'
											},
											allowBlank : false,
											maxLength : 4,
											enforceMaxLength : true,
											allowOnlyWhitespace : false
										},{
											xtype : 'textfield',
											reference : 'ctlSztp2Detail',
											width : 60,
											margin : '0 0 0 5',
											bind : {
												value : '{theDetail.sztp2}'
											},
											readOnly : true
										},{
											xtype : 'textfield',
											reference : 'ctlPrivateSztpDetail',
											width : 60,
											margin : '0 0 0 5',
											bind : {
												value : '{theDetail.privateSztp}'
											},
											readOnly : true
										}]
									},{
										xtype : 'fieldset',
										title : ViewUtil.getLabel('WRD_CTOM_SpecialInformation'),
										flex : 1,
										layout : {
											type : 'vbox',
										},
										items : [{
											xtype : 'container',
											layout : {
												type : 'hbox'
											},
											defaults : {
												labelWidth : 100,
												labelAlign : 'right'
											},
											items : [{
												xtype : 'textfield',
												value : 'Over Dim',
                                    width : 100,
                                    readOnly : true
											},{
												xtype : 'textfield',
												value : '(cm)',
												margin : '0 0 0 5',
                                    width : 100,
                                    readOnly : true
											},{
												xtype : 'textfield',
												value : '(slot)',
												margin : '0 0 0 5',
                                    width : 100,
                                    readOnly : true
											}]
										},{
											xtype : 'container',
											layout : {
												type : 'hbox'
											},
											defaults : {
												labelWidth : 100,
												labelAlign : 'right'
											},
											margin : '10 0 10 0',
											items : [{
												xtype : 'numberfield',
												fieldLabel : ViewUtil.getLabel('WRD_CTOM_Height'),
												width : 205,
												bind : {
													value : '{theDetail.ovHeight}'
												},
												maxLength : 5,
												enforceMaxLength : true,
												allowDecimals : false,
												hideTrigger : true
											},{
												xtype : 'numberfield',
												margin : '0 0 0 5',
												width : 100,
												bind : {
													value : '{theDetail.osHeight}'
												},
												maxLength : 5,
												enforceMaxLength : true,
												allowDecimals : false,
												hideTrigger : true
											}]
										},{
											xtype : 'numberfield',
											fieldLabel : ViewUtil.getLabel('WRD_CTOM_Fore'),
											labelWidth : 100,
											labelAlign : 'right',
											width : 205,
											bind : {
												value : '{theDetail.ovFore}'
											},
											maxLength : 5,
											enforceMaxLength : true,
											allowDecimals : false,
											hideTrigger : true
										},{
											xtype : 'numberfield',
											fieldLabel : ViewUtil.getLabel('WRD_CTOM_After'),
											labelWidth : 100,
											labelAlign : 'right',
											width : 205,
											bind : {
												value : '{theDetail.ovAft}'
											},
											maxLength : 5,
											enforceMaxLength : true,
											allowDecimals : false,
											hideTrigger : true
										},{
											xtype : 'container',
											layout : {
												type : 'hbox'
											},
											defaults : {
												labelWidth : 100,
												labelAlign : 'right'
											},
											margin : '0 0 10 0',
											items : [{
												xtype : 'numberfield',
												fieldLabel : ViewUtil.getLabel('WRD_CTOM_Port'),
												width : 205,
												bind : {
													value : '{theDetail.ovPort}'
												},
												maxLength : 5,
												enforceMaxLength : true,
												allowDecimals : false,
												hideTrigger : true
											},{
												xtype : 'numberfield',
												margin : '0 0 0 5',
												width : 100,
												bind : {
													value : '{theDetail.osPort}'
												},
												maxLength : 5,
												enforceMaxLength : true,
												allowDecimals : false,
												hideTrigger : true
											}]
										},{
											xtype : 'container',
											layout : {
												type : 'hbox'
											},
											defaults : {
												labelWidth : 100,
												labelAlign : 'right'
											},
											margin : '0 0 10 0',
											items : [{
												xtype : 'numberfield',
												fieldLabel : ViewUtil.getLabel('WRD_CTOM_Starboard'),
												width : 205,
												bind : {
													value : '{theDetail.ovStbd}'
												},
												maxLength : 5,
												enforceMaxLength : true,
												allowDecimals : false,
												hideTrigger : true
											},{
												xtype : 'numberfield',
												margin : '0 0 0 5',
												width : 100,
												bind : {
													value : '{theDetail.osStbd}'
												},
												maxLength : 5,
												enforceMaxLength : true,
												allowDecimals : false,
												hideTrigger : true
											}]
										},
										{
											xtype : 'container',
											layout : {
												type : 'vbox',
											},
											items : [{
												xtype : 'fieldset',
                                    title : ViewUtil.getLabel('WRD_CTOM_DGInformation'),
                                    layout : {
                                       type : 'vbox'
                                    },
                                    defaults : {
                                       labelAlign : 'right',
                                    },
												items : [{
													xtype : 'textfield',
													reference : 'ctlImdg',
													fieldLabel : ViewUtil.getLabel('WRD_CTOM_IMDG'),
													bind : {
														value : '{theDetail.imdg}'
													},
													maxLength : 3,
													enforceMaxLength : true,
                                    },{
													xtype : 'textfield',
													reference : 'ctlUnno',
													fieldLabel : ViewUtil.getLabel('WRD_CTOM_UNNo'),
													bind : {
														value : '{theDetail.unno}'
													},
													maxLength : 4,
                     						enforceMaxLength : true,
                                    },{
                                       xtype : 'combobox',
													fieldLabel : ViewUtil.getLabel('WRD_CTOM_PackingGroup'),
													bind : {
														store : '{packingGroupStore}',
														value : '{theDetail.packingGrp}'
													},
													valueField : 'code',
                     						displayField : 'name',
													queryMode : 'remote'
                                    }]
											}]
										}]
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

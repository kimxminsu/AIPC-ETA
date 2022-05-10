Ext.define('IoTosOmExt.view.export.loadinglist.LoadingListDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-loadinglistdetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 1080,
   height : 720,
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
                              reference : 'ctlCntrNo',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
										bind : {
											value : '{theDetail.cntrNo}'
										},
										allowBlank : false,
										maxLength : 12,
										enforceMaxLength : true,
										allowOnlyWhitespace : false
									},{
                              xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Status'),
										bind : {
											value : '{theDetail.cntrState}'
										},
										readOnly : true
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
										allowBlank : false
									},{
                              xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_BillingOPR'),
										bind : {
											store : '{billingOprCodeStore}',
											value : '{theDetail.shiftAcc}'
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
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_VGM'),
										bind : {
											value : '{theDetail.vgm}'
										},
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_VGMAuthNo'),
										bind : {
											value : '{theDetail.vgmAuthNo}'
										},
									},{
										xtype : 'datefield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_VGMAuthDate'),
										format : 'Y-m-d',
										bind : {
											value : '{theDetail.vgmDate}'
										}
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_VGMAuthPerson'),
										bind : {
											value : '{theDetail.vgmPersonInfo}'
										},
									},{
                              xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_POR'),
										bind : {
											store : '{porCodeStore}',
											value : '{theDetail.por}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local'
                           },{
                              xtype : 'textfield',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_POL'),
                              bind : {
                                 value : '{theDetail.pol}'
                              },
                              readOnly : true
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
									},{
                              xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Shipper'),
										bind : {
											store : '{shipperConsineeCodeStore}',
											value : '{theDetail.consignee}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local'
                           },{
										xtype : 'checkboxfield',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_DomesticCheck'),
										margin : '0 0 0 100',
										bind : {
											value : '{theDetail.isDomesticChk}'
										}
									},{
										xtype : 'checkboxfield',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_NoPlugInstr'),
										margin : '0 0 0 100',
										bind : {
											value : '{theDetail.unplugInstr}'
										}
									}]
								},{
									xtype : 'container',
									layout : {
										type : 'vbox'
									},
									defaults : {
										labelWidth : 180,
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
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_TransTypeIn'),
										bind : {
											store : '{transTypeStore}',
											value : '{theDetail.transType}'
										},
										valueField : 'code',
										displayField : 'name',
                              queryMode : 'local',
                              allowBlank : false
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
                              xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_HandlingInstructionY'),
										bind : {
											store : '{yHandleInstrCodeStore}',
											value : '{theDetail.yhandleInstr}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
                           },{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_AbsoluteConst'),
										bind : {
											store : '{absoluteConstStore}',
											value : '{theDetail.absConst}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_BookingNo'),
										bind : {
											value : '{theDetail.bookingNo}'
										},
									},{
                              xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_SoNo'),
										bind : {
											value : '{theDetail.soNo}'
										}
                           },{
                              xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShipLocationL'),
										bind : {
											value : '{theDetail.loadPos}'
										},
										maxLength : 7,
										enforceMaxLength : true,
										maskRe : /[0-9]/
                           },{
                              xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShipLocationD'),
										bind : {
											value : '{theDetail.disPos}'
										},
										maxLength : 7,
										enforceMaxLength : true,
										maskRe : /[0-9]/
                           },{
                              xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_CommodityDesc'),
										bind : {
											value : '{theDetail.commodityDesc}'
										}
                           },{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_AirVent_PERCENT'),
										bind : {
											value : '{theDetail.airvent}'
										},
										maxLength : 8,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true
                           },{
                              xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_AirVentUnit'),
										bind : {
											store : '{airVentUnitStore}',
											value : '{theDetail.airventUnit}'
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
										xtype : 'numberfield',
										reference : 'ctlTempF',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_TempF'),
										bind : {
											value : '{theDetail.setTempF}'
										},
										readOnly : true,
										hideTrigger : true
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
												hideTrigger : true
											}]
										},
										{
											xtype : 'container',
											layout : {
												type : 'hbox',
											},
											items : [{
												xtype : 'button',
												text : ViewUtil.getLabel('WRD_CTCM_Add'),
												iconCls: 'x-fa fa-plus',
												listeners : {
													click : 'onAddDgInfo'
												}
											},{
												xtype : 'button',
												text : ViewUtil.getLabel('WRD_CTCM_Remove'),
												ui: 'delete-button',
												iconCls: 'x-fa fa-minus',
												margin : '0 0 1 1',
												listeners : {
													click : 'onRemoveDgInfo'
												}
											}]
										},{
											xtype : 'tsb-datagrid',
											reference : 'refDgInformationGrid',
											bind : {
												store : '{hazardInfoStore}'
											},
											usePagingToolbar : false,
                                 width : 330,
											flex : 1,
											selMode : {
												mode : 'MULTI'
											},
											listeners : {
												rowdblclick : 'onDgInformationGridDblClick'
											},
											columns : {
												items : GridUtil.getGridColumns('DgInformationGrid')
											}
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

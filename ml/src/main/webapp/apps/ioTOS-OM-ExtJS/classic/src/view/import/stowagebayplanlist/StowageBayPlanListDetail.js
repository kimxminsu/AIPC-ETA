Ext.define('IoTosOmExt.view.import.stowagebayplanlist.StowageBayPlanListDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-stowagebayplanlistdetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 1070,
   height : 880,
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
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_POD'),
										bind : {
											value : '{theDetail.pod}'
										},
										allowBlank : false,
										readOnly : true
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
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_StorageCode'),
										bind : {
											store : '{storageCodeStore}',
											value : '{theDetail.storageCode}',
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local',
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
										xtype : 'checkboxfield',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_EmptyCheck'),
										bind : {
											value : '{theDetail.emtyChk}'
										},
										margin : '0 0 0 100',
									},{
										xtype : 'checkboxfield',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_DomesticCheck'),
										bind : {
											value : '{theDetail.isDomesticChk}'
										},
										margin : '0 0 0 100',
									},{
										xtype : 'checkboxfield',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_DOCheck'),
										bind : {
											value : '{theDetail.isDoChk}'
										},
										margin : '0 0 0 100',
									},{
										xtype : 'checkboxfield',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_NeedToCheckSealNo'),
										bind : {
											value : '{theDetail.isNeedToCheckSealNo}'
										},
										margin : '0 0 0 100',
									},{
										xtype : 'checkboxfield',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_SOCCheck'),
										bind : {
											value : '{theDetail.socChk}'
										},
										margin : '0 0 0 100',
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
                              reference : 'ctlShipLocL',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShipLocationL'),
										bind : {
											value : '{theDetail.loadPos}'
										},
										maxLength : 7,
										enforceMaxLength : true,
										maskRe : /[0-9]/
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_RefNo'),
										bind : {
											value : '{soNo}'
										}
									},{
                              xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShipperConsignee'),
										bind : {
											store : '{shipperConsineeCodeStore}',
											value : '{theDetail.consignee}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local'
                           },{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_CarrierSeal'),
										bind : {
											value : '{theDetail.sealNo1}'
										},
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_CustomsSeal'),
										bind : {
											value : '{theDetail.sealNo2}'
										},
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
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_BlNo'),
										bind : {
											value : '{theDetail.blNo}',
										},
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_DamageCondition'),
										bind : {
											store : '{damageConditionStore}',
											value : '{theDetail.dmgCond}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
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
							},{
								xtype : 'container',
								layout : {
									type : 'hbox',
									align : 'stretch'
								},
								margin : '10 0 0 30',
								items : [{
									xtype : 'fieldset',
									title : ViewUtil.getLabel('WRD_CTOM_ShiftingContainer'),
									defaults : {
										labelWidth : 100,
										labelAlign : 'right'
									},
									bind : {
										disabled : '{setDisabledShiftingContainerFieldSet}'
									},
									// flex : 1,
									items : [{
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
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShiftingRsn'),
										bind : {
											store : '{shiftingRsnStore}',
											value : '{theDetail.shiftRsn}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShiftingType'),
										bind : {
											store : '{shiftingTypeStore}',
											value : '{theDetail.shiftType}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
									}]
								},{
									xtype : 'fieldset',
									title : ViewUtil.getLabel('WRD_CTOM_TransshipmentContainer'),
									defaults : {
										labelWidth : 100,
										labelAlign : 'right'
									},
									margin : '0 0 0 20',
									// flex : 1,
									bind : {
										disabled : '{setDisabledTransshipmentContainerFieldSet}'
									},
									items : [{
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
										xtype : 'container',
										layout : {
											type : 'hbox'
										},
										items : [{
											xtype : 'textfield',
											reference : 'ctlDetailNextVessel',
											fieldLabel : ViewUtil.getLabel('WRD_CTOM_NextVessel'),
											labelWidth : 100,
											labelAlign : 'right',
											bind : {
												value : '{theDetail.prevVVD}'
											},
											readOnly : true
										},{
											xtype : 'button',
											iconCls : 'x-fa fa-search',
											margin : '0 0 0 5',
											listeners : {
												click : 'onSearchNextVessel'
											}
										}]
									},{
										xtype : 'container',
										layout : {
											type : 'hbox'
										},
										margin : '10 0 0 105',
										items : [{
											xtype : 'textfield',
											reference : 'ctlDetailPrevUserVoy',
											bind : {
												value : '{theDetail.prevUserVoy}'
											},
											readOnly : true,
											flex : 1
										},{
											xtype : 'textfield',
											reference : 'ctlDetailOutLane',
											bind : {
												value : '{theDetail.outLane}'
											},
											readOnly : true,
											flex : 1
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

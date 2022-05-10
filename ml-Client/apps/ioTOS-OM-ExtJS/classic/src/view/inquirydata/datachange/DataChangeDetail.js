Ext.define('IoTosOmExt.view.inquirydata.datachange.DataChangeDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-datachangedetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 1240,
   height : 890,
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
										labelAlign : 'right',
									},
									items : [{
										xtype : 'textfield',
										reference : 'ctlMfNo',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
										bind : {
											value : '{theDetail.cntrNo}'
										},
										allowBlank : false,
										readOnly : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerID'),
										bind : {
											value : '{theDetail.cntrId}'
										},
										readOnly : true
									},{
										xtype : 'container',
										layout : {
											type : 'hbox'
                              },
                              margin : '0 0 10 0',
										items : [{
											xtype : 'textfield',
											fieldLabel : ViewUtil.getLabel('WRD_CTOM_VesselVoyage'),
											labelAlign : 'right',
											bind : {
												value : '{theDetail.vslCd}'
											},
                                 width : 161,
											readOnly : true,
											allowBlank : false
										},{
											xtype : 'textfield',
                                 bind : {
                                    value : '{theDetail.callYear}'
                                 },
                                 width : 57,
											readOnly : true,
											allowBlank : false
										},{
                                 xtype : 'textfield',
                                 bind : {
                                    value : '{theDetail.callSeq}'
                                 },
                                 width : 57,
											readOnly : true,
											allowBlank : false
                              }]
									},{
										xtype : 'container',
										layout : {
											type : 'hbox'
                              },
                              margin : '0 0 10 0',
										items : [{
											xtype : 'textfield',
											reference : 'ctlSztp',
											fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp'),
											labelAlign : 'right',
											bind : {
												value : '{theDetail.sztp}'
											},
											listeners : {
												change : 'onSztpChange'
											},
											width : 161,
											allowBlank : false,
											allowOnlyWhitespace : false
										},{
											xtype : 'textfield',
											reference : 'ctlSztp2Detail',
                                 bind : {
                                    value : '{theDetail.sztp2}'
                                 },
                                 width : 57,
											readOnly : true,
											allowBlank : false
										},{
											xtype : 'textfield',
											reference : 'ctlPrivateSztpDetail',
                                 bind : {
                                    value : '{theDetail.pSztp}'
                                 },
                                 width : 57,
                                 readOnly : true
                              }]
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
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_StorageCode'),
										bind : {
											store : '{storageCodeStore}',
											value : '{theDetail.storageCode}',
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Status'),
										bind : {
											store : '{statusCodeStore}',
											value : '{theDetail.cntrState}',
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
									},{
										xtype : 'combobox',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_Block'),
                              bind : {
                                 store : '{blockCodeStore}',
                                 value : '{theDetail.block}'
                              },
                              valueField : 'name',
                              displayField : 'name',
										queryMode : 'local',
									},{
										xtype : 'combobox',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_Bay'),
                              bind : {
                                 store : '{bayCodeStore}',
                                 value : '{theDetail.bay}'
                              },
                              valueField : 'code',
                              displayField : 'code',
									},{
										xtype : 'combobox',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_Row'),
                              bind : {
                                 store : '{rowCodeStore}',
                                 value : '{theDetail.roww}'
                              },
                              valueField : 'code',
                              displayField : 'code',
										queryMode : 'local',
									},{
										xtype : 'combobox',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_Tier'),
                              bind : {
                                 store : '{tierCodeStore}',
                                 value : '{theDetail.tier}'
                              },
                              valueField : 'code',
                              displayField : 'code',
                              queryMode : 'local',
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Area'),
										bind : {
											store : '{areaCodeStore}',
											value : '{theDetail.area}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShipLocL'),
										bind : {
											value : '{theDetail.loadPos}',
										},
										maxLength : 7,
										enforceMaxLength : true,
										maskRe : /[0-9]/
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShipLocD'),
										bind : {
											value : '{theDetail.disPos}',
										},
										maxLength : 7,
										enforceMaxLength : true,
										maskRe : /[0-9]/
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Delivery'),
										bind : {
											store : '{deliveryCodeStore}',
											value : '{theDetail.delv}',
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
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_TransTypeOut'),
										bind : {
											store : '{transTypeStore}',
											value : '{theDetail.transType2}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
									},{
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
										xtype : 'checkboxfield',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_SOCCheck'),
										bind : {
											value : '{theDetail.socChk}'
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
										boxLabel : ViewUtil.getLabel('WRD_CTOM_NoPlugInstr'),
										bind : {
											value : '{theDetail.unplugInstr}'
										},
										margin : '0 0 0 100',
									}]
								},{
									///22
									xtype : 'container',
									layout : {
										type : 'vbox'
									},
									defaults : {
										labelAlign : 'right',
										labelWidth : 130
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
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_PrivateFDEST'),
										bind : {
											value : '{theDetail.priFdest}'
										},
										maxLength : 8,
										enforceMaxLength : true,
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Weight'),
										bind : {
											value : '{theDetail.wgt}'
										},
										allowBlank : false,
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_TareWeight'),
										bind : {
											value : '{theDetail.tareWgt}'
										},
										maxLength : 5,
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
										hideTrigger : true,
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
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_TempC'),
										bind : {
											value : '{theDetail.setTempC}',
										},
										listeners : {
											change : 'onTempCChange'
										},
										maxLength : 8,
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
										hideTrigger : true,
									},{
										xtype : 'textfield',
										reference : 'ctlImdg',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_IMDG'),
										bind : {
											value : '{theDetail.imdg}'
										},
										maxLength : 4,
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
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_SpecialTypeY'),
										bind : {
											store : '{ySpecialTypeStore}',
											value : '{theDetail.yspecialType}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
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
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_AbsoluteConstS'),
										bind : {
											store : '{absoluteConstStore}',
											value : '{theDetail.absConst}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									}]
								},{
									//33
									xtype : 'container',
									layout : {
										type : 'vbox'
									},
									defaults : {
										labelAlign : 'right',
										labelWidth : 130
									},
									items : [{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_FireCode'),
										bind : {
											value : '{theDetail.fireCode}'
										},
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_DispatchModeIn'),
										bind : {
											store : '{dispatchModeInStore}',
											value : '{theDetail.dispatchMode}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_DispatchModeOut'),
										bind : {
											store : '{dispatchModeOutStore}',
											value : '{theDetail.dispatchMode2}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ReturnToTerminalRSN'),
										bind : {
											store : '{returnRsnStore}',
											value : '{theDetail.returnRsn}'
										},
										valueField : 'code',
										displayField : 'name',
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
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ExportSeal'),
										bind : {
											value : '{theDetail.sealNo3}'
										},
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_BlNo'),
										bind : {
											value : '{theDetail.blNo}'
										},
									},{
										xtype : 'textfield',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_So_Mf_No'),
                              bind : {
                                 value : '{theDetail.soNo}'
                              },
									},{
										xtype : 'textfield',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_DONo'),
                              bind : {
                                 value : '{theDetail.doNo}'
                              },
									},{
										xtype : 'combobox',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_CustomsApprovalType'),
                              bind : {
                                 store : '{customAppTypeStore}',
                                 value : '{theDetail.customAppType}'
                              },
                              valueField : 'code',
                              displayField : 'name',
                              queryMode : 'local',
									},{
										xtype : 'textfield',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_JobOrderNoIn'),
                              bind : {
                                 value : '{theDetail.jobOdrNo}'
                              },
									},{
										xtype : 'textfield',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_JobOrderNoOut'),
                              bind : {
                                 value : '{theDetail.jobOdrNo2}'
                              },
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
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShiftingType'),
										bind : {
											store : '{shiftingTypeStore}',
											value : '{theDetail.shiftType}'
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
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_DamageCondition'),
										bind : {
											store : '{damageConditionStore}',
											value : '{theDetail.dmgCond}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerCondition'),
										bind : {
											store : '{containerConditionStore}',
											value : '{theDetail.cntrCond}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_AirVent_PERCENT'),
										bind : {
											value : '{theDetail.airvent}'
										},
										maxLength : 8,
										maxValue : 99999,
										enforceMaxLength : true,
										hideTrigger : true
									},{
										xtype : 'datefield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_FreeTime'),
										format : 'Y-m-d',
										bind : {
											value : '{theDetail.ifreeTime}'
										}
									},{
										xtype : 'datefield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_DOExpireDate'),
										format : 'Y-m-d',
										bind : {
											value : '{theDetail.dfreeTime}'
										}
									}]
								},{
									//44
									xtype : 'container',
									layout : {
										type : 'vbox'
									},
									defaults : {
										labelAlign : 'right',
										labelWidth : 130
									},
									items : [{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_BookingNo'),
										bind : {
											value : '{theDetail.bookingNo}'
										}
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_TruckerIn'),
										bind : {
											store : '{trukerStore}',
											value : '{theDetail.trucker}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_TruckerOut'),
										bind : {
											store : '{trukerStore}',
											value : '{theDetail.trucker2}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_TruckNoIn'),
										bind : {
											value : '{theDetail.truckNo}'
										}
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_TruckNoOut'),
										bind : {
											value : '{theDetail.truckNo2}'
										}
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ConsigneeName'),
										bind : {
											value : '{theDetail.consigneeName}'
										}
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_CommodityDesc'),
										bind : {
											value : '{theDetail.commodityDesc}'
										}
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
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_StuffCheck'),
										bind : {
											store : '{stuffTypeStore}',
											value : '{theDetail.stuffChk}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OverlandInfo'),
										bind : {
											store : '{overlandTypeStore}',
											value : '{theDetail.overlandChk}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvH'),
										bind : {
											value : '{theDetail.ovHeight}'
										},
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvF'),
										bind : {
											value : '{theDetail.ovFore}'
										},
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvA'),
										bind : {
											value : '{theDetail.ovAft}'
										},
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvP'),
										bind : {
											value : '{theDetail.ovPort}'
										},
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OvS'),
										bind : {
											value : '{theDetail.ovStbd}'
										},
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsH'),
										bind : {
											value : '{theDetail.osHeight}'
										},
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsP'),
										bind : {
											value : '{theDetail.osPort}'
										},
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OsS'),
										bind : {
											value : '{theDetail.osStbd}'
										},
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_InLane'),
										bind : {
											store : '{laneCodeStore}',
											value : '{theDetail.inLane}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OutLane'),
										bind : {
											store : '{laneCodeStore}',
											value : '{theDetail.outLane}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local'
									},{
										xtype : 'textarea',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Remark'),
										bind : {
											value : '{theDetail.remark}'
										}
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

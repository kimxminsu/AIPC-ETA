Ext.define('IoTosOmExt.view.export.bookinglist.BookingListDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-bookinglistdetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 1050,
	height : 950,
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
							title : ViewUtil.getLabel('WRD_CTOM_BookingDetailInformation'),
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
										reference : 'ctlBookingNo',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_BookingNo'),
										bind : {
											value : '{theDetail.bookingNo}'
										},
										allowBlank : false,
										allowOnlyWhitespace : false
									},{
										xtype : 'numberfield',
										reference : 'ctlBookingQty',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_BookingQty'),
										bind : {
											value : '{theDetail.bookingQty}'
										},
										allowBlank : false,
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_PickupBookingQty'),
										bind : {
											value : '{theDetail.pickupBookingQty}'
										},
										listeners : {
											change : 'onPickUpBookingQtyChange'
										},
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true,
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_SocQty'),
										bind : {
											value : '{theDetail.socQty}'
										},
										maxLength : 5,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true,
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
										allowBlank : false
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
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_AirVent_PERCENT'),
										bind : {
											value : '{theDetail.airventUnit}'
										},
										maxLength : 4,
										enforceMaxLength : true,
										hideTrigger : true,
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_CMH'),
										bind : {
											value : '{theDetail.airvent}'
										},
										hideTrigger : true,
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_WeightGroup'),
										bind : {
											store : '{weightGroupCodeStore}',
											value : '{theDetail.wgtGrp}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerCond'),
										bind : {
											store : '{cntrCondCodeStore}',
											value : '{theDetail.cntrCond}'
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
										labelWidth : 130,
										labelAlign : 'right',
									},
									items : [{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_SoNo'),
										bind : {
											value : '{theDetail.soNo}'
										}
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
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ShipperConsignee'),
										bind : {
											store : '{ptnrCodeStore}',
											value : '{theDetail.consignee}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local'
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
										queryMode : 'local'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_HandlingInstrDotS'),
										bind : {
											store : '{hndCodeStore}',
											value : '{theDetail.handleInstr}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local'
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_HandlingInstrDotY'),
										bind : {
											store : '{yhnCodeStore}',
											value : '{theDetail.yhandleInstr}'
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
									},{
										xtype : 'datefield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_PUDate'),
										format : 'Y-m-d',
										bind : {
											value : '{theDetail.puDate}'
										}
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_PUPlace'),
										bind : {
											value : '{theDetail.puPlace}'
										}
									},{
										xtype : 'textarea',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Remark'),
										bind : {
											value : '{theDetail.remark}'
										}
									},{
										xtype : 'checkboxfield',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_Topping'),
										margin : '0 0 0 130',
										bind : {
											value : '{theDetail.toppingChk}'
										}
									},{
										xtype : 'checkboxfield',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_Cancel'),
										margin : '0 0 0 130',
										bind : {
											value : '{theDetail.cancelChk}'
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
												// value : '{setSztp2}'
											},
											readOnly : true
										},{
											xtype : 'textfield',
											reference : 'ctlPrivateSztpDetail',
											width : 60,
											margin : '0 0 0 5',
											bind : {
												value : '{theDetail.privateSztp}'
												// value : '{setPrivateSztp}'
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
												readOnly : true,
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
												fieldLabel : ViewUtil.getLabel('WRD_FTCO_Height'),
												width : 205,
												bind : {
													value : '{theDetail.ovHeight}'
												},
												maxLength : 5,
												enforceMaxLength : true,
												allowDecimals : false,
												hideTrigger : true,
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
												hideTrigger : true,
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
											hideTrigger : true,
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
											hideTrigger : true,
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
												hideTrigger : true,
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
												hideTrigger : true,
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
												hideTrigger : true,
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
												hideTrigger : true,
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
												// rowclick : 'onBookingListGridClick',
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
				},{
					xtype: 'tsb-datagrid',
					reference: 'refDetailContainerListGrid',
					title : ViewUtil.getLabel('WRD_CTOM_ContainerList'),
					flex: 1,
					bind: {
						store: '{detailContainerListStore}'
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
						items: GridUtil.getGridColumns('ReleasedCntrListGrid')
					}
				}]
		   }]
		});
		me.callParent();
	}
});

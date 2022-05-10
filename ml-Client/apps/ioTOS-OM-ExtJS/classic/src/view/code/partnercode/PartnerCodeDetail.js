Ext.define('IoTosOmExt.view.code.partnercode.PartnerCodeDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-partnercodedetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 1700,
   height : 700,
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
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing',{
			clicksToEdit : 2,
			pluginId : 'partnerPersonGridEditor',
			listeners : {
				cancelEdit : 'onCancelEdit',
				edit : 'onEdit'
			}
		});

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
							title : ViewUtil.getLabel('WRD_CTCM_Name'),
							items : [{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								items : [{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_PartnerType'),
									readOnly : true,
									bind : {
										value : '{theDetail.ptnrType}',
									}
								},{
									xtype : 'component',
									flex : 1
								},{
									xtype : 'checkboxfield',
									reference : 'refUnusedChk',
									boxLabel : ViewUtil.getLabel('WRD_CTCM_Unused'),
									bind : {
										value : '{theDetail.unusedChk}'
									},
									margin : '0 0 0 10',
								}]
							},{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								margin : '5 0 0 0',
								items : [{
									xtype : 'textfield',
									reference : 'ctlPtnrCode',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_Menu_PartnerCode'),
									bind : {
										value : '{theDetail.ptnrCode}',
									},
									allowBlank : false,
									maxLength : 10,
									enforceMaxLength : true,
									allowOnlyWhitespace : false,
								},{
									xtype : 'component',
									flex : 1
								},{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_ShortName'),
									bind : '{theDetail.engSnm}'
								}]
							},{
								xtype : 'container',
								layout : {
									type : 'hbox',
									align : 'stretch'
								},
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								margin : '5 0 0 0',
								items : [{
									xtype : 'textareafield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_ENG_LNM'),
									bind : '{theDetail.engLnm}',
									grow : true,
									flex : 1,
								}]
							}]
						},{
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTCM_OtherInfomation'),
							items : [{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								items : [{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_REG_NO'),
									bind : '{theDetail.regNo}'
								},{
									xtype : 'component',
									flex : 1
								},{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_TEL_NO'),
									bind : '{theDetail.telNo}'
								}]
							},{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								margin : '5 0 0 0',
								items : [{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_REPRESENTATIVE'),
									bind : '{theDetail.rePresentative}'
								},{
									xtype : 'component',
									flex : 1
								},{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_FAX_NO'),
									bind : '{theDetail.faxNo}'
								}]
							},{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								margin : '5 0 0 0',
								items : [{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_Country'),
									bind : '{theDetail.country}',
									maxLength : 10,
						   		enforceMaxLength : true,
								},{
									xtype : 'component',
									flex : 1,
								},{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_Currency'),
									bind : '{theDetail.curr}',
									maxLength : 3,
						   		enforceMaxLength : true,
								}]
							},{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								margin : '5 0 0 0',
								items : [{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_ZipCode'),
									bind : '{theDetail.zipCd}',
									maxLength : 10,
						   		enforceMaxLength : true,
								},{
									xtype : 'component',
									flex : 1
								},{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_CostCenter'),
									bind : '{theDetail.costCenter}',
									maxLength : 10,
						   		enforceMaxLength : true,
								}]
							},{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								margin : '5 0 0 0',
								items :[{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_Address'),
									bind : '{theDetail.addr}',
									flex : 1
								}]
							},{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								margin : '5 0 0 0',
								items : [{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_Email'),
									bind : '{theDetail.emailAddr}',
									flex : 1
								}]    
							},{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								margin : '5 0 0 0',
								items : [{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_SMSNo'),
									bind : '{theDetail.internet}',
									flex : 1,
								},{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_CreditNo'),
									bind : '{theDetail.creditNo}',
									maxLength : 10,
						   		enforceMaxLength : true,
								}]
							},{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								items :[{
									xtype : 'container',
									layout : 'hbox',
									defaults : {
										labelWidth : 110,
										labelAlign : 'right'
									},
									margin : '5 0 0 0',
									items : [{
										xtype : 'datefield',
										fieldLabel : ViewUtil.getLabel('WRD_CTCM_SuspendDate'),
										format: 'Y-m-d',
										bind : '{theDetail.invFdate}'
									},{
										xtype : 'datefield',
										format: 'Y-m-d',
										bind : '{theDetail.invTdate}'
									}]
								},{
									xtype : 'component',
									flex : 1
								},{
									xtype : 'checkboxfield',
									reference : 'ctlSztpChk',
									boxLabel : ViewUtil.getLabel('WRD_CTCM_CheckISOSzTpforGateIn'),
									labelWidth : 150,
									bind : {
										value : '{theDetail.sztpChk}',
										hidden : '{isNotLineOperator}'
									},
									hidden : true
								},{
									xtype : 'checkboxfield',
									boxLabel : ViewUtil.getLabel('WRD_CTOM_DedicatedTrucker'),
									labelWidth : 150,
									bind : {
										value : '{theDetail.truckerChk}',
										hidden : '{isNotTrucker}'
									},
									hidden : true
								}]
							},{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								margin : '5 0 0 0',
								items : [{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_ERPCustomerID'),
									bind : '{theDetail.customerId}',
									maxLength : 10,
						   		enforceMaxLength : true,
								},{
									xtype : 'component',
									flex : 1
								},{
									xtype : 'combobox',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_EmptyVanPoolType'),
									displayField : 'name',
									valueField : 'code',
									bind : {
										store : '{vanPoolTypeStore}',
										value : '{theDetail.vanType}',
										hidden : '{isNotLineOperator}'
									},
									labelWidth : 130,
									hidden : true,
									queryMode : 'local'
								}]
							}]
						},{
							xtype : 'fieldset',
							// flex : 0.2,
							title : ViewUtil.getLabel('WRD_CTCM_PayerInformation'),
							layout : {
								type : 'vbox',
								align : 'stretch'
							},
							items : [{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								items : [{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_TaxAuthority'),
									bind : '{theDetail.taxAuthority}'
								},{
									xtype : 'component',
									flex : 1
								},{
									xtype : 'combobox',
									reference : 'ctlPaymentTypeCombo',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_PaymentType'),
									displayField : 'name',
									valueField : 'code',
									bind : {
										store : '{paymentTypeStore}',
										value : '{theDetail.paymentType}' 
									},
									queryMode : 'local'
								},{
									xtype : 'checkboxfield',
									boxLabel : ViewUtil.getLabel('WRD_CTCM_PayerUnused'),
									margin : '0 0 0 5',
									width : 120,
									bind : {
										value : '{theDetail.payerUnusedChk}'
									},
								}]
							},{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								margin : '5 0 0 0',
								items : [{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_Profession'),
									bind : '{theDetail.profession}'
								},{
									xtype : 'component',
									flex : 1
								},{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_PaymentTerm'),
									bind : {
										value : '{theDetail.paymentTerm}'
									},
									maxLength : 4,
						   		enforceMaxLength : true,
								},{
									xtype : 'checkboxfield',
									boxLabel : ViewUtil.getLabel('WRD_CTCM_VatCheck'),
									margin : '0 0 0 5',
									width : 120,
									bind : {
										value : '{theDetail.vatChk}'
									},
								}]
							},{
								xtype : 'container',
								layout : 'hbox',
								defaults : {
									labelWidth : 110,
									labelAlign : 'right'
								},
								margin : '5 0 0 0',
								items : [{
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('WRD_CTCM_Email'),
									bind : '{theDetail.payerEmailAddr}',
									flex : 1
								},{
									xtype : 'checkboxfield',
									boxLabel : ViewUtil.getLabel('WRD_CTCM_EInvoice'),
									margin : '0 0 0 5',
									width : 120,
									bind : {
										value : '{theDetail.einvoiceAcceptChk}'
									},
								}]
							}]
						}]
					},{
						xtype : 'container',
						layout : {
							type : 'vbox',
							align : 'stretch'
						},
						margin : '0 0 0 100',
						//// flex : 0.7,
						flex : 0.4,
						scrollable : true,
						items :[{
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTCM_PersonInCharge'),
							layout : {
								type : 'vbox',
								align : 'stretch'
							},
							flex : 0.7,
							items : [{
								xtype : 'container',
								layout : {
									type : 'hbox'
								},
								items : [{
									xtype : 'button',
									text : ViewUtil.getLabel('WRD_CTCM_Add'),
									iconCls: 'x-fa fa-plus',
									listeners : {
										click : 'onAddPerson'
									}
								},{
									xtype : 'button',
									text : ViewUtil.getLabel('WRD_CTCM_Remove'),
									ui: 'delete-button',
									iconCls: 'x-fa fa-minus',
									margin : '0 0 1 1',
									listeners : {
										click : 'onRemovePerson'
									}
								}]
							},{
								xtype : 'tsb-datagrid',
								reference : 'refPartnerPersonGrid',
								flex : 1,
								enableLocking : false,
								scrollable : true,
								usePagingToolbar : false,
								bind : {
									store : '{partnerPersonStore}'
								},
								plugins: [
									rowEditing, 
									'gridexporter',
									'gridfilters',
									'clipboard'
								],
								selModel : {
									mode : 'MULTI'
								},
								listeners : {
									celldblclick : 'onPartnerPersonGridDblclick'
								},
								columns : GridUtil.getGridColumns('PartnerPersonGrid')
							}]
						},{
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTCM_LineOperator'),
							flex : 0.3,
							layout : 'hbox',
							bind : {
								hidden : '{isNotLineOperator}'
							},
							items : [{
								xtype : 'container',
								layout : {
									type : 'vbox',
									align : 'stretch'
								},
								items : [{
									xtype : 'container',
									layout : 'hbox',
									defaults : {
										labelWidth : 110,
										labelAlign : 'right'
									},
									items : [{
										xtype : 'combobox',
										reference : 'ctlPartnerBerthCombo',
										fieldLabel : ViewUtil.getLabel('WRD_CTCM_BERTH_NO'),
										bind : {
											value : '{theDetail.berthNo}',
											store : '{partnerBerthStore}'
										},
										displayField : 'name',
										valueField : 'name',
										queryMode : 'local'
									},{
										xtype : 'numberfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTCM_GraceHours'),
										bind : '{theDetail.graceHours}',
										maxLength : 3,
										enforceMaxLength : true,
										allowDecimals : false,
										hideTrigger : true,
									}]
								},{
									xtype : 'container',
									layout : 'hbox',
									defaults : {
										labelWidth : 110,
										labelAlign : 'right'
									},
									margin : '5 0 0 0',
									items : [{
										xtype : 'commoncodefield',
										reference : 'ctlShippingAgencyField',
										params: {
											popupType : ViewUtil.POPUPTYPE_MULTI,
											title : ViewUtil.getLabel('WRD_CTOM_CodeValues'),
											args : [PopupServiceConstants.PartnerType.SHIPPING_AGENCY],
											itemKey : PopupServiceConstants.PartnerType.SHIPPING_AGENCY,
											useReplaceAll : CommonConstants.NO
										},
										fieldLabel : ViewUtil.getLabel('WRD_CTCM_ShippingAgency'),
										flex : 1,
										bind : {
											value : '{theDetail.agencyCode}'
										},
									}]
								},{
									xtype : 'container',
									layout : {
										type : 'hbox',
										align : 'center',                
									},
									margin : '5 0 0 115',
									items : [{
										xtype : 'textfield',
										labelAlign : 'right',
										itemId : 'idPartnerCodeDetailColorSample',
										reference : 'refPartnerCodeDetailColorSample',
										style : 'font-weight:bold;',
										value : 'A',
										readOnly : true,
										width : 30
									},{
										xtype : 'colorfield',
										reference : 'refPartnerCodeDetailForeColor',
										itemId : 'idPartnerCodeDetailForeColor',
										width : 120,
										bind : '{theDetail.foreColor}',
										listeners : {
											change : function(ownObj, value) {
												var field = Ext.ComponentQuery.query('#idPartnerCodeDetailColorSample')[0];
												field.setFieldStyle('font-weight:bold; color:#' + value + ';');
											}
										}
									},{
										xtype : 'colorfield',
										reference : 'refPartnerCodeDetailBackColor',
										width : 120,
										bind : '{theDetail.backColor}',
										listeners : {
											change : function(ownObj, value) {
												var field = Ext.ComponentQuery.query('#idPartnerCodeDetailColorSample')[0];
												var fontColor = Ext.ComponentQuery.query('#idPartnerCodeDetailForeColor')[0];
				
												field.setFieldStyle('background:#' + value + ';' + 'color:#' + value + ';');
												field.setFieldStyle('font-weight:bold; color:#' + fontColor.getValue()+ ';');
											}
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

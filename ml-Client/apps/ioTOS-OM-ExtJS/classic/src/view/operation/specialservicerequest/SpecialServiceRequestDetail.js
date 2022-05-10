Ext.define('IoTosOmExt.view.operation.specialservicerequest.SpecialServiceRequestDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-specialservicerequestdetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 650,
   height : 430,
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
               flex : 1,
					items : [{
                  xtype : 'container',
                  flex : 1,
						layout : {
							type : 'vbox',
							align : 'stretch'
						},
						// flex : 0.6,
						scrollable : true,
						items : [{
                     xtype : 'fieldset',
                     reference : 'ctlDetailSsrFieldSet',
                     title : ViewUtil.getLabel('WRD_CTOM_ContainerwiseSSR'),
							items : [{
								xtype : 'container',
								layout : {
									type : 'vbox',
									// align : 'stretch'
                        },
								items : [{
                           xtype : 'container',
                           layout : {
                              type : 'hbox'
                           },
                           margin : '0 0 10 0',
                           items : [{
                              xtype : 'textfield',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_SsrNo'),
                              labelAlign : 'right',
                              margin : '0 5 0 0',
                              bind : {
                                 value : '{theDetail.ssrNo}'
                              },
                              allowBlank : false,
                              readOnly : true
                           },{
                              xtype : 'button',
                              reference : 'ctlDetailCreateSsrBtn',
                              text : ViewUtil.getLabel('WRD_CTOM_CreateSSR'),
                              listeners : {
                                 click : 'onCreateSsrClick'
                              },
                              margin : '0 5 0 0 '
                           },{
                              xtype : 'checkboxfield',
                              boxLabel : ViewUtil.getLabel('WRD_CTOM_RemainSSRCodeForNew'),
                              bind : {
                                 value : '{theDetail.remainSSRCode}'
                              }
                           }]
                        },{
                           xtype : 'container',
                           layout : {
                              type : 'hbox'
                           },
                           margin : '0 0 10 0',
                           items : [{
                              xtype : 'combobox',
                              reference : 'ctlDetailSsrCode',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_SsrCode'),
                              labelAlign : 'right',
                              bind : {
                                 store : '{ssrCodeStore}',
                                 value : '{theDetail.ssrCode}'
                              },
                              listeners : {
                                 change : 'onSsrCodeChange'
                              },
                              valueField : 'code',
                              displayField : 'name',
                              queryMode : 'local',
                              margin : '0 5 0 0',
                              allowBlank : false
                           },{
                              xtype : 'checkboxfield',
                              boxLabel : ViewUtil.getLabel('WRD_CTOM_ChargebyRequest'),
                              bind : {
                                 value : '{theDetail.chargeByRequestApply}'
                              }
                           }]
                        },{
                           xtype : 'container',
                           layout : {
                              type : 'hbox'
                           },
                           margin : '0 0 10 0',
                           items : [{
                              xtype : 'datefield',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_RequestDate'),
                              labelAlign : 'right',
                              // margin : '0 5 0 0',
                              format : 'Y-m-d',
                              allowBlank : false,
                              bind : {
                                 value : '{theDetail.requestDate}'
                              }
                           },{
                              xtype : 'datefield',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_CompleteDate'),
                              labelAlign : 'right',
                              format : 'Y-m-d',
                              bind : {
                                 value : '{theDetail.completeDate}'
                              }
                           }]
                        },{
                           xtype : 'container',
                           layout : {
                              type : 'hbox'
                           },
                           margin : '0 0 10 0',
                           items : [{
                              xtype : 'textfield',
                              reference : 'ctlDetailVesselSchedule',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_VesselSchedule'),
                              // labelWidth : 100,
                              labelAlign : 'right',
                              bind : {
                                 value : '{theDetail.vvd}'
                              },
                              readOnly : true,
                              allowBlank : false,
                              width : 245
                           },{
                              xtype : 'button',
                              reference : 'ctlDetailVesselScheduleSearchBtn',
                              iconCls : 'x-fa fa-search',
                              margin : '0 0 0 5',
                              listeners : {
                                 click : 'onSearchVesselSchedule'
                              },
                           },{
                              xtype : 'textfield',
                              reference : 'ctlDetailPickupOrderNo',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_PickupOrderNo'),
                              labelAlign : 'right',
                              maxLength : 30,
                              enforceMaxLength : true,
                              bind : {
                                 value : '{theDetail.jobOdrNo2}'
                              }
                           }]
                        },{
                           xtype : 'container',
                           layout : {
                              type : 'hbox'
                           },
                           items : [{
                              xtype : 'container',
                              layout : 'vbox',
                              items : [{
                                 xtype : 'combobox',
                                 reference : 'ctlDetailOpr',
                                 fieldLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
                                 labelAlign : 'right',
                                 bind : {
                                    store : '{oprCodeStore}',
                                    value : '{theDetail.ptnrCode}'
                                 },
                                 valueField : 'code',
                                 displayField : 'code',
                                 queryMode : 'local',
                                 allowBlank : false
                              },{
                                 xtype : 'numberfield',
                                 reference : 'ctlDetailVolume',
                                 fieldLabel : ViewUtil.getLabel('WRD_CTOM_Volume'),
                                 labelAlign : 'right',
                                 bind : {
                                    value : '{theDetail.volume}'
                                 },
                                 allowBlank : false,
                                 maxLength : 5,
                                 enforceMaxLength : true,
                                 allowDecimals : false,
                                 hideTrigger : true,
                              }]
                           },{
                              xtype : 'textarea',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_Remark'),
                              labelAlign : 'right',
                              bind : {
                                 value : '{theDetail.remark}'
                              }
                           }]
                        },
                        // {
                        //    xtype : 'combobox',
                        //    fieldLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
                        //    labelAlign : 'right',
                        // },{
                        //    xtype : 'textfield',
                        //    fieldLabel : ViewUtil.getLabel('WRD_CTOM_Volume'),
                        //    labelAlign : 'right',
                        // },
                        {
                           xtype : 'fieldset',
                           title : ViewUtil.getLabel('WRD_CTOM_PaymentInformation'),
                           layout : {
                              type : 'vbox',
                              align : 'stretch'
                           },
                           items : [{
                              xtype : 'container',
                              layout : {
                                 type : 'hbox'
                              },
                              margin : '0 0 10 0',
                              items : [{
                                 xtype : 'combobox',
                                 reference : 'ctlDetailRegistratinoNo',
                                 fieldLabel : ViewUtil.getLabel('WRD_CTOM_RegistrationNo'),
                                 labelAlign : 'right',
                                 bind : {
                                    store : '{registratinoNoStore}'
                                 },
                                 listeners : {
                                    change : 'onRegistrationNoChanged'
                                 },
                                 valueField : 'code',
                                 displayField : 'code',
                                 queryMode : 'local',
                                 margin : '0 30 0 0'
                              },{
                                 xtype : 'label',
                                 text : ViewUtil.getLabel('WRD_CTOM_PaymentType'),
                                 margin : '5 10 0 0'
                              },{
                                 xtype : 'radiogroup',
                                 reference : 'ctlPaymentTypeRadioGroup',
                                 vertical: false,
                                 items : [
                                    {boxLabel: ViewUtil.getLabel('WRD_CTOM_Credit'), name: 'paymentType', inputValue: CodeConstantsOM.paymentType.CASH, checked : true},
                                    {boxLabel: ViewUtil.getLabel('WRD_CTOM_Cash'), name: 'paymentType', inputValue: CodeConstantsOM.paymentType.CREDIT, width : 100, margin : '0 0 0 10'},
                                 ]
                              }]
                           },{
                              xtype : 'container',
                              layout : {
                                 type : 'hbox'
                              },
                              items : [{
                                 xtype : 'combobox',
                                 reference : 'ctlDetailPayerType',
                                 fieldLabel : ViewUtil.getLabel('WRD_CTOM_Payer'),
                                 labelAlign : 'right',
                                 bind : {
                                    store : '{payerTypeStore}',
                                    value : '{theDetail.payerType}'
                                 },
                                 listeners : {
                                    change : 'onPayerTypeChanged'
                                 },
                                 valueField : 'code',
                                 displayField : 'name',
                                 queryMode : 'local',
                                 margin : '0 5 0 0',
                                 allowBlank : false
                              },{
                                 xtype : 'combobox',
                                 reference : 'ctlDetailPayerCode',
                                 flex : 1,
                                 bind : {
                                    store : '{payerCodeStore}',
                                    value : '{theDetail.payer}'
                                 },
                                 listeners : {
                                    change : 'onPayerCodeChanged'
                                 },
                                 valueField : 'code',
                                 displayField : 'name',
                                 queryMode : 'local',
                              }]
                           },{
                              xtype : 'checkboxfield',
                              boxLabel : ViewUtil.getLabel('WRD_CTOM_InvoiceIssued'),
                              margin : '10 0 0 105',
                              disabled : true
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
                        reference : 'ctlDetailAddBtn',
                        text : ViewUtil.getLabel('WRD_CTCM_Add'),
                        iconCls: 'x-fa fa-plus',
                        listeners : {
                           click : 'onAddContainer'
                        }
                     },{
                        xtype : 'button',
                        reference : 'ctlDetailRemoveBtn',
                        text : ViewUtil.getLabel('WRD_CTCM_Remove'),
                        ui: 'delete-button',
                        iconCls: 'x-fa fa-minus',
                        margin : '0 0 1 1',
                        listeners : {
                           click : 'onRemoveContainer'
                        }
                     }]
                  },{
                     xtype : 'tsb-datagrid',
                     reference : 'refSsrDetailGrid',
                     bind : {
                        store : '{specialServiceRequestDetailStore}'
                     },
                     flex : 1,
                     listeners: {
                        celldblclick: 'onSpecialServiceRequestDetailGridDblClick',
                        pagingSearch: 'onSearch'
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
                        items: GridUtil.getGridColumns('SpecialServiceRequestDetailGrid'),
                     }
                  }]
					}]
				}]
		   }]
		});
		me.callParent();
	}
});

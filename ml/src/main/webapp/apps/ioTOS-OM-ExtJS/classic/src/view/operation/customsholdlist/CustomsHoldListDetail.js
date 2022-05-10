Ext.define('IoTosOmExt.view.operation.customsholdlist.CustomsHoldListDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-customsholdlistdetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 650,
   height : 560,
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
                  flex : 1,
						layout : {
							type : 'vbox',
							align : 'stretch'
						},
						// flex : 0.6,
						scrollable : true,
						items : [{
                     xtype : 'fieldset',
                     title : ViewUtil.getLabel('WRD_CTOM_ContainerDetailInformation'),
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
										allowBlank : false
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
                                 readOnly : true
										},{
											xtype : 'textfield',
                                 bind : {
                                    value : '{theDetail.cntrNo}'
                                 },
                                 width : 57,
                                 readOnly : true
										},{
                                 xtype : 'textfield',
                                 bind : {
                                    value : '{theDetail.cntrNo}'
                                 },
                                 width : 57,
                                 readOnly : true
                              }]
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Mode'),
										bind : {
											value : '{theDetail.ixCd}'
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
											fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp'),
											labelAlign : 'right',
											bind : {
												value : '{theDetail.sztp}'
											},
                                 width : 161,
                                 readOnly : true
										},{
											xtype : 'textfield',
                                 bind : {
                                    value : '{theDetail.sztp2}'
                                 },
                                 width : 57,
                                 readOnly : true
										},{
                                 xtype : 'textfield',
                                 bind : {
                                    value : '{theDetail.pSztp}'
                                 },
                                 width : 57,
                                 readOnly : true
                              }]
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_FE'),
										bind : {
                                 value : '{theDetail.fe}'
                              },
                              readOnly : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Weight'),
										bind : {
                                 value : '{theDetail.wgt}'
                              },
                              readOnly : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
										bind : {
                                 value : '{theDetail.ptnrCode}'
                              },
                              readOnly : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_BillingOPR'),
										bind : {
                                 value : '{theDetail.shiftAcc}'
                              },
                              readOnly : true
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
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Status'),
										bind : {
                                 value : '{theDetail.cntrState}'
                              },
                              readOnly : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_LoadingConfirmStatus'),
										bind : {
                                 value : '{theDetail.rehandleCode}'
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
											fieldLabel : ViewUtil.getLabel('WRD_CTOM_YardLocation'),
											labelAlign : 'right',
											bind : {
												value : '{theDetail.yardPosition}'
                                 },
                                 labelWidth : 130,
                                 width : 265,
                                 readOnly : true
										},{
											xtype : 'textfield',
                                 bind : {
                                    value : '{theDetail.area}'
                                 },
                                 width : 40,
                                 readOnly : true
										}]
									},{
										xtype : 'datefield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_InDate'),
										bind : {
                                 value : '{theDetail.inDate}'
                              },
                              format : 'Y-m-d',
                              readOnly : true
									},{
                              xtype : 'textfield',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_RefNo'),
                              bind : {
                                 value : '{theDetail.soNo}'
                              },
                              readOnly : true
									},{
										xtype : 'textfield',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_JobOrderNo'),
                              bind : {
                                 value : '{theDetail.jobOdrNo}'
                              },
                              readOnly : true
									},{
										xtype : 'textfield',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_BookingNo'),
                              bind : {
                                 value : '{theDetail.bookingNo}'
                              },
                              readOnly : true
									}]
								}]
							}]
						}]
					}]
				},{
               xtype : 'fieldset',
               title : ViewUtil.getLabel('WRD_CTOM_ResultOfCustomsHold'),
               layout : {
                  type : 'vbox',
                  align : 'stretch'
               },
               defaults : {
                  labelWidth : 110,
                  labelAlign : 'right'
               },
               items : [{
                  xtype : 'container',
                  defaults : {
                     labelWidth : 110,
                     labelAlign : 'right'
                  },
                  // margin : '0 0 10 0',
                  items : [{
                     xtype : 'combobox',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_Holding'),
                     bind : {
                        store : '{holdChkCodeStore}',
                        value : '{theDetail.holdChk}',
                     },
                     displayField : 'name',
                     valueField : 'code',
                     queryMode : 'local',
                  }]
               },{
                  xtype : 'textfield',
                  fieldLabel : ViewUtil.getLabel('WRD_CTOM_CustomsReleaseNo'),
                  bind : {
                     value : '{theDetail.customAppNo}'
                  },
               },{
                  xtype : 'textfield',
                  fieldLabel : ViewUtil.getLabel('WRD_CTOM_Remark'),
                  bind : {
                     value : '{theDetail.chgReason}'
                  },
               },{
                  xtype : 'container',
                  layout : {
                     type : 'hbox'
                  },
                  defaults : {
                     labelWidth : 110,
                     labelAlign : 'right'
                  },
                  items : [{
                     xtype : 'datefield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_LastUpdateTime'),
                     bind : {
                        value : '{theDetail.updateTime}'
                     },
                     format : 'Y-m-d',
                     readOnly : true,
                     flex : 1
                  },{
                     xtype : 'textfield',
                     fieldLabel : ViewUtil.getLabel('WRD_CTOM_UpdateStaff'),
                     bind : {
                        value : '{theDetail.staffCd}'
                     },
                     readOnly : true,
                     flex : 1
                  }]
               }]
				}]
		   }]
		});
		me.callParent();
	}
});

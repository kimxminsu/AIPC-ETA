Ext.define('IoTosOmExt.view.operation.specialservicerequest.ContainerListDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-ssrcontainerlistdetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 650,
   height : 350,
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
										labelAlign : 'right',
									},
									items : [{
                              xtype : 'container',
                              layout : {
                                 type : 'hbox'
                              },
                              defaults : {
                                 labelAlign : 'right'
                              },
                              margin : '0 0 10 0',
                              items : [{
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
											xtype : 'button',
											reference : 'ctlDetailSearchContainer',
                                 iconCls : 'x-fa fa-search',
                                 margin : '0 0 0 5',
                                 listeners : {
                                    click : 'onSearchContainer'
                                 }
                              }]
                           },{
                              xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerID'),
										bind : {
											value : '{theContainerDetail.cntrId}'
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
											// reference : 'ctlDetailNextVessel',
											fieldLabel : ViewUtil.getLabel('WRD_CTOM_VesselSchedule'),
											labelWidth : 100,
											labelAlign : 'right',
											bind : {
												value : '{theContainerDetail.vvd}'
											},
											readOnly : true,
											allowBlank : false
										},{
											xtype : 'button',
											iconCls : 'x-fa fa-search',
											margin : '0 0 0 5',
											listeners : {
												click : 'onSearchVesselSchedule'
											}
										}]
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
										labelAlign : 'right',
										bind : {
											store : '{oprCodeStore}',
											value : '{theContainerDetail.ptnrCode}'
										},
										valueField : 'code',
										displayField : 'code',
										queryMode : 'local',
										allowBlank : false
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
										allowBlank : false,
										allowOnlyWhitespace : false
									},{
										xtype : 'textfield',
                              reference : 'ctlContainerDetailSztp2',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_SzTp2'),
                              bind : {
                                 value : '{theContainerDetail.sztp2}'
                              },
										readOnly : true,
										allowBlank : false
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
										allowBlank : false
									}]
								},{
									xtype : 'container',
									layout : {
										type : 'vbox'
									},
									defaults : {
                              labelWidth : 120,
										labelAlign : 'right',
									},
									items : [{
										xtype : 'checkboxfield',
										reference : 'ctlDetailInSystem',
                              boxLabel : ViewUtil.getLabel('WRD_CTOM_InSystem'),
                              bind : {
                                 value : '{theContainerDetail.inSystem}'
										},
										listeners : {
											change : 'onInSystemChanged'
										},
                              margin : '0 0 10 125'
                           },{
                              xtype : 'combobox',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_Mode'),
                              bind : {
                                 store : '{modeCodeStore}',
                                 value : '{theContainerDetail.ixCd}'
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
                                 value : '{theContainerDetail.delv}'
                              },
                              valueField : 'code',
                              displayField : 'name',
                              queryMode : 'local',
									},{
                              xtype : 'combobox',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_CargoType'),
                              bind : {
                                 store : '{cargoTypeStore}',
                                 value : '{theContainerDetail.cargoType}'
                              },
                              valueField : 'code',
                              displayField : 'code',
										queryMode : 'local',
										allowBlank : false
									},{
                              xtype : 'combobox',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_CustomsApprovalType'),
                              bind : {
                                 store : '{customAppTypeStore}',
                                 value : '{theContainerDetail.customAppType}'
                              },
                              valueField : 'code',
                              displayField : 'code',
                              queryMode : 'local',
									},{
                              xtype : 'numberfield',
                              fieldLabel : ViewUtil.getLabel('WRD_CTOM_Volume'),
                              bind : {
                                 value : '{theContainerDetail.volume}'
                              },
                              allowBlank : false,
                              maxLength : 5,
                              enforceMaxLength : true,
                              allowDecimals : false,
                              hideTrigger : true,
                           },{
                              xtype : 'checkboxfield',
                              boxLabel : ViewUtil.getLabel('WRD_CTOM_DomesticCheck'),
                              bind : {
                                 value : '{theContainerDetail.isDomesticChk}'
                              },
                              margin : '0 0 0 125'
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

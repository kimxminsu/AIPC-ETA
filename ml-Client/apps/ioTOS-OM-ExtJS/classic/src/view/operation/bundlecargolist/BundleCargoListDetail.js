Ext.define('IoTosOmExt.view.operation.bundlecargolist.BundleCargoListDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-bundlecargolistdetail',
	
	requires: [
	   'Ext.layout.container.Table',
	   'Ext.grid.plugin.Exporter',
	   'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width : 890,
   height : 850,
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
						// flex : 0.6,
						scrollable : true,
						items : [{
							xtype : 'fieldset',
							title : ViewUtil.getLabel('WRD_CTOM_BundleKeyContainerInformation'),
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
											labelAlign : 'right',
										},
										margin : '0 0 10 0',
										items : [{
											xtype : 'textfield',
											reference : 'ctlDetailCntrNo',
											fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerNo'),
											bind : {
												value : '{theDetail.cntrNo}'
											},
											allowBlank : false,
											allowOnlyWhitespace : false
										},{
											xtype : 'button',
											reference : 'ctlDetailParentContainerSearchBtn',
											iconCls : 'x-fa fa-search',
											margin : '0 0 0 5',
											listeners : {
												click : 'onSearchParentContainer'
											},
										}]
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_ContainerID'),
										bind : {
											value : '{theDetail.cntrId}'
										},
										disabled : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_VesselVoyage'),
										bind : {
											value : '{theDetail.vvd}'
										},
										disabled : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Mode'),
										bind : {
											value : '{theDetail.ixCd}'
										},
										disabled : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Status'),
										bind : {
											value : '{theDetail.cntrState}'
										},
										disabled : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_YardLocation'),
										bind : {
											value : '{theDetail.yardLocation}'
										},
										disabled : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Delivery'),
										bind : {
											value : '{theDetail.delv}'
										},
										disabled : true
									}]
								},{
									xtype : 'container',
									layout : {
										type : 'vbox'
									},
									defaults : {
										labelAlign : 'right',
									},
									items : [{
										xtype : 'checkboxfield',
										boxLabel : ViewUtil.getLabel('WRD_CTOM_ThroughContainer'),
										bind : {
											value : '{theDetail.isThroughCheck}'
										},
										margin : '0 0 10 105',
										disabled : true
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
											disabled : true
										},{
											xtype : 'textfield',
                                 bind : {
                                    value : '{theDetail.sztp2}'
                                 },
                                 width : 57,
											disabled : true
										},{
                                 xtype : 'textfield',
                                 bind : {
                                    value : '{theDetail.pSztp}'
                                 },
                                 width : 57,
											disabled : true
                              }]
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_OPR'),
										bind : {
                                 value : '{theDetail.ptnrCode}'
                              },
										disabled : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_BOPR'),
										bind : {
                                 value : '{theDetail.shiftAcc}'
                              },
										disabled : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_Weight'),
										bind : {
                                 value : '{theDetail.wgt}'
                              },
										disabled : true
									},{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_FE'),
										bind : {
                                 value : '{theDetail.fe}'
                              },
										disabled : true
									},{
										xtype : 'combobox',
										fieldLabel : ViewUtil.getLabel('WRD_CTOM_BundleStatus'),
										bind : {
											store : '{bundleStatusCodeStore}',
											value : '{theDetail.bundleState}'
										},
										valueField : 'code',
										displayField : 'name',
										queryMode : 'local',
									}]
								}]
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
						reference : 'ctlAddChildContainerBtn',
						text : ViewUtil.getLabel('WRD_CTCM_Add'),
						iconCls: 'x-fa fa-plus',
						listeners : {
							click : 'onAddChildContainer'
						},
						disabled : true
					}]
				},{
					xtype: 'tsb-datagrid',
					reference: 'refDetailBundleCargoListGrid',
					title : ViewUtil.getLabel('WRD_CTOM_ContainerList'),
					flex: 1,
					bind: {
						store: '{bundleChildContainerStore}'
					},
					listeners: {
						celldblclick: 'onDetailBundleCargoGridDblClick',
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
						items: GridUtil.getGridColumns('BundleCargoDetailListGrid'),
					}
				}]
		   }]
		});
		me.callParent();
	}
});
